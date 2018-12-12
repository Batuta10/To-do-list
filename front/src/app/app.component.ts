import { Component,OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {  

    task:any;
    constructor(private http: HttpClient) { }
  
    ngOnInit() {
      this.http.get('')
      .subscribe(x => {
        this.task = x;
        console.log(x);
      })
    }
  
  title = 'To-do-list';
}
