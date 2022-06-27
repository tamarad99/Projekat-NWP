import { Song } from "./song";

export interface SongRatingChange {
    song: Song;
    changeInRating: number;
}