import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {AppService} from '../service/app.service';
import {SpotifyService} from '../service/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {username: '', password: ''};
  constructor(private app: AppService, private http: HttpClient, private router: Router, private  spotifyService: SpotifyService) {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    const access_token = this.router.url && this.router.url.split('access_token=')[1].split('&token_type')[0];
    if ( access_token ) {
      const credentials = {provider: 'spotify', token: access_token};
      this.app.authenticateSocial(credentials, () => {
        this.router.navigate(['/home']);
      });
    }
  }

  loginWithSpotify() {
    this.spotifyService.login();
  }

  login() {
    this.app.authenticate(this.credentials, () => {
      this.router.navigateByUrl('/home');
    });
    return false;
  }

  authenticated() {
    return localStorage.getItem('jwt');
  }
}
