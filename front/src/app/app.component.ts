import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks: any;
  title = 'To-do-list';
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getTasks(false);
  }

  getTasks(status: boolean) {
    this.http.get('http://localhost:3000/task/all')
      .subscribe(x => {
        this.tasks = x;
        this.tasks = this.tasks.filter(x => x.done === status);
      })
  }

  onDelete($id: string) {
    this.http.delete('http://localhost:3000/task/delete/' + $id)
      .subscribe(x => {
        this.getTasks(false);
      });
  }

  onAdd(x1, y2) {
    var newTask = { titulo: x1.value, descricao: y2.value };
    this.http.post('http://localhost:3000/task/new', newTask).subscribe(x => {
      this.getTasks(false);
      //Clean de input
      x1.value = null
      y2.value = null
    })
  }

  alterCheck($id: string, isChecked) {
    var upDone = { id: $id, done: !isChecked };
    this.http.patch('http://localhost:3000/task/update', upDone).subscribe(x => {
      this.getTasks(false);
    });
  }
}
