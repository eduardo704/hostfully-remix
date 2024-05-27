import { ActionFunction } from "@remix-run/node";
import { DateTime } from "luxon";
import { useState } from "react";

import Calendar from "~/components/common/forms/calendar";
import { Button } from "~/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/ui/card";

import { AccommodationCardData } from "../models/accommodation-card.model";

import { AccomodationInfo } from "./accommodation-info";
import { AccomodationImageHeader } from "./accomodation-image-header";

interface AccomodationDetailProps {
  accommodation: AccommodationCardData;
}

// export const action: ActionFunction = async ({ request }) => {
//   const formData = await request.formData;
//   console.log(formData);
// };

export default function AccomodationDetail({
  accommodation,
}: AccomodationDetailProps) {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const start = DateTime.fromJSDate(dateRange.startDate);
  const end = DateTime.fromJSDate(dateRange.endDate);

  const totalDays = end.diff(start, "days").toObject().days || 0;
  const totalPrice = totalDays * parseFloat(accommodation.price) || 0;

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
    <div className="container px-6 mb-10">
      <AccomodationImageHeader imageSrc={accommodation.images.src} />
      <div className="flex gap-4 pt-6">
        <div className="flex flex-col grow gap-2">
          <AccomodationInfo accommodation={accommodation} />
        </div>

        <div className="">
          <Card className="sticky">
            <CardHeader>
              <CardTitle>Choose Dates:</CardTitle>
            </CardHeader>
            <CardContent className="w-full">
              <form method="POST">
                <div>
                  <Calendar
                    onChange={(value) => setDateRange(value.selection)}
                    value={dateRange}
                  />
                  {priceSection}

                  <div className="pt-4 border-t">
                    <Button
                      type="submit"
                      disabled={totalPrice <= 0}
                      className="w-full"
                    >
                      Book
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          {/* <div className="border rounded p-6 flex flex-col sticky top-20">
            <h4 className="py-4"></h4>
          </div> */}
        </div>
      </div>
    </div>
  );
}
