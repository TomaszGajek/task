import { uuid } from '../shared/interfaces/uuid.interface';

export enum MachineStatus {
  ON = 'on',
  OFF = 'off'
}

export interface Machine {
  id: uuid;
  name: string;
}

export interface MachineModel extends Machine {
  currentStatus: MachineStatus;
}

export interface MachineStatusFromWebSocket {
  id: uuid;
  status: MachineStatus;
}
