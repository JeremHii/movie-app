import type { Movie } from "@/models/Movie";
import type { Director } from "@/models/Director";
import type { Genre } from "@/models/Genre";

export type ItemsType = {
  movies: Movie[];
  directors: Director[];
  genres: Genre[];
};
