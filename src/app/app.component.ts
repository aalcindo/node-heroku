import { Component } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
import { Observable, of } from 'rxjs';

// ng serve --watch  --proxy-config proxy.conf.js

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';

  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com/posts';
  //readonly ROOT_URL='https://resourceful-moose-9ygm0z-dev-ed.my.salesforce.com/services/apexrest/Questions?categories=kids,normal&total=6';
  constructor(private http: HttpClient) {}

  posts: Observable<any>;

getPosts() {
  //"crossDomain": true,
  let headers = new HttpHeaders().set('Authorization', 'Bearer 00D0b000000uQ4B!AQcAQHgeRxg0uSJs4RmjYgbTl70p9YJgrxEqm7gugpiI.EP4U9soAZoq80n9aUr7ttnMDT6NEZ6Yhhx_PdRBg_uXo5DQ4jhE');
    //headers.set('Access-Control-Allow-Origin','https://resourceful-moose-9ygm0z-dev-ed.my.salesforce.com');

   this.http.get("/qq",{headers}).subscribe(
        data => console.log('success', data),
        error => console.log('oops', error)
      );    
}

tokenUrlFull='https://login.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG9dZJodJWITSvG76r1u6mT8d8hjaQBsI_f1LMfKQorF7teOKuju5xS_F_4xKWTUlQnEKUqvDCMPJsoX1vB&client_secret=2669867625228036320&username=alexandrealcindo@resourceful-moose-9ygm0z.com&password=alcindo14csNHrSv1b6CzRMSxRT7oLjFe';
tokenUrl='/api?grant_type=password&client_id=3MVG9dZJodJWITSvG76r1u6mT8d8hjaQBsI_f1LMfKQorF7teOKuju5xS_F_4xKWTUlQnEKUqvDCMPJsoX1vB&client_secret=2669867625228036320&username=alexandrealcindo@resourceful-moose-9ygm0z.com&password=alcindo14csNHrSv1b6CzRMSxRT7oLjFe';
//tokenUrl='/api';


testPost(){
  //let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  let params = new HttpParams()
    .set('password', 'pppppppppppppppppppppppppppppppppppp')
    .set('username', "alexandrealcindo@resourceful-moose-9ygm0z.com")
    .set('client_secret', '2669867625228036320')
    .set('client_id', '3MVG9dZJodJWITSvG76r1u6mT8d8hjaQBsI_f1LMfKQorF7teOKuju5xS_F_4xKWTUlQnEKUqvDCMPJsoX1vB')
    .set('grant_type', 'password');

  //const req = this.http.post(this.tokenUrl,{/*params:params*/
  const req = this.http.post('api/token',{/*params:params*/
     /*password: 'alcindo14csNHrSv1b6CzRMSxRT7oLjFe',
     username: 'alexandrealcindo@resourceful-moose-9ygm0z.com',
     client_secret: '2669867625228036320',
     client_id: '3MVG9dZJodJWITSvG76r1u6mT8d8hjaQBsI_f1LMfKQorF7teOKuju5xS_F_4xKWTUlQnEKUqvDCMPJsoX1vB',
     grant_type: 'password'*/
  })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
          console.log(err);
        }
      );
}

testPostFoo(){
  let params = new HttpParams()
    .set('title', 'pppppppppppppppppppppppppppppppppppp')
    .set('body', "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
    .set('userId', '1');
  //console.log(params);
  
  const req = this.http.post('/foo', {
  //const req = this.http.post('/foo', {
      
      title: 'fooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo1',
      body: 'bar',
      userId: 1
    })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
          console.log(err);
        }
      );
}

testgetFoo(){
  let params = new HttpParams()
    .set('title', 'pppppppppppppppppppppppppppppppppppp')
    .set('body', "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
    .set('userId', '1');
  //console.log(params);
  
  const req = this.http.get('/questions/6?categories=kids,normal', {
    })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
          console.log(err);
        }
      );
}

}
