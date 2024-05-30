import { Link } from "@remix-run/react";

import { StarIcon, StarSolidIcon } from "~/components/common/icons";

import { AccommodationCardData } from "./models/accommodation-card.model";
import { Raiting } from "~/components/common/layout/raiting";

interface AccomodationProps {
  accommodation: AccommodationCardData;
}
export default function AccomodationCard({ accommodation }: AccomodationProps) {
  return (
    <Link
      to={`/accommodation/${accommodation.id}`}
      className="flex flex-col gap-2 w-full  border-1  cursor-pointer"
    >
      <div
        className="
          aspect-square 
          w-full 
          rounded-xl
        "
      >
        <img
          className="aspect-[3/4]"
          src={accommodation.images.src}
          alt="Listing"
        />
      </div>
      <div className="rounded flex flex-col">
        <span className="font-semibold text-indigo-600 text-lg">
          {accommodation.location.name}, {accommodation.location.country}
        </span>
        <span className="font-light text-neutral-500">
          {accommodation.level}
        </span>
        <span className="font-light text-neutral-500 flex items-center">
          <Raiting raiting={accommodation.reviews.raiting} />
          <span>
            {accommodation.reviews.raiting}, {accommodation.reviews.count}{" "}
            Reviews
          </span>
        </span>
        <span className="font-semibold">$ {accommodation.price}</span>
      </div>
    </Link>
  );
}
