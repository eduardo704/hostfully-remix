import { Link } from "@remix-run/react";

import { StarIcon, StarSolidIcon } from "~/components/common/icons";
import mockedObj from "~/mocks/mockedAccommodation";

export default function AccomodationCard() {
  const mocked = mockedObj;

  return (
    <Link to="/accommodation/123" className="flex flex-col gap-2 w-full  border-1  cursor-pointer">
      <div
        className="
          aspect-square 
          w-full 
          rounded-xl
        "
      >
        <img src={mocked.imageSrc} alt="Listing" />
      </div>
      <div className="rounded flex flex-col">
        <span className="font-semibold text-indigo-600 text-lg">
          {mocked.location.name}, {mocked.location.country}
        </span>
        <span className="font-light text-neutral-500">{mocked.level}</span>
        <span className="font-light text-neutral-500 flex ">
          <StarSolidIcon />
          <StarSolidIcon />
          <StarSolidIcon />
          <StarSolidIcon />
          <StarIcon />
          <span>
            {mocked.reviews.ratiting} stars, {mocked.reviews.count} Reviews
          </span>
        </span>
        <span className="font-semibold">$ {mocked.price}</span>
      </div>
    </Link>
  );
}
