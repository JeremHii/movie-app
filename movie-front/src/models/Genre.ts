import axios from "axios";

export class Genre {
  id: number;
  name: string;

  static findById(genres: Genre[], id: number) {
    return genres.find((genre) => genre.id === id);
  }

  constructor(data: Genre) {
    this.id = data.id;
    this.name = data.name;
  }
}
