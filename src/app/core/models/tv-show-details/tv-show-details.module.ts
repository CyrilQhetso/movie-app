import { Actor } from "../actor/actor.module";
import { Genre } from "../genre/genre.module";
import { TvShow } from "../tv-show/tv-show.module";

export interface TvShowDetails extends TvShow{
  episodes: number;
  seasons: number;
  genre: Genre[];
  cast: Actor[];
  status: string;
  tagline: string;
 }
