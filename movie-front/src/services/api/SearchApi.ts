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

  static async searchPoster(query: string): Promise<string[]> {
    const response = await Api.instance.get("/search/poster", {
      params: { query },
    });

    if (!response) return [];
    return response.data;
  }

  static async searchBackground(query: string): Promise<string[]> {
    const response = await Api.instance.get("/search/background", {
      params: { query },
    });

    if (!response) return [];
    return response.data;
  }

  static async searchPersonPicture(query: string): Promise<string[]> {
    const response = await Api.instance.get("/search/person-picture", {
      params: { query },
    });

    if (!response) return [];
    return response.data;
  }
}
