import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Machine, MachineSavedStatus } from '../models/machine.interface';
import { MachinesActionsUnion, MachinesActionTypes } from './machines.actions';

export interface MachinesState extends EntityState<Machine> {}

export const machinesAdapter: EntityAdapter<Machine> = createEntityAdapter<Machine>();

export const initialState: MachinesState = machinesAdapter.getInitialState();

export function machinesReducer(state: MachinesState = initialState, action: MachinesActionsUnion): MachinesState {
  switch (action.type) {
    case MachinesActionTypes.AddMachine:
      return machinesAdapter.addOne(action.payload.machine, state);

    case MachinesActionTypes.UpdateMachine:
      const statuses: MachineSavedStatus[] = [
        ...state.entities[action.payload.id].statuses,
        { date: new Date(), status: action.payload.changes.currentStatus }
      ];

      return machinesAdapter.updateOne(
        {
          id: action.payload.id,
          changes: {
            currentStatus: action.payload.changes.currentStatus,
            statuses
          }
        },
        state
      );

    default:
      return state;
  }
}
