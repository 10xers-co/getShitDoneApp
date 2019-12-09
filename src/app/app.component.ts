import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'get-shit-done';
  clientID: string = "";
  clientSec: string = "";
  redirectURI: string = "http://localhost:4200";
  giveAboveURLHere = "https://accounts.google.com/o/oauth2/auth?redirect_uri=" + this.redirectURI + "&response_type=code&client_id=" + this.clientID + "&scope=https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/drive.activity https://www.googleapis.com/auth/calendar&approval_prompt=force&access_type=offline"
  authCode: any;
  scope: any;
  accesstokenURL: string;
  access_token: any;
  expires_in: any;
  refresh_token: any;
  scopenew: any;
  token_type: any;
  newaccessURLformail;
  gotmessagesback: any;
  idofemail: any;

  constructor(
    private route: ActivatedRoute,
    public dataServices: DataService) {
  }

  ngOnInit() {

    this.route.queryParams.forEach((params: Params) => {
      this.authCode = params['code'];
      this.scope = params['scope'];
      if (this.authCode == null || this.authCode == undefined || this.authCode == '') {

      } else {
        this.getaccesstoken();
      }
    });

  }

  getaccesstoken() {
    this.accesstokenURL = "https://oauth2.googleapis.com/token?code=" + this.authCode + "&client_id=" + this.clientID + "&client_secret=" + this.clientSec + "&redirect_uri=" + this.redirectURI + "&grant_type=authorization_code"
    this.dataServices.getServerData(this.accesstokenURL)
      .subscribe(generateAccessToken => {
        console.log(generateAccessToken);
        this.access_token = generateAccessToken["access_token"];
        this.expires_in = generateAccessToken["expires_in"];
        this.refresh_token = generateAccessToken["refresh_token"];
        this.scopenew = generateAccessToken["scope"];
        this.token_type = generateAccessToken["token_type"];
        this.getmail(this.access_token);
      });
  }

  

  getmail(access) {
    const email = "me";
    this.newaccessURLformail = "https://www.googleapis.com/gmail/v1/users/" + email + "/messages?access_token=" + access;
    this.dataServices.getConfig(this.newaccessURLformail)
      .subscribe(generateAccessToken => {
        this.gotmessagesback = generateAccessToken["messages"];
        for (var i = 0; i < this.gotmessagesback.length; i++) {
          this.idofemail = this.gotmessagesback[i].id;
          this.gettheemail(this.idofemail, access);
        }
      });
  }

  gettheemail(emailrefID, access) {
    const email = "me";
    this.newaccessURLformail = "https://www.googleapis.com/gmail/v1/users/" + email + "/messages/" + emailrefID + "?access_token=" + access;
    this.dataServices.getConfig(this.newaccessURLformail)
      .subscribe(generateAccessToken => {
        console.log(generateAccessToken);
      });
  }

}
