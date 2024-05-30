import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { DateTime } from "luxon";
import { useState } from "react";
import invariant from "tiny-invariant";

import Calendar from "~/components/common/forms/calendar";
import { prisma } from "~/db.server";
import {
  getBookedDates,
  getDatesFromInterval,
  updateDatesForBooking,
} from "~/server/accomodation.server";
import { findBookingId } from "~/server/booking.server";
import { Button } from "~/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/ui/card";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.id, "Id must be present and be a number");
  const bookingId = parseInt(params.id);

  const booking = await findBookingId(bookingId)
  invariant(booking?.accommodationId, "Id must be present and be a number");
  const bookedDates = await getBookedDates(booking?.accommodationId);
  const currentBookingDates = getDatesFromInterval(booking.from, booking.until);

  const datesToBlock = bookedDates.filter((date) => {
    const dateTime = DateTime.fromJSDate(date) as DateTime;
    const index = currentBookingDates.findIndex((element) =>
      element?.equals(dateTime),
    );

    return index < 0;
  });
  return { booking, datesToBlock };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method === "PUT") {
    const formData = await request.formData();
    const id = formData.get("id") as string;
    const from = formData.get("from") as string;
    const until = formData.get("until") as string;

    const bookingId = parseInt(id);
    const booking = await updateDatesForBooking(
      bookingId,
      DateTime.fromISO(from).toJSDate(),
      DateTime.fromISO(until).toJSDate(),
    );
    return redirect(`/mybookings?booking_id=${booking.id}`);
  }
};

export default function MyBookingsPage() {
  const { datesToBlock, booking } = useLoaderData<typeof loader>();
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const start = DateTime.fromJSDate(dateRange.startDate);
  const end = DateTime.fromJSDate(dateRange.endDate);

  const isoStart = start.toISODate() ?? "";
  const isoEnd = end.toISODate() ?? "";

  return (
    <Card className="w-full sm:w-1/2 lg:w-1/3">
      <CardHeader>
        <CardTitle>Choose new Dates:</CardTitle>
      </CardHeader>
      <CardContent  className="w-full p-0 sm:p-6 flex justify-center">
        <div>
          <Calendar
            disabledDates={datesToBlock}
            onChange={(value) => setDateRange(value.selection)}
            value={dateRange}
          />

          <div className="pt-4 border-t">
            <Form method="PUT">
              <input type="hidden" name="id" value={booking.id} />
              <input type="hidden" name="from" value={isoStart} />
              <input type="hidden" name="until" value={isoEnd} />
              <Button className="w-full " type="submit">Save</Button>
            </Form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
