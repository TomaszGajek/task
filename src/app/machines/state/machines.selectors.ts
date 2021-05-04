import { machinesAdapter, MachinesState } from './machines.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const { selectIds, selectEntities, selectAll, selectTotal } = machinesAdapter.getSelectors();

export const selectMachinesState = createFeatureSelector<MachinesState>('machines');

export const selectAllMachines = createSelector(selectMachinesState, selectAll);

export const selectMachinesEntities = createSelector(selectMachinesState, selectEntities);

export const selectMachinesIds = createSelector(selectMachinesState, selectIds);
