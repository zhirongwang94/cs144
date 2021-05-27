import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  @Input() name: string; 
  @Input() val: number; 
  @Output() changed = new EventEmitter<number>();

  
  constructor() { }

  ngOnInit(): void {
  }

}
