import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { UnaryFunction } from 'rxjs';
import { Song } from '../model/song';
import { SongRatingChange } from '../model/song-rating-change';
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-song-item',
  templateUrl: './song-item.component.html',
  styleUrls: ['./song-item.component.scss']
})
// export class SongItemComponent implements OnInit {

//   @Input() public song: Song | undefined;
//   @Output() public ratingChange: EventEmitter<SongRatingChange> = new EventEmitter();
//   public songs: Song[] | undefined;
//   //public song:Song|undefined;
//   constructor(private songService: SongService) { }

//   ngOnInit(): void {
//     this.songService.getSongs().subscribe((resp:any) => {this.songs = resp
//       console.log(resp)})
//     console.log(this.songs)
//   }

//   incrementRating(id:number) {
//     this.songService.getSongById(id).subscribe((resp: any) => this.song = resp)
//     this.ratingChange.emit({ song: this.song!, changeInRating: 1 })
//     console.log("increment rating for song number " + id)
//   }

//   decrementRating(id:number) {
//     this.songService.getSongById(id).subscribe((resp: any) => this.song = resp)
//     this.ratingChange.emit({ song: this.song!, changeInRating: -1 })
//     console.log("decrement rating for song number " + id)
//   }
// }

export class SongItemComponent implements OnInit, OnChanges {

  @Input() public song: Song | undefined;
  @Output() public change: EventEmitter<SongRatingChange> = new EventEmitter();
  @Output() public fav: EventEmitter<string> = new EventEmitter();
  @Input() songToFav: string | undefined;
  public bool=false
  public changed: string[] | undefined;

  public role: string | undefined;
  public videos: string[] | undefined;
  public clicked = false

  constructor(private songService: SongService, private router: Router) { }
  ngOnChanges(changes: { [property: string]: SimpleChange }): void {
    // console.log("dobila child " + this.songToFav)
    // console.log(JSON.stringify(changes['songToFav'].currentValue))
    // this.changed?.push(changes['songToFav'].currentValue);
  }

  // check(song:string){
  //   console.log(this.changed?.find(element => element = song))
  //   return this.changed?.find(element => element = song);
  // }

  ngOnInit(): void {
    this.role = localStorage.getItem('role')!;
    this.songService.exists(this.song!.name).subscribe((resp:any) =>{
      if(resp != null){
        resp.fav = true;
        this.bool = true;
        console.log(this.bool)
        console.log(resp.fav)
      }
    })
  }

  incrementRating() {
    this.change.emit({ song: this.song!, changeInRating: 1 })
  }

  decrementRating() {
    this.change.emit({ song: this.song!, changeInRating: -1 })

  }

  addFav() {
    this.fav.emit(this.song!.name);
  }

  removeSong(remove: any) {
    this.songService.removeSong(this.song!.id).subscribe((resp: any) => {
      if (resp) {
        alert("Uspesno ste uklonili pesmu")
        window.location.reload()
      }
      else {
        alert("Doslo je do greske!")
        window.location.reload()
      }
    })
  }

  imageClick() {

  }
}
