import {Component} from '@angular/core';
import {AppService} from './service/app.service';
import {Router} from '@angular/router';
import 'rxjs/add/operator/finally';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider} from 'angular5-social-auth';
import {UserService} from './shared/user/user.service';
import {EmbedVideoService} from 'ngx-embed-video/dist';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // tslint:disable-next-line:max-line-length
  constructor(private embedService: EmbedVideoService, private app: AppService, private userService: UserService, private router: Router, private socialAuthService: AuthService) {
  }

  authenticated() {
    return localStorage.getItem('jwt');
  }

  logout() {
    if (this.authenticated()) {
      this.socialAuthService.signOut();
      this.app.logout();
    }
    this.router.navigateByUrl('/login');
  }


  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        const credentials = {provider: socialPlatformProvider, token: userData['token']};
        this.app.authenticateSocial(credentials, () => {
          this.router.navigate(['/home']);
        });
      }
    );
  }

  redirect(pagename: string) {
    this.router.navigate(['/' + pagename]);
  }

}
