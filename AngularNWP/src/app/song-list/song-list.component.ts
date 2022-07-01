import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

import { Song } from '../model/song';
import { SongRatingChange } from '../model/song-rating-change';
import { SongService } from '../services/song.service';
import { of } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit{

  public songs$: Observable<Song[]> | undefined;
  public songSearch$: Observable<Song[]> | undefined;
  public favSongs$ :Observable<Song[]> | undefined;
  public reloadList: Subject<void> = new Subject();
  public searchTerm: string | undefined;
  public searchSubject: Subject<string> = new Subject();
  public songsForArtist: Observable<Song[]> = of(this.songService.getSongsForArtist()!);
  public undf: Observable<Song[]> = of(undefined!);
  public songToFav:string|undefined;
  
  constructor(private songService: SongService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if(params.artist){
        console.log("artist " + params.artist)
        this.songs$ = this.songService.sogsForArtist(params.artist);
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.artist){
        console.log("artist " + params.artist)
        this.songs$ = this.songService.sogsForArtist(params.artist);
      }else{
        this.songs$ = this.songService.getSongs();
      this.songSearch$ = undefined;
      this.songs$.subscribe((resp:any) => console.log(resp))
      }
    });
    //ovaj deo ide samo on u ngoninit bez ovoga iznad
      // this.songs$ = this.songService.getSongs();
      // this.songSearch$ = undefined;
      // this.songs$.subscribe((resp:any) => console.log(resp))
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

  onFav(song: string){
    console.log("emitovalo se: " + song)
    this.favSongs$ = this.songService.addToFavourite(song);
    this.songService.addToFavourite(song).subscribe((resp:any) => {
      if(resp!=null){
        this.songToFav = song
        console.log("u omiljene " + this.songToFav)
        alert("Dodato u omiljene")
        
        this.router.navigate(['/song/favourite'])
      }
    })
  }

  search() {
    this.songSearch$ = this.songService.search(this.searchTerm!);
    this.songSearch$.subscribe((resp:any) => {
      console.log(resp)
      if(resp[0] == null){
        alert("Trazena pesma nije pronadjena")
        this.songSearch$ = undefined
        this.searchTerm = undefined
      }
    })
    console.log(this.searchTerm);
  }
}
