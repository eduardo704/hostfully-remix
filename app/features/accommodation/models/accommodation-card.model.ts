

export interface AccommodationCardData {
  id: number
  level: string
  price: string
  createdAt: string
  updatedAt: string
  userId: number
  images: Images
  location: Location
  reviews: Reviews
}

export interface Images {
  accommodationId: number
  src: string
}

export interface Location {
  accommodationId: number
  country: string
  name: string
  lat: string
  long: string
}

export interface Reviews {
  accommodationId: number
  raiting: string
  count: number
}
