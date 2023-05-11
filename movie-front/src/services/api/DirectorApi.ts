import { Api } from "@/services/api/Api";
import { Director } from "@/models/Director";

export class DirectorApi {
  static async getAll() {
    const response = await Api.instance.get("/directors");
    if (!response) return [];
    return response.data.map((directorData: any) => new Director(directorData));
  }

  static async getOne(id: number) {
    const response = await Api.instance.get(`/directors/${id}`);

    return response.data ? new Director(response.data) : null;
  }

  static async update(id: number, director: Director) {
    const response = await Api.instance.patch(
        `/directors/${id}`,
        director.getPayload()
    );

    if (response.status !== 200) return false;
    return new Director(response.data);
  }

  static async create(director: Director) {
    const response = await Api.instance.post(
        `/directors`,
        director.getPayload()
    );

    if (response.status !== 201) return false;
    return new Director(response.data);
  }

  static async delete(id: number) {
    const response = await Api.instance.delete(
        `/directors/${id}`
    );

    return response.status === 204;

  }
}
