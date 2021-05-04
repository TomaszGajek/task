import { machinesAdapter, MachinesState } from './machines.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state';
import { Machine } from '../models/machine.interface';

const { selectIds, selectEntities, selectAll, selectTotal } = machinesAdapter.getSelectors();

export const selectMachinesState = createFeatureSelector<MachinesState>('machines');

export const selectAllMachines = createSelector(selectMachinesState, selectAll);

export const selectMachinesEntities = createSelector(selectMachinesState, selectEntities);

export const selectMachinesIds = createSelector(selectMachinesState, selectIds);

export const getSelectedMachine = createSelector(
  selectMachinesEntities,
  fromRoot.getRouterState,
  (entities, router): Machine => {
    return router.state && entities[router.state.params.id];
  }
);
