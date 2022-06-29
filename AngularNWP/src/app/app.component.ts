import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Song } from './model/song';
import { SongService } from './services/song.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularNWP';

  public artists: string[] | undefined;
  public songs: Song[] | undefined;

  constructor(private userService:UserService, private router:Router, private songSevice:SongService){}

  ngOnInit(){
    this.songSevice.getArtists().subscribe((resp:any) => this.artists = resp);
  }

  logout(){
    this.userService.logout();
  }

  artistSongs(artist:string){
    this.songSevice.sogsForArtist(artist).subscribe((resp:any) => {this.songs = resp
    console.log(this.songs)})
    this.songSevice.setSongs(this.songs!);
    setTimeout(() => this.router.navigate(['/song/list']), 2000);
    
  }
}
