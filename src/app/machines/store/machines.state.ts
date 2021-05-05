import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Machine } from '../../core/models/machine.interface';

export interface MachinesState extends EntityState<Machine> {}

export const machinesAdapter: EntityAdapter<Machine> = createEntityAdapter<Machine>();

export const initialState: MachinesState = machinesAdapter.getInitialState();
