import { Artist } from "./artist";
import { Song } from "./song";

export class Album{
    id: number;
    name: string;
    artist: Artist;
    songs: Song[];

    constructor(id:number, name:string, artist:Artist, songs:Song[]){
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.songs = songs;
    }
}