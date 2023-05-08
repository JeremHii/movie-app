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
}
