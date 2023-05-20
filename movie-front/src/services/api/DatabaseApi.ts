import { Api } from "@/services/api/Api";

export class DatabaseApi {
  static async canPopulate(): Promise<boolean> {
    const response = await Api.instance.get("/database/can-populate");
    if (!response) return false;
    return response.data;
  }

  static async populate(pageCount: number): Promise<boolean> {
    const response = await Api.instance.get("/database/populate", {
      params: { pageCount },
    });
    return !(!response || !response.data);
  }
}
