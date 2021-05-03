import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { MachinesState, machinesReducer } from './machines/state/machines.reducer';

export interface State {
  router: RouterReducerState;
  machines: MachinesState;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  machines: machinesReducer
};
