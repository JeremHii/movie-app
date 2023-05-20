import { Director } from "@/models/Director";
import { EntityApi } from "@/services/api/EntityApi";

export class DirectorApi extends EntityApi {
  static model = Director;
  static path = "/directors";
}
