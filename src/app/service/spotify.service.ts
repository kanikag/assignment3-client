import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor(private http: HttpClient) {

  }

  login() {
    const authorizationTokenUrl = 'https://accounts.spotify.com/authorize';
    const client_id = '46c4c2487589493e9435f73e216c58bf';
    const parameters = '?client_id=' + client_id + '&redirect_uri=http://localhost:4200/login&scope=user-read-private%20user-read-email&response_type=token&state=123';

    window.location.href = authorizationTokenUrl + parameters;
  }
}
