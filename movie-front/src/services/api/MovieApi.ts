import { Movie } from "@/models/Movie";
import { EntityApi } from "@/services/api/EntityApi";


export class MovieApi extends EntityApi {
  static model = Movie;
  static path = "/movies"
}
