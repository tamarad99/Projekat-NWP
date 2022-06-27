import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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

export class SongItemComponent implements OnInit {

  @Input() public song: Song | undefined;
  @Output() public change: EventEmitter<SongRatingChange> = new EventEmitter();

  constructor(private songService: SongService) { }

  ngOnInit(): void {
    
  }

  incrementRating() {
    this.change.emit({ song: this.song!, changeInRating: 1 })
  }

  decrementRating() {
    this.change.emit({ song: this.song!, changeInRating: -1 })

  }
}
