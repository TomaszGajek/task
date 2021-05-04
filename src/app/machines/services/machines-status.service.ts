import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MachineStatusFromWebSocket } from '../models/machine.interface';
import { Socket } from 'ng-socket-io';
import { select, Store } from '@ngrx/store';
import { selectMachinesIds } from '../store/machines.selectors';
import { State } from '../../store/state';
import { tap, withLatestFrom } from 'rxjs/operators';
import { RequestMachine, UpdateMachine } from '../store/machines.actions';

@Injectable({
  providedIn: 'root'
})
export class MachinesStatusService {
  private machinesStatusChanges$ = this.socket.fromEvent<MachineStatusFromWebSocket>('MACHINE_STATUS_CHANGES');
  private ids$: Observable<string[] | number[]> = this.store.pipe(select(selectMachinesIds));

  constructor(private socket: Socket, private store: Store<State>) {}

  public handleMachinesStatusChanges(): Observable<[MachineStatusFromWebSocket, string[]]> {
    return this.machinesStatusChanges$.pipe(
      withLatestFrom(this.ids$),
      tap(([machineStatus, ids]: [MachineStatusFromWebSocket, string[]]) => {
        const index: number = ids.indexOf(machineStatus.id);

        index === -1
          ? this.store.dispatch(new RequestMachine({ machineStatus }))
          : this.store.dispatch(
              new UpdateMachine({
                id: machineStatus.id,
                changes: {
                  currentStatus: machineStatus.status
                }
              })
            );
      })
    );
  }
}
