import { Api } from "@/services/api/Api";
import { Movie } from "@/models/Movie";

export class MovieApi {
  static async getAll() {
    const response = await Api.instance.get("/movies");
    if (!response) return [];
    return response.data.map((movieData: any) => new Movie(movieData));
  }

  static async getOne(id: number) {
    const response = await Api.instance.get(`/movies/${id}`);

    return response.data ? new Movie(response.data) : null;
  }

  static async update(id: number, movie: Movie) {
    const response = await Api.instance.patch(
      `/movies/${id}`,
      movie.getPayload()
    );

    if (response.status !== 200) return false;
    return new Movie(response.data);
  }

  static async create(movie: Movie) {
    const response = await Api.instance.post(
        `/movies`,
        movie.getPayload()
    );

    if (response.status !== 201) return false;
    return new Movie(response.data);
  }

  static async delete(id: number) {
    const response = await Api.instance.delete(
        `/movies/${id}`
    );

    return response.status === 204;

  }
}
