import { MachineSavedStatus } from '../../core/models/machine.interface';
import { MachinesActionsUnion, MachinesActionTypes } from './machines.actions';
import { initialState, machinesAdapter, MachinesState } from './machines.state';

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
