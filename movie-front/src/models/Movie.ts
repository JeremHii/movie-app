import { Director } from "@/models/Director";
import { Genre } from "@/models/Genre";

export class Movie {
  id?: number;
  title: string;
  releaseDate: Date;
  synopsis?: string;
  lang: string;
  genres: Genre[];
  poster?: string;
  background?: string;
  director?: Director;

  constructor(data: Partial<Movie>) {
    this.id = data.id;
    this.title = data.title || "";
    this.releaseDate = data.releaseDate
      ? new Date(data.releaseDate)
      : new Date();
    this.synopsis = data.synopsis;
    this.lang = data.lang || "en";
    this.poster = data.poster;
    this.background = data.background;
    this.director = data.director ? new Director(data.director) : undefined;
    this.genres = data.genres
      ? data.genres.map((genreData) => new Genre(genreData))
      : [];
  }

  getPayload() {
    return {
      title: this.title,
      releaseDate: this.releaseDate,
      synopsis: this.synopsis,
      lang: this.lang,
      poster: this.poster,
      background: this.background,
      directorId: this.director?.id,
      genreIds: this.genres.map((genre) => genre.id),
    };
  }

  getSynopsis() {
    return this.synopsis || "Aucun synopsis disponible...";
  }

  getTitle() {
    return this.title && this.title.trim() !== "" ? this.title : "Aucun titre";
  }

  getLanguageName() {
    try {
      //@ts-ignore
      const languageNames = new Intl.DisplayNames(["fr"], { type: "language" });
      return languageNames.of(this.lang);
    } catch {
      return this.lang;
    }
  }

  getPoster() {
    return this.poster && this.poster.trim() !== ""
      ? this.poster
      : "https://placehold.co/400x600/?text=Movie";
  }
}
