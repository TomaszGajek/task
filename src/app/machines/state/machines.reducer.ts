import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Machine } from '../machine.interface';
import { MachinesActionsUnion, MachinesActionTypes } from './machines.actions';
import { createSelector } from '@ngrx/store';

export type MachinesState = EntityState<Machine>;

export const machinesAdapter: EntityAdapter<Machine> = createEntityAdapter<Machine>();

export const initialState: MachinesState = machinesAdapter.getInitialState();

export function machinesReducer(state: MachinesState = initialState, action: MachinesActionsUnion): MachinesState {
  switch (action.type) {
    case MachinesActionTypes.AddMachine:
      return machinesAdapter.addOne(action.payload.machine, state);

    default:
      return state;
  }
}
