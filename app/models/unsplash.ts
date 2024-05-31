export interface Profile_image {
	small: string;
	medium: string;
	large: string;
}

export interface Link {
	self: string;
	html: string;
	photos: string;
	likes: string;
	download: string;
}

export interface User {
	id: string;
	username: string;
	name: string;
	first_name: string;
	last_name: string;
	instagram_username: string;
	twitter_username: string;
	portfolio_url: string;
	profile_image: Profile_image;
	links: Link;
}

export interface Url {
	raw: string;
	full: string;
	regular: string;
	small: string;
	thumb: string;
}

export interface UnsplashResult {
	id: string;
	created_at: string;
	width: number;
	height: number;
	color: string;
	blur_hash: string;
	likes: number;
	liked_by_user: boolean;
	description: string;
	user: User;
	urls: Url;
	links: Link;
}

export interface UnsplashResponse{
    results: UnsplashResult[]
}