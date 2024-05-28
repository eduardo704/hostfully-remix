

import { AccommodationCardData } from "../models/accommodation-card.model";

import { AccomodationInfo } from "./accommodation-info";
import { StickyCard } from "./accommodation-sticky-card";
import { AccomodationImageHeader } from "./accomodation-image-header";
import { Teste } from "./teste";

export interface AccomodationDetailProps {
  accommodation: AccommodationCardData;
}

export default function AccomodationDetail({
  accommodation,
}: AccomodationDetailProps) {
  return (
    <div className="container px-6 mb-10">
      <AccomodationImageHeader imageSrc={accommodation.images.src} />
      <div className="flex gap-4 pt-6">
        <div className="flex flex-col grow gap-2">
          <AccomodationInfo accommodation={accommodation} />
        </div>
        <div>
          <Teste/>
          <StickyCard accommodation={accommodation}></StickyCard>
        </div>
      </div>
    </div>
  );
}


