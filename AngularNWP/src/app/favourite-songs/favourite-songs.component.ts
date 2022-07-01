import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Song } from '../model/song';
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-favourite-songs',
  templateUrl: './favourite-songs.component.html',
  styleUrls: ['./favourite-songs.component.scss']
})
export class FavouriteSongsComponent implements OnInit {

  public favourites$: Observable<Song[]> | undefined;


  constructor(private songService: SongService, private router: Router) { 
   this.favourites$ = this.songService.getFavs(localStorage.getItem('username')!)
   
  }

  ngOnInit(): void {
  }

  removeSong(songName:string){
    this.songService.removeFromFavs(songName).subscribe((resp:any) => {
      if(resp){
        alert("Uspesno uklonjena iz liste omiljenih")
        // resp.fav = false
        this.router.navigate(['/song/list'])
      }
      else{
        alert("Doslo je do greske")
      }
    })
  }
}
