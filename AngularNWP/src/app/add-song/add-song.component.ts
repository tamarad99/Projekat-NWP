import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit {

  constructor(private songService:SongService, private router:Router) { }

  ngOnInit(): void {
  }

  addSong(songForm:any){
    this.songService.addSong(songForm.value.song).subscribe((resp:any) => {
      if(resp){
        alert("Uspesno dodata pesma!")
        this.router.navigate(['/song/list'])
      }
      else{
        alert("Doslo je do greske, pokusajte ponovo!")
        this.router.navigate(['/song/addSong'])
      }
    })
  }
}
