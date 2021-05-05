import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getSelectedMachine } from '../store/machines.selectors';
import { Observable, Subject } from 'rxjs';
import { Machine } from '../../core/models/machine.interface';
import { MachinesStatusService } from '../services/machines-status.service';
import { takeUntil } from 'rxjs/operators';
import { MachinesState } from '../store/machines.state';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit, OnDestroy {
  public selectedMachine$: Observable<Machine> = this.store.pipe(select(getSelectedMachine));

  private subGuard$: Subject<void> = new Subject<void>();

  constructor(private store: Store<MachinesState>, private machinesStatusService: MachinesStatusService) {}

  ngOnInit() {
    this.machinesStatusService
      .handleMachinesStatusChanges()
      .pipe(takeUntil(this.subGuard$))
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.subGuard$.next();
    this.subGuard$.unsubscribe();
  }
}
