import { DateTime } from "luxon";
import { useState } from "react";

import Calendar from "~/components/common/forms/calendar";
import { Button } from "~/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/ui/card";

import { AccomodationDetailProps } from "./accommodation-detail";
import { Form } from "@remix-run/react";

export function StickyCard({ accommodation }: AccomodationDetailProps) {
  //   const formData = new FormData();
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const start = DateTime.fromJSDate(dateRange.startDate);
  const end = DateTime.fromJSDate(dateRange.endDate);

  const totalDays = end.diff(start, "days").toObject().days || 0;
  const totalPrice = totalDays * parseFloat(accommodation.price) || 0;

  const isoStart = start.toISODate() || "";
  const isoEnd = end.toISODate() || "";
  //   formData.append("from", isoStart);
  //   formData.append("to", isoTo);
  //   const fetcher = useFetcher();
  //   fetcher;

  // fetcher.data
  let priceSection = <></>;
  if (totalPrice) {
    priceSection = (
      <>
        <div className="text-gray-600 flex justify-between">
          <span> Total nights: </span>
          <span> {totalDays}</span>
        </div>

        <div className="text-gray-600 flex justify-between">
          <span>Price per night:</span>
          <span>{accommodation.price}, $/night</span>
        </div>
        <div className="bold text-4xl flex justify-between my-3">
          <span>Total price:</span>
          <span> {totalPrice}</span>
        </div>
      </>
    );
  }
  return (
    <Card className="sticky">
      <CardHeader>
        <CardTitle>Choose Dates:</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <div>
          <Calendar
            onChange={(value) => setDateRange(value.selection)}
            value={dateRange}
          />
          {priceSection}

          <div className="pt-4 border-t">
            <Form method="post">
              <input type="hidden" name="id" value={accommodation.id} />
              <input type="hidden" name="from" value={isoStart} />
              <input type="hidden" name="until" value={isoEnd} />
              <div className="text-right">
                <Button
                  type="submit"
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
                >
                  Save
                </Button>
              </div>
            </Form>
            {/* <form method="POST">
              <input type="hidden" name="id" value={accommodation.id} />
              <input type="hidden" name="from" value={isoStart} />
              <input type="hidden" name="until" value={isoEnd} />
              <input type="hidden" name="id" value={accommodation.id} />
              <Button
                type="submit"
                disabled={totalPrice <= 0}
                className="w-full"
                name="_action"
                value="createBooking"
              >
                Book
              </Button>
            </form> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
