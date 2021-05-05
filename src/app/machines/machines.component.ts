import { Component, OnDestroy, OnInit } from '@angular/core';
import { MachinesStatusService } from './services/machines-status.service';
import { select, Store } from '@ngrx/store';
import { selectAllMachines } from './store/machines.selectors';
import { Observable, Subject } from 'rxjs';
import { Machine } from '../core/models/machine.interface';
import { MachinesState } from './store/machines.state';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})
export class MachinesComponent implements OnInit, OnDestroy {
  public machines$: Observable<Machine[]> = this.store.pipe(select(selectAllMachines));

  private subGuard$: Subject<void> = new Subject<void>();

  constructor(private store: Store<MachinesState>, private machinesStatusService: MachinesStatusService) {}

  public ngOnInit(): void {
    this.machinesStatusService
      .handleMachinesStatusChanges()
      .pipe(takeUntil(this.subGuard$))
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.subGuard$.next();
    this.subGuard$.unsubscribe();
  }

  public trackById(index: number, machine: Machine) {
    return machine.id;
  }
}
