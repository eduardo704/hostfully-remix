
import AccomodationCard from "./accommodation-card";
import { AccommodationCardData } from "./models/accommodation-card.model";

interface AccomodationListProps {
  accommodations: AccommodationCardData[];
}

export default function AccomodationList({
  accommodations,
}: AccomodationListProps) {
  const accList = accommodations.map((item) => (
    <AccomodationCard accommodation={item} key={item.id} />
  ));
  return <div className="grid grid-cols-4 gap-5 p-8">{accList}</div>;
}
