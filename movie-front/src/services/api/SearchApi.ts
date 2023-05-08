import { Api } from "@/services/api/Api";
import { Director } from "@/models/Director";
import { Movie } from "@/models/Movie";
import { Genre } from "@/models/Genre";
import type { ItemsType } from "@/utils/ItemsType";

export class SearchApi {
  static async search(query: string): Promise<ItemsType> {
    const response = await Api.instance.get("/search", { params: { query } });
    if (!response) return { movies: [], directors: [], genres: [] };
    const movies = response.data.movies.map(
      (movieData: any) => new Movie(movieData)
    );
    const directors = response.data.directors.map(
      (directorData: any) => new Director(directorData)
    );
    const genres = response.data.genres.map(
      (genreData: any) => new Genre(genreData)
    );
    return { movies, directors, genres };
  }
}
