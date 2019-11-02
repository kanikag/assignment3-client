import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {HttpHeaders} from "@angular/common/http";

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  getData(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({authorization: 'Bearer ' + localStorage.getItem('jwt')})

    };

    return this.http.get('https://damp-coast-42712.herokuapp.com/api/users/me/tests', httpOptions);
  }

  getSessionsOfPatient(username: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({authorization: 'Bearer ' + localStorage.getItem('jwt')})

    };
    return this.http.get('https://damp-coast-42712.herokuapp.com/api/users/user/' + username + '/tests', httpOptions);
  }

  getUser(username: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({authorization: 'Bearer ' + localStorage.getItem('jwt')})

    };
    return this.http.get('https://damp-coast-42712.herokuapp.com/api/users/user/' + username, httpOptions);
  }

  getRss(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({authorization: 'Bearer ' + localStorage.getItem('jwt')})

    };
    return this.http.get('https://damp-coast-42712.herokuapp.com/api/users/rssfeed', httpOptions);
  }

  getYoutubeVideos(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({authorization: 'Bearer ' + localStorage.getItem('jwt')})

    };
    return this.http.get('https://damp-coast-42712.herokuapp.com/api/users/youtubeVideos', httpOptions);
  }

  getMe(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({authorization: 'Bearer ' + localStorage.getItem('jwt')})

    };

    return this.http.get('https://damp-coast-42712.herokuapp.com/api/users/me', httpOptions);
  }

  getTherapies(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({authorization: 'Bearer ' + localStorage.getItem('jwt')})

    };
    return this.http.get('https://damp-coast-42712.herokuapp.com/api/users/therapies', httpOptions);
  }

  addNote(testSessionId: number, note: string): Observable<any>  {
    const httpOptions = {
      headers: new HttpHeaders({authorization: 'Bearer ' + localStorage.getItem('jwt')})

    };
    return this.http.post('https://damp-coast-42712.herokuapp.com/api/users/user/me/tests/'+testSessionId+'/note',{note: note} ,httpOptions);
  }
}
