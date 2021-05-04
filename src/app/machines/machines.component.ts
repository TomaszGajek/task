import { Component, OnDestroy, OnInit } from '@angular/core';
import { MachinesStatusService } from './services/machines-status.service';
import { select, Store } from '@ngrx/store';
import { RequestMachine, UpdateMachine } from './store/machines.actions';
import { State } from '../state';
import { selectAllMachines, selectMachinesIds } from './store/machines.selectors';
import { Observable, Subject } from 'rxjs';
import { Machine, MachineStatusFromWebSocket } from './machine.interface';
import { takeUntil, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})
export class MachinesComponent implements OnInit, OnDestroy {
  public machines$: Observable<Machine[]> = this.store.pipe(select(selectAllMachines));

  private subGuard$: Subject<void> = new Subject<void>();
  private ids$: Observable<string[] | number[]> = this.store.pipe(select(selectMachinesIds));

  constructor(private store: Store<State>, private machinesStatusService: MachinesStatusService) {}

  public ngOnInit(): void {
    this.handleMachinesStatuses();
  }

  public ngOnDestroy(): void {
    this.subGuard$.next();
    this.subGuard$.unsubscribe();
  }

  private handleMachinesStatuses(): void {
    this.machinesStatusService
      .listenOnMachinesStatusChanges()
      .pipe(
        withLatestFrom(this.ids$),
        takeUntil(this.subGuard$)
      )
      .subscribe(([machineStatus, ids]: [MachineStatusFromWebSocket, string[]]) => {
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
}
