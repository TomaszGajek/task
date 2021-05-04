import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../store/state';
import * as fromMachines from './machines.state';

import { Machine } from '../models/machine.interface';

const { selectIds, selectEntities, selectAll } = fromMachines.machinesAdapter.getSelectors();

export const selectMachinesState = createFeatureSelector<fromMachines.MachinesState>('machines');

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
