import { Component, OnInit, Input } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';




@Component({
  selector: 'app-job-title',
  templateUrl: './job-title.component.html',
  styleUrls: ['./job-title.component.css']
})
export class JobTitleComponent implements OnInit {
  @Input('area') area;
  @Input('selection') selection;
  selected ="";

  constructor() { }

  ngOnInit() {
    //this.selected = this.selection.employee;

    console.log(this.area);
    console.log(this.selection);

    console.log(sessionStorage.getItem("employee"))

  }
  jobsControl = new FormControl('', [Validators.required]);
 

}
