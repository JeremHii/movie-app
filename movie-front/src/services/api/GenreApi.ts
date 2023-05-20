import { Genre } from "@/models/Genre";
import { EntityApi } from "@/services/api/EntityApi";

export class GenreApi extends EntityApi {
  static model = Genre;
  static path = "/genres";
}
