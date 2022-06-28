import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Song } from '../model/song';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  BASE = "http://localhost:8080";

  getSongs(): Observable<Song[]> {
    return this.httpClient.get<Song[]>(this.BASE + "/song/songs")
  }

  getSongById(id: number): Observable<any> {
    return this.httpClient.get(this.BASE + "/song/getSongById", {
      params: { id: id.toString() }
    })
  }

  changeRating(id: number, change: number): Observable<any> {
    let params = new HttpParams().set('id', id.toString()).set('change', change.toString())
    return this.httpClient.put(this.BASE + "/song/changeRating", params)
  }

  addSong(song: Song): Observable<Song> {
    return this.httpClient.post<Song>(this.BASE + "/song/addSong", song)
  }

  search(search: string): Observable<Song[]> {
    console.log("zove se search na frontu " + search)
    let params = new HttpParams().set('search', search);
    return this.httpClient.get<Song[]>(this.BASE + "/song/search", {params: params});
  }

  removeSong(id: number):Observable<any>{
    let params = new HttpParams().set('id', id.toString());
    return this.httpClient.post(this.BASE + "/song/removeSong", params)
  }
}
