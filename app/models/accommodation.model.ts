export interface Location {
	country: string;
	name: string;
	coordinates: number[];
}

export interface Review {
	raiting: number;
	count: number;
}

export interface Accommodation {
	imageSrc: string;
	location: Location;
	level: string;
	price: number;
	reviews: Review;
	name:string;
}

