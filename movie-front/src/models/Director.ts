import { Movie } from "@/models/Movie";

export class Director {
  id?: number;
  firstName: string;
  lastName: string;
  nationality: string;
  birthDate: Date;
  picture?: string;
  biography?: string;
  movies?: Movie[];

  constructor(data: Director) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.nationality = data.nationality;
    this.birthDate = data.birthDate;
    this.picture = data.picture;
    this.biography = data.biography;
    this.movies = data.movies
      ? data.movies.map(
          (movieData) => new Movie({ ...movieData, director: this })
        )
      : [];
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  getBiography() {
    return (
      this.biography || "Aucune biographie spécifiée pour ce réalisateur..."
    );
  }

  getPicture() {
    return this.picture || "https://placehold.co/400x600/?text=Director";
  }
}
