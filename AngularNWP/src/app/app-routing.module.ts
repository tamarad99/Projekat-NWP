import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSongComponent } from './add-song/add-song.component';
import { AuthGuardAdmin } from './guard/auth.guard.admin';
import { AuthGuardUser } from './guard/auth.guard.user';

import { SongItemComponent } from './song-item/song-item.component';
import { SongListComponent } from './song-list/song-list.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { RemoveSongComponent } from './remove-song/remove-song.component'
import { UpdateSongComponent } from './update-song/update-song.component';

const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full"},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "song/item", component: SongItemComponent},
  {path: "song/list", component: SongListComponent},
  {path: "song/addSong", component: AddSongComponent, canActivate:[AuthGuardAdmin]},
  {path: "song/removeSong", component: RemoveSongComponent, canActivate:[AuthGuardAdmin]},
  {path: "song/updateSong", component: UpdateSongComponent, canActivate:[AuthGuardAdmin]},
  {path: "**", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
