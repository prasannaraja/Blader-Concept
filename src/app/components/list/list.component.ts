import { Component, OnInit } from '@angular/core';

import {
  Blade,
  BladeState,
  BladeManager
} from '../../shared/blader/index';

@Component({
  selector: 'tw-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements Blade, OnInit {
  public id: number;
  public title = 'List';
  public isDirty = false;

  public viewDefId: string;

  public constructor(
    private _mgr: BladeManager
  ) { }

  public ngOnInit(): void {
    this.viewDefId = this._mgr.getParamValue<string>(this.id, 'viewDefId');
  }

  public clicked(key: string): void {
    this._mgr.addWithParams({
      key: key,
      params: [
        { key: 'viewDefId', value: 'ProductViewDef' },
        { key: 'objKey', value: 'Product(1)' }
      ],
      state: BladeState.wide
    });
  }
}
