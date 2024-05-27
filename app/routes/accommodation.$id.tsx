import { ActionFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DateTime } from "luxon";
import { useState } from "react";
import Calendar from "~/components/common/forms/calendar";

import { prisma } from "~/db.server";
import { AccomodationInfo } from "~/features/accommodation/detail/accommodation-info";
import { AccomodationImageHeader } from "~/features/accommodation/detail/accomodation-image-header";
import { Button } from "~/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/ui/card";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = parseInt(params.id);
  const accommodation = await prisma.accommodation.findFirst({
    include: { images: true, location: true, reviews: true },
    where: {
      id: id,
    },
  });
  const bookings = await prisma.booking.findFirst({
    where: {
      accommodationId: id,
    },
  });

  return { accommodation, bookings };
};

export const action: ActionFunction = async ({ request }) => {
  
  const formData = await request.formData;
  console.log(formData);
  return ''
};


export default function AccomodationPage() {
  const { accommodation } = useLoaderData<typeof loader>();

  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const start = DateTime.fromJSDate(dateRange.startDate);
  const end = DateTime.fromJSDate(dateRange.endDate);

  const totalDays = end.diff(start, "days").toObject().days || 0;
  const totalPrice = totalDays * accommodation.price || 0;

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
              <form method="POST" >
              <input type="hidden" value={accommodation?.id} name="id"/>
                <div>
                  <Calendar                  
                    onChange={(value) => setDateRange(value.selection)}
                    value={dateRange}
                  />
                  {priceSection}

                  <div className="pt-4 border-t">
                    <Button
                      type="submit"
                      onClick={}
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
        </div>
      </div>
    </div>
  );
}
