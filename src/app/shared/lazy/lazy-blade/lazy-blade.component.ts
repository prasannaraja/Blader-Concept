import { Component } from '@angular/core';

import {
  Blade,
  BladeManager
} from '../../blader/index';

@Component({
  selector: 'tw-lazy-blade',
  templateUrl: './lazy-blade.component.html',
  styleUrls: ['./lazy-blade.component.css']
})
export class LazyBladeComponent {

  public id: number;
  public title = 'Lazy';
  public isDirty = false;

  public constructor(
    private _mgr: BladeManager
  ) { }

  public clicked(key: string): void {
    this._mgr.addWithParams({
      key,
      params: [
        { key: 'viewDefId', value: 'ProductViewDef' },
        { key: 'objKey', value: 'Product(1)' }
      ]
    });
  }

}
