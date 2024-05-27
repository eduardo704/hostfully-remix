import { MdSurfing } from "react-icons/md";

import { CheckIcon } from "~/components/common/icons";
import { Accommodation } from "~/models/accommodation.server";

interface InfoProps {
  accommodation: Accommodation;
}

export function AccomodationInfo({ accommodation }: InfoProps) {
  return (
    <div>
      <div className="text-4xl font-bold text-indigo-600">
        Superstar hostel beach side
      </div>
      <div className="text-2xl font-bold">
        {accommodation.location.name}, {accommodation.location.country}
      </div>
      <div className="flex items-center">
        <div>
          Level: 
        </div>
        <div className="flex gap-2">
          <MdSurfing className="fill-indigo-600" />
          <MdSurfing className="fill-indigo-600" />
          <MdSurfing className="fill-indigo-600" />
          <MdSurfing />
          <MdSurfing />
        </div>
        <span className="bold text-gray-500">- Intermediate</span>
      </div>
      <div className="border rounded p-6 my-2">
        <div className="pb-4">What is included?:</div>
        <div className="grid grid-cols-3">
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
      </div>
      <div className="aspect-video">
        {/* <Map center={mocked.location.coordinates} /> */}
      </div>
    </div>
  );
}
