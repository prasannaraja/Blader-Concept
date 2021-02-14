import { Component } from '@angular/core';

import {
  Blade,
  BladeManager
} from '../../shared/blader/index';

@Component({
  selector: 'tw-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements Blade {
  public id: number;
  public title = 'Entry';
  public isDirty = false;

  public constructor(
    private _mgr: BladeManager
  ) { }

  public clicked(key: string): void {
    if (key === 'list') {
      this._mgr.addWithParams({
        key,
        params: [
          { key: 'viewDefId', value: 'ProductListViewDef' }
        ]
      });
    } else if (key === 'lazy') {
      this._mgr.addWithParams({ key });
    } else {
      this._mgr.addWithParams({
        key,
        params: [
          { key: 'viewDefId', value: 'ProductViewDef' },
          { key: 'objKey', value: 'Product(1)' }
        ]
      });
    }
  }
}
