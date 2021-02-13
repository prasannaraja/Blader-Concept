import { Component } from '@angular/core';
import { Blade } from '../../shared/blader/index';

@Component({
  selector: 'tw-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements Blade {
  public id: number;
  public title = 'Home blade';
  public isDirty = false;
}
