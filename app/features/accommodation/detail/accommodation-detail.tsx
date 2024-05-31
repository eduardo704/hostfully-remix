


import { Accommodation } from "~/models/accommodation.model";

import { AccomodationInfo } from "./accommodation-info";
import { StickyCard } from "./accommodation-sticky-card";
import { AccomodationImageHeader } from "./accomodation-image-header";

export interface AccomodationDetailProps {
  accommodation: Accommodation;
}

export default function AccomodationDetail({
  accommodation,
}: AccomodationDetailProps) {
  return (
    <div>
      <AccomodationImageHeader imageSrc={accommodation.images.src} />
      <div className="flex gap-4 pt-6 flex-col sm:flex-row">
        <div className="flex flex-col grow gap-2">
          <AccomodationInfo accommodation={accommodation} />
        </div>
        <div>
          <StickyCard></StickyCard>
        </div>
      </div>
    </div>
  );
}
