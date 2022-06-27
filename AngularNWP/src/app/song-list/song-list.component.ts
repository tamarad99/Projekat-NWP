import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Song } from '../model/song';
import { SongRatingChange } from '../model/song-rating-change';
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {

  public songs$: Observable<Song[]> | undefined;
  public reloadList: Subject<void> = new Subject();

  constructor(private songService:SongService) { }

  ngOnInit(): void {
    // this.songService.getSongs().subscribe((resp:any) => {this.songs$ = resp
    //   console.log(resp)})
    this.songs$ = this.songService.getSongs();
  }

  onRangChange(change: SongRatingChange){
    this.songService.changeRating(change.song.id, change.changeInRating).
    subscribe((res:any) =>  this.songs$ = this.songService.getSongs());
    alert("Uspesno ste izmenili ocenu")
    console.log("id: " + change.song.id)
    console.log("change: " + change.changeInRating)
  }
}
