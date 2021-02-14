import { Component, OnInit } from '@angular/core';
import {
  Blade,
  BladeManager
} from '../../shared/blader/index';
@Component({
  selector: 'tw-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements Blade, OnInit {
  public id: number;
  public title = 'Detail';
  public isDirty = false;

  public viewDefId: string;
  public objKey: string;

  public constructor(
    private _mgr: BladeManager
  ) { }

  public ngOnInit(): void {
    this.viewDefId = this._mgr.getParamValue<string>(this.id, 'viewDefId');
    this.objKey = this._mgr.getParamValue<string>(this.id, 'objKey');
  }

  public newTitle(): void {
    this.title = new Date().toDateString();
    this.isDirty = true;
  }

  public cancel(): void {
    this.isDirty = false;
  }

  public select(id: string): void {
    this._mgr.select(Number.parseFloat(id));
  }
}
