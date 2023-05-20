import axios from "axios";
import { MovieApi } from "@/services/api/MovieApi";
import { DirectorApi } from "@/services/api/DirectorApi";
import { GenreApi } from "@/services/api/GenreApi";
import { useToast } from "vue-toastification";
import { SearchApi } from "@/services/api/SearchApi";
import { DatabaseApi } from "@/services/api/DatabaseApi";

const toast = useToast();

export class Api {
  static instance = axios.create({
    //@ts-ignore
    baseURL: import.meta.env.VITE_APP_API_BASE_URL || "",
  });

  static Movie = MovieApi;
  static Director = DirectorApi;
  static Genre = GenreApi;
  static Search = SearchApi;
  static Database = DatabaseApi;
}

Api.instance.interceptors.response.use(
  (response) => {
    if (response.data && response.data.message) {
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    const message =
      error.response.data && error.response.data.message
        ? error.response.data.message
        : "Une erreur est survenue...";
    toast.error(message);
    return null;
  }
);
