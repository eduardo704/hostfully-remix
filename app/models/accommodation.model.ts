
export interface Accommodation {
  id: number;
  level: string;
  price: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  userId: number;
  images: Images;
  location: Location;
  reviews: Reviews;
}  

export interface Images {
  src: string;
}

export interface Location {
  country: string;
  name: string;
  lat: number;
  long: number;
}

export interface Reviews {
  raiting: number;
  count: number;
}
