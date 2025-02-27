import { Actor } from "../actor/actor.module";
import { Genre } from "../genre/genre.module";
import { Movie } from "../movie/movie.module";

export interface MovieDetails extends Movie {
  runtime: number;
  budget: number;
  revenue: number;
  genre: Genre[];
  cast: Actor[];
  status: string;
  tagline: string
 }
