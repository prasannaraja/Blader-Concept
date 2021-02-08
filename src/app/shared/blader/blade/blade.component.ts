import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ComponentRef,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver,
  HostListener,
  ElementRef
} from '@angular/core';

import {
  BladeContext,
  BladeArgs,
  BladeState,
  BladeParamConstants
} from '../models';
import { BladeManager } from '../bladeManager.service';

@Component({
  selector: 'tw-blade',
  templateUrl: './blade.component.html',
  styleUrls: ['./blade.component.css'],
  host: {
    class: 'blade',
    '[class.blade--selected]': 'isSelected',
    '[class.blade--wide]': 'bladeState === 2'
  },
})
export class BladeComponent implements OnInit, OnDestroy {
  private _componentRef: ComponentRef<any>;
  private _bladeState: BladeState = BladeState.default;

  @Input()
  public context: BladeContext;

  @Output()
  public stateChanged: EventEmitter<BladeState> = new EventEmitter<BladeState>();

  @Output()
  public selected: EventEmitter<BladeArgs> = new EventEmitter<BladeArgs>();

  @Output()
  public closed: EventEmitter<BladeArgs> = new EventEmitter<BladeArgs>();

  public get id(): number {
    return this._componentRef.instance.id;
  }

  public get title(): string {
    return this._componentRef.instance.title;
  }

  public get isDirty(): boolean {
    return this._componentRef.instance.isDirty;
  }

  public get canMinimize(): boolean {
    return this._bladeState === BladeState.wide;
  }

  public get canMaximize(): boolean {
    return this._bladeState === BladeState.default;
  }

  public get bladeState(): BladeState {
    return this._bladeState;
  }

  public get isSelected(): boolean {
    if (!this._mgr.selected) {
      return false;
    }

    if (!this.context) {
      return false;
    }

    return this._mgr.selected.id === this.context.id;
  }

  public get canClose(): boolean {
    if (this.context.isEntry) {
      return false;
    }

    return !this.isDirty;
  }

  @ViewChild('bladeContent', { read: ViewContainerRef, static: true })
  protected bladeContent: ViewContainerRef;

  public constructor(
    private _mgr: BladeManager,
    private _resolver: ComponentFactoryResolver,
    public element: ElementRef
  ) { }

  public ngOnInit(): void {
    if (this.context) {
      const factory = this.context.metaData.factoryFn
        ? this.context.metaData.factoryFn()
        : this._resolver.resolveComponentFactory(this.context.metaData.component);

      this._componentRef = this.bladeContent
        .createComponent(factory, this.bladeContent.length);
      this._componentRef.instance.id = this.context.id;

      this.setBladeStateIfAvailable();

      console.log(`initialized ${this.title} blade:`, this.context.id);
    }
  }

  public ngOnDestroy(): void {
    if (this._componentRef) {
      console.log(`destroying ${this.title}`);

      this._componentRef.destroy();
    }
  }

  @HostListener('window:keydown', ['$event'])
  public shortCuts(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'q') {
      if (this.isSelected && this.canClose) {
        this.close();
      }
    }
  }

  public select(): void {
    this.selected.next(this.context.toBladeArgs());
  }

  public changeState(state: BladeState): void {
    this._bladeState = state;

    this.stateChanged.next(this._bladeState);
  }

  public close(): void {
    this.closed.next(this.context.toBladeArgs());
  }

  private setBladeStateIfAvailable(): void {
    if (this._mgr.paramValueExist(this.context.id, BladeParamConstants.BLADE_STATE)) {
      this._bladeState = this._mgr.getParamValue<BladeState>(
        this.context.id,
        BladeParamConstants.BLADE_STATE
      );

      this.changeState(this._bladeState);
    }
  }
}

