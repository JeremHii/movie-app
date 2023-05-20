import { Movie } from "@/models/Movie";

export class Genre {
  id?: number;
  name: string;
  movies: Movie[];

  static findById(genres: Genre[], id: number) {
    return genres.find((genre) => genre.id === id);
  }

  constructor(data: Partial<Genre>) {
    this.id = data.id;
    this.name = data.name || "";
    this.movies = data.movies
      ? data.movies.map((movieData) => new Movie({ ...movieData }))
      : [];
  }

  getPayload() {
    return {
      name: this.name,
    };
  }
}
