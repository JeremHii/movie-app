import { Api } from "@/services/api/Api";
import { Director } from "@/models/Director";
import { Movie } from "@/models/Movie";
import { Genre } from "@/models/Genre";
import type { ItemsType } from "@/utils/ItemsType";

export class DatabaseApi {
  static async canPopulate(): Promise<boolean> {
    const response = await Api.instance.get("/database/can-populate");
    if (!response) return false;
    return response.data
  }

  static async populate(pageCount: number): Promise<boolean> {
    const response = await Api.instance.get("/database/populate", {params: {pageCount}});
    if (!response || !response.data) return false;
    return true
  }
}
