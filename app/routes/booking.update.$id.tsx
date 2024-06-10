import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { DateTime } from "luxon";
import { useState } from "react";
import { RangeKeyDict } from "react-date-range";
import invariant from "tiny-invariant";

import Calendar from "~/components/common/forms/calendar";
import { CalendarState } from "~/features/accommodation/detail/accommodation-sticky-card";
import {
  getBookingAndDatesExcludingCurrentBooking,
  updateDatesForBooking
} from "~/server/accomodation.server";
import { Button } from "~/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/ui/card";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.id, "Id must be present and be a number");
  const bookingId = parseInt(params.id);

  const { booking, datesToBlock } = await getBookingAndDatesExcludingCurrentBooking(bookingId);
  return { booking, datesToBlock };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method === "PUT") {
    const { id, from, until } = await getDataFromForm(request);

    const bookingId = parseInt(id);
    const booking = await updateDatesForBooking(
      bookingId,
      DateTime.fromISO(from).toJSDate(),
      DateTime.fromISO(until).toJSDate(),
    );
    return redirect(`/mybookings?booking_id=${booking.id}`);
  }
};



async function getDataFromForm(request: Request) {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const from = formData.get("from") as string;
  const until = formData.get("until") as string;
  return { id, from, until };
}

export default function MyBookingsPage() {
  let isDisabled = true;
  const { datesToBlock, booking } = useLoaderData<typeof loader>();
  const mappedDates = datesToBlock.map((str) => new Date(str));
  const [dateRange, setDateRange] = useState<CalendarState>({
    startDate: undefined,
    endDate: new Date(""),
    key: "selection",
  });

  const calendarListener = (value: RangeKeyDict) => {
    const selection = value.selection;
    setDateRange({
      startDate: selection.startDate,
      endDate: selection.endDate,
      key: "selection",
    });
  };

  isDisabled = false;
  let confirmForm = <></>;
  if (dateRange.startDate && dateRange.endDate) {
    const start = DateTime.fromJSDate(dateRange.startDate);
    const end = DateTime.fromJSDate(dateRange.endDate);

    const isoStart = start.toISODate() ?? "";
    const isoEnd = end.toISODate() ?? "";
    isDisabled = false;

    confirmForm = (
      <div>
        <div className="pt-4 border-t">
          <Form method="PUT">
            <input type="hidden" name="id" value={booking.id} />
            <input type="hidden" name="from" value={isoStart} />
            <input type="hidden" name="until" value={isoEnd} />
            <Button disabled={isDisabled} className="w-full " type="submit">
              Save
            </Button>
          </Form>
        </div>
      </div>
    );
  }
  return (
    <Card className="w-full sm:w-1/2 lg:w-1/3">
      <CardHeader>
        <CardTitle>Choose new Dates:</CardTitle>
      </CardHeader>
      <CardContent className="w-full p-0 sm:p-6 flex justify-center">
      <Calendar
          disabledDates={mappedDates}
          onChange={(value) => calendarListener(value)}
          value={dateRange}
        />
        {confirmForm}
      </CardContent>
    </Card>
  );
}
