import { Action } from '@ngrx/store';
import { Machine } from '../machine.interface';
import { uuid } from '../../shared/interfaces/uuid.interface';

export enum MachinesActionTypes {
  RequestMachine = '[Machines] Request Machine',
  AddMachine = '[Machines] Add Machine',
  UpdateMachine = '[Machines] Update Machine'
}

// here's an example of an action that you can reuse to avoid too much boilerplate
export class RequestMachine implements Action {
  readonly type = MachinesActionTypes.RequestMachine;
  constructor(public payload: { id: uuid }) {}
}

export class AddMachine implements Action {
  readonly type = MachinesActionTypes.AddMachine;
  constructor(public payload: { machine: Machine }) {}
}

export class UpdateMachine implements Action {
  readonly type = MachinesActionTypes.UpdateMachine;

  constructor(public payload: undefined) {}
}

export type MachinesActionsUnion = RequestMachine | AddMachine | UpdateMachine;
