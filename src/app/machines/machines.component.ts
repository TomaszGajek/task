import { Component, OnDestroy, OnInit } from '@angular/core';
import { MachinesStatusService } from './services/machines-status.service';
import { select, Store } from '@ngrx/store';
import { RequestMachine, UpdateMachine } from './state/machines.actions';
import { State } from '../state';
import { selectAllMachines, selectMachinesIds } from './state/machines.selectors';
import { Observable, Subject } from 'rxjs';
import { Machine } from './machine.interface';
import { takeUntil, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})
export class MachinesComponent implements OnInit, OnDestroy {
  public machines$: Observable<Machine[]> = this.store.pipe(select(selectAllMachines));

  private subGuard$: Subject<void> = new Subject<void>();

  constructor(private store: Store<State>, private machinesStatusService: MachinesStatusService) {}

  public ngOnInit(): void {
    this.machinesStatusService
      .listenOnMachinesStatusChanges()
      .pipe(
        withLatestFrom(this.store.pipe(select(selectMachinesIds))),
        takeUntil(this.subGuard$)
      )
      .subscribe(([machineStatus, ids]) => {
        const index: number = ids.indexOf(machineStatus.id);

        if (index === -1) {
          this.store.dispatch(new RequestMachine({ machineStatus }));
        } else {
          this.store.dispatch(
            new UpdateMachine({
              id: machineStatus.id,
              changes: {
                currentStatus: machineStatus.status
              }
            })
          );
        }
      });
  }

  public ngOnDestroy(): void {
    this.subGuard$.next();
    this.subGuard$.unsubscribe();
  }
}
