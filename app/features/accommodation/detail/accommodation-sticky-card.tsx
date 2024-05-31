import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { RangeKeyDict } from "react-date-range";

import Calendar from "~/components/common/forms/calendar";
import { type loader as accLoader } from "~/routes/accommodation.$id";
import { Button } from "~/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/ui/card";

export interface CalendarState {
  startDate: Date | undefined;
  endDate: Date | undefined;
  key: string;
}

export function StickyCard() {
  let isDisabled = true;
  const { bookedDates, accommodation } = useLoaderData<typeof accLoader>();

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

  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === "submitting") {
      setDateRange({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      });
    }
  }, [navigation.state]);

  let priceSection = <></>;
  let confirmForm = <></>;

  console.log(dateRange)

  if (dateRange.startDate && dateRange.endDate) {
    const start = DateTime.fromJSDate(dateRange.startDate);
    const end = DateTime.fromJSDate(dateRange.endDate);

    const totalDays = (end.diff(start, "days").toObject().days || 0)+1;
    const totalPrice = totalDays * accommodation.price || 0;

    const isoStart = start.toISODate() ?? "";
    const isoEnd = end.toISODate() ?? "";
    isDisabled = false;

    priceSection = (
      <>
        <div className="text-gray-600 flex justify-between">
          <span>Total nights: </span>
          <span>{totalDays}</span>
        </div>

        <div className="text-gray-600 flex justify-between">
          <span>Price per night:</span>
          <span>{accommodation.price}, $/night</span>
        </div>
        <div className="bold text-4xl flex justify-between my-3">
          <span>Total price:</span>
          <span>{totalPrice}</span>
        </div>
      </>
    );

    confirmForm = (
      <div className="pt-4 border-t">
        <Form method="post">
          <input type="hidden" name="id" value={accommodation.id} />
          <input type="hidden" name="from" value={isoStart} />
          <input type="hidden" name="until" value={isoEnd} />
          {/* <div className="text-right"> */}
          <Button disabled={isDisabled} className="w-full" type="submit">
            Save
          </Button>
          {/* </div> */}
        </Form>
      </div>
    );
  }

  return (
    <Card className="sticky">
      <CardHeader>
        <CardTitle>Choose Dates:</CardTitle>
      </CardHeader>
      <CardContent className="w-full p-0 sm:p-6 flex justify-center">
        <div>
          <Calendar
            disabledDates={bookedDates.map((item) => new Date(item))}
            onChange={(value) => calendarListener(value)}
            value={dateRange}
          />
          {priceSection}
          {confirmForm}
        </div>
      </CardContent>
    </Card>
  );
}
