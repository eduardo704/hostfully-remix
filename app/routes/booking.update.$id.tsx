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
import { Button } from "~/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/ui/card";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.id, "Id must be present and be a number");
  const bookingId = parseInt(params.id);

  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
    },
  });
  invariant(booking?.accommodationId, "Id must be present and be a number");
  const bookedDates = await getBookedDates(booking?.accommodationId);
  const currentBookingDates = getDatesFromInterval(booking.from, booking.until);

  const avaliableDates = bookedDates.filter((date) => {
    const dateTime = DateTime.fromJSDate(date) as DateTime;
    return currentBookingDates.includes(dateTime);
  });
  return { booking, avaliableDates };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method === "PUT") {
    // const userId = await requireUserId(request);
    console.log(request);

    const formData = await request.formData();
    // console.log(formData);
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
  const { avaliableDates, booking } = useLoaderData<typeof loader>();
  console.log(avaliableDates);
  console.log(booking);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const start = DateTime.fromJSDate(dateRange.startDate);
  const end = DateTime.fromJSDate(dateRange.endDate);

  const isoStart = start.toISODate() || "";
  const isoEnd = end.toISODate() || "";

  return (
    <Card className="sticky">
      <CardHeader>
        <CardTitle>Choose new Dates:</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <div>
          <Calendar
            disabledDates={avaliableDates}
            onChange={(value) => setDateRange(value.selection)}
            value={dateRange}
          />

          <div className="pt-4 border-t">
            <Form method="PUT">
              <input type="hidden" name="id" value={booking.id} />
              <input type="hidden" name="from" value={isoStart} />
              <input type="hidden" name="until" value={isoEnd} />
              {/* <div className="text-right"> */}
              <Button type="submit">Save</Button>
              {/* </div> */}
            </Form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
