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

export type AuthFormData = {
  email: string;
  password: string;
  name?: string;
};

export type AppointmentFormData = {
  name: string;
  phone: string;
  date: string;
  time: string;
  email: string;
  comment?: string;
  psychologistId: string;
  psychologistName: string;
};

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (data: AuthFormData) => Promise<void>;
  signIn: (data: AuthFormData) => Promise<void>;
  signOut: () => Promise<void>;
}

export type SortOption =
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc"
  | "rating-asc"
  | "rating-desc";

export interface PaginationResult<T> {
  data: T[];
  hasMore: boolean;
  lastKey?: string;
}

export interface FetchPsychologistsOptions {
  sortBy?: SortOption;
  limit?: number;
  startAfter?: string;
}
