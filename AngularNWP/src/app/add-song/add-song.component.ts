import { Component, NgModule, OnInit } from '@angular/core';
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit {

  constructor(private songService:SongService) { }

  ngOnInit(): void {
  }

  addSong(songForm:any){
    this.songService.addSong(songForm.value.song).subscribe((resp:any) => alert("Uspesno dodata pesma!"))
  }
}
