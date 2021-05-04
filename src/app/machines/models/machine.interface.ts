import { uuid } from '../../shared/interfaces/uuid.interface';

export enum MachineStatus {
  ON = 'on',
  OFF = 'off'
}

export interface MachineApiResponse {
  id: uuid;
  name: string;
}

export interface Machine extends MachineApiResponse {
  currentStatus: MachineStatus;
  statuses: MachineSavedStatus[];
}

export interface MachineStatusFromWebSocket {
  id: uuid;
  status: MachineStatus;
}

export interface MachineSavedStatus {
  date: Date;
  status: MachineStatus;
}
