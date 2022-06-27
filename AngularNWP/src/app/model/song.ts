import { Album } from "./album";

export class Song {
    id: number;
    name: string;
    imageURL: string;
    rang: number;
    description: string;
    album: string;
    year:number;
    artist:string;

    constructor(id:number, name:string,
        imageURL:string, rang:number,
        description:string, album:string, artist:string, year:number){
            this.id = id;
            this.name = name;
            this.rang = rang;
            this.description = description;
            this.album = album;
            this.imageURL = imageURL;
            this.artist = artist;
            this.year = year
        }
}