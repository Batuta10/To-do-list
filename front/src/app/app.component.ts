import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'To-do-list';
  tasks: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.http.get('http://localhost:3000/task/all')
      .subscribe(x => {
        this.tasks = x;
        console.log(x);
      })
  }
  onDelete($id: string) {
    this.http.delete('http://localhost:3000/task/delete/' + $id)
      .subscribe(x => {
        console.log(x)
        this.getTasks();
      });
  }
  onAdd(x1, y2) {
    var newTask = { titulo: x1.value, descricao: y2.value };
    this.http.post('http://localhost:3000/task/new', newTask).subscribe(x => {
      console.log(x);
      this.getTasks();
    })
  }

  alterCheck($id: string, isChecked) {
    var upDone = { id: $id, done: !isChecked };
    this.http.patch('http://localhost:3000/task/update', upDone).subscribe(x => {
      console.log(x);
      this.getTasks();
    });
  }
}
