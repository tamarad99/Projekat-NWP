import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Song } from '../model/song';
import { SongRatingChange } from '../model/song-rating-change';
import { SongService } from '../services/song.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {

  public songs$: Observable<Song[]> | undefined;
  public songSearch$: Observable<Song[]> | undefined;
  public reloadList: Subject<void> = new Subject();
  public searchTerm: string | undefined;
  public searchSubject: Subject<string> = new Subject();
  public songsForArtist: Observable<Song[]> = of(this.songService.getSongsForArtist()!);
  public undf: Observable<Song[]> = of(undefined!);
  constructor(private songService: SongService, private router: Router) {
    // route.params.subscribe(val => {
    //   if(this.songsForArtist != undefined){
    //     this.songs$ = this.songsForArtist;
    //     this.songService.clearData();
    //     console.log("songs" + this.songsForArtist)
    //   }
    //   else{
    //   this.songs$ = this.songService.getSongs();
    //   this.songSearch$ = undefined;
    //   console.log("songs" + this.songs$)
    //   }
    // })
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.onSameUrlNavigation = 'reload';
  }

  ngOnInit(): void {
    if (this.songsForArtist != undefined) {
      this.songs$ = this.songsForArtist;
      console.log("songs" + this.songs$)
      this.songsForArtist = this.undf;
    } else {
      this.songs$ = this.songService.getSongs();
      this.songSearch$ = undefined;
      console.log("songs" + this.songs$)
    }
  }

  onRangChange(change: SongRatingChange) {
    this.songService.changeRating(change.song.id, change.changeInRating).
      subscribe((res: any) => {
        this.songs$ = this.songService.getSongs();
        this.songSearch$ = undefined
        if (res) {
          alert("Uspesno ste izmenili ocenu")
        } else {
          alert("Nije moguce izmeniti ocenu")
        }
      });

    console.log("id: " + change.song.id)
    console.log("change: " + change.changeInRating)
  }

  search() {
    this.songSearch$ = this.songService.search(this.searchTerm!);
    console.log(this.searchTerm);
  }
}
