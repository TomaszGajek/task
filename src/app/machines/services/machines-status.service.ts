import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MachineStatusFromWebSocket } from '../machine.interface';
import { scan, tap } from 'rxjs/operators';
import { Socket } from 'ng-socket-io';

@Injectable()
export class MachinesStatusService {
  constructor(private socket: Socket) {}

  public listenOnMachinesStatusChanges(): Observable<MachineStatusFromWebSocket> {
    return this.socket.fromEvent<MachineStatusFromWebSocket>('MACHINE_STATUS_CHANGES');
  }
}
