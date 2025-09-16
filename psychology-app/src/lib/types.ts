export interface User {
  uid: string;
  name: string;
  email: string;
  favorites: string[];
}

export interface Review {
  reviewer: string;
  comment: string;
  rating: number;
}

export interface Psychologist {
  id: string;
  name: string;
  avatar_url: string;
  experience: string;
  reviews: Review[];
  rating: number;
  price_per_hour: number;
  license: string;
  specialization: string;
  initial_consultation: string;
  about: string;
}

export type Inputs = {
  name: string;
  email: string;
  password: string;
};
