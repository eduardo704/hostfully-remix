import { MdSurfing } from "react-icons/md";

import { CheckIcon } from "~/components/common/icons";
import { Raiting } from "~/components/common/layout/raiting";
import { Accommodation } from "~/models/accommodation.model";
import { Card, CardContent, CardHeader, CardTitle } from "~/ui/card";

interface InfoProps {
  accommodation: Accommodation;
}

export function AccomodationInfo({ accommodation }: InfoProps) {
  return (
    <div>
      <div className="text-4xl font-bold text-indigo-600">
        {accommodation.name}
      </div>
      <div className="text-2xl font-bold">
        {accommodation.location.name}, {accommodation.location.country}
      </div>
      <div className="flex items-center">
        <div>Level:</div>
        <div className="flex gap-2">
          <MdSurfing className="fill-indigo-600" />
          <MdSurfing className="fill-indigo-600" />
          <MdSurfing className="fill-indigo-600" />
          <MdSurfing />
          <MdSurfing />
        </div>
        <span className="bold text-gray-500">- Intermediate</span>
      </div>
      <div className="font-light text-neutral-500 flex items-center">
        <Raiting raiting={accommodation.reviews.raiting} />
        <span>
          {accommodation.reviews.raiting}, {accommodation.reviews.count} Reviews
        </span>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>What is included?</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 w-full">
            <div className="flex items-center">
              <CheckIcon />
              Accomodation
            </div>
            <div className="flex items-center">
              <CheckIcon />
              Fast Wifi
            </div>
            <div className="flex items-center">
              <CheckIcon />
              Coworking
            </div>
            <div className="flex items-center">
              <CheckIcon />
              Transportation
            </div>
            <div className="flex items-center">
              <CheckIcon />
              Private Bathroom
            </div>
          </div>
        </CardContent>
      </Card>

      {/* <div className="aspect-video"> */}
      {/* <Map center={mocked.location.coordinates} /> */}
      {/* </div> */}
    </div>
  );
}
