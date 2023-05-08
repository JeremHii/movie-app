import { Api } from "@/services/api/Api";
import { Director } from "@/models/Director";
import { Genre } from "@/models/Genre";

export class GenreApi {
  static async getAll() {
    const response = await Api.instance.get("/genres");
    if (!response) return [];
    return response.data.map((genreData: any) => new Genre(genreData));
  }

  static async getOne(id: number) {
    const response = await Api.instance.get(`/genres/${id}`);

    return response.data ? new Genre(response.data) : null;
  }
}
