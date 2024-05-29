import { Accommodation } from "./accommodation.model";

export interface Booking {
  id: number;
  from: Date|string;
  until: Date|string;
  accommodation: Accommodation;
}
