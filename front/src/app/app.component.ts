import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks: any;
  title = 'To-do-list';
  formTask: FormGroup;
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getTasks(false);

    this.formTask = this.formBuilder.group({
      titulo:[null, [Validators.required, Validators.minLength(3) ]  ],
      descricao:[null, [Validators.required, Validators.minLength(3)] ]
    });
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

  onCreate() {
    this.http.post('http://localhost:3000/task/new', this.formTask.value).subscribe(x => {
      this.getTasks(false);

      this.formTask.reset();
    })
  }

  alterCheck($id: string, isChecked) {
    var upDone = { id: $id, done: !isChecked };
    this.http.patch('http://localhost:3000/task/update', upDone).subscribe(x => {
      this.getTasks(false);
    });
  }
}
