import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Song } from '../model/song';
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-update-song',
  templateUrl: './update-song.component.html',
  styleUrls: ['./update-song.component.scss']
})
export class UpdateSongComponent implements OnInit {

  public song: Song | undefined;
  public searchTerm: string | undefined;

  constructor(private songService: SongService, private router: Router) { }

  ngOnInit(): void {
  }

  search() {
    console.log(this.searchTerm);
    this.songService.find(this.searchTerm!).subscribe((resp: any) => {this.song = resp
    if(resp == undefined){
      alert("Ne postoji trazena pesma!")
      this.searchTerm = undefined;
    }})
  }

  updateSong(songForm: any) {
    if(songForm.value.song.name != ''){
      this.song!.name = songForm.value.song.name;
    }
    if(songForm.value.song.album != ''){
      this.song!.album = songForm.value.song.album;
    }
    if(songForm.value.song.artist != ''){
      this.song!.artist = songForm.value.song.artist;
    }
    if(songForm.value.song.imageURL != ''){
      this.song!.imageURL = songForm.value.song.imageURL;
    }
    if(songForm.value.song.rang != ''){
      this.song!.rang = songForm.value.song.rang;
    }
    if(songForm.value.song.year != 0){
      this.song!.year = songForm.value.song.year;
    }
    if(songForm.value.song.description != undefined){
      this.song!.description = songForm.value.song.description;
    }
    this.songService.updateSong(this.song!).subscribe((resp: any) => {
      if (resp) {
        console.log(songForm.value.song)
        alert("Uspesno izmenjena pesma!")
        this.router.navigate(['/song/list'])
      }
      else {
        alert("Doslo je do greske, pokusajte ponovo!")
        this.router.navigate(['/song/updateSong'])
      }
    })
  }
}
