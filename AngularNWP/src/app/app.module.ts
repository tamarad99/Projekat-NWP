import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TokenInterceptor } from './services/token-interceptor';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { SongListComponent } from './song-list/song-list.component';
import { SongItemComponent } from './song-item/song-item.component';
import { AuthGuardAdmin } from './guard/auth.guard.admin';
import { AuthGuardUser } from './guard/auth.guard.user';
import { AddSongComponent } from './add-song/add-song.component';
import {MatSelectModule} from '@angular/material/select';
import { RemoveSongComponent } from './remove-song/remove-song.component';
import { UpdateSongComponent } from './update-song/update-song.component'
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import { FavouriteSongsComponent } from './favourite-songs/favourite-songs.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AuthGuardLogin } from './guard/auth.guard.login';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SongItemComponent,
    SongListComponent,
    SongListComponent,
    AddSongComponent,
    RemoveSongComponent,
    UpdateSongComponent,
    FavouriteSongsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [AuthGuardUser, AuthGuardAdmin, AuthGuardLogin, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
