import { Api } from "@/services/api/Api";

export class EntityApi {
  static model: any = null;
  static path: string = "";
  static async getAll() {
    if (this.model === null) return [];
    const response = await Api.instance.get(this.path);
    if (!response) return [];
    return response.data.map((data: any) => new this.model(data));
  }

  static async getOne(id: number) {
    if (this.model === null) return null;
    const response = await Api.instance.get(`${this.path}/${id}`);

    return response.data ? new this.model(response.data) : null;
  }

  static async update(id: number, entity: any) {
    if (this.model === null) return false;
    const response = await Api.instance.patch(
      `${this.path}/${id}`,
      entity.getPayload()
    );

    if (response.status !== 200) return false;
    return new this.model(response.data);
  }

  static async create(entity: any) {
    if (this.model === null) return false;
    const response = await Api.instance.post(this.path, entity.getPayload());

    if (response.status !== 201) return false;
    return new this.model(response.data);
  }

  static async delete(id: number) {
    const response = await Api.instance.delete(`${this.path}/${id}`);

    return response.status === 204;
  }
}
