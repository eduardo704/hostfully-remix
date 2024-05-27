import { DateTime } from "luxon";
import { useState } from "react";

import Calendar from "~/components/common/forms/calendar";
import mockedObj from "~/mocks/mockedAccommodation";

import { AccomodationInfo } from "./accommodation-info";
import { AccomodationImageHeader } from "./accomodation-image-header";
import { Button } from "@/components/ui/button";

export default function AccomodationDetail() {
  const mocked = mockedObj;
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const start = DateTime.fromJSDate(dateRange.startDate);
  const end = DateTime.fromJSDate(dateRange.endDate);

  const totalDays = end.diff(start, "days").toObject().days || 0;
  const totalPrice = totalDays * mocked.price || 0;

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
          <span>{mocked.price}, $/night</span>
        </div>
        <div className="bold text-4xl flex justify-between my-3">
          <span>Total price:</span>
          <span> {totalPrice}</span>
        </div>
      </>
    );
  }

  return (
    <div className="container px-6 mb-10">
      <AccomodationImageHeader imageSrc={mocked.imageSrc} />
      <div className="flex gap-4 pt-6">
        <div className="w-2/3 flex flex-col gap-2">
          <AccomodationInfo accommodation={mocked} />
        </div>

        <div className="w-1/3 ">
          <div className="border rounded p-6 flex flex-col sticky top-20">
            <h4 className="py-4">Choose Dates:</h4>
            <div>
              <Calendar
                onChange={(value) => setDateRange(value.selection)}
                value={dateRange}
              />
              {priceSection}

              <div className="pt-4 border-t">
                <Button
                  disabled={totalPrice <= 0}
              
                >
                  Book
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
