import { Action } from '@ngrx/store';
import { Machine, MachineStatusFromWebSocket } from '../../core/models/machine.interface';

export enum MachinesActionTypes {
  RequestMachine = '[Machines] Request Machine',
  AddMachine = '[Machines] Add Machine',
  UpdateMachine = '[Machines] Update Machine'
}

export class RequestMachine implements Action {
  readonly type = MachinesActionTypes.RequestMachine;
  constructor(public payload: { machineStatus: MachineStatusFromWebSocket }) {}
}

export class AddMachine implements Action {
  readonly type = MachinesActionTypes.AddMachine;
  constructor(public payload: { machine: Machine }) {}
}

export class UpdateMachine implements Action {
  readonly type = MachinesActionTypes.UpdateMachine;

  constructor(public payload: { id: string; changes: { currentStatus } }) {}
}

export type MachinesActionsUnion = RequestMachine | AddMachine | UpdateMachine;
