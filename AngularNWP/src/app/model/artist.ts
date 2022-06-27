import { Album } from "./album";

export class Artist{
    id:number;
    name:string;
    albums: Album[];

    constructor(id:number, name:string, albums: Album[]){
        this.id = id;
        this.name = name;
        this.albums = albums;
    }
}