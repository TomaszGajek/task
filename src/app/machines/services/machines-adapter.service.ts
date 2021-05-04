import { Injectable } from '@angular/core';
import { Machine, MachineApiResponse, MachineSavedStatus, MachineStatus } from '../machine.interface';

@Injectable()
export class MachinesAdapterService {
  public adapt(data: MachineApiResponse, currentStatus: MachineStatus): Machine {
    const savedStatus: MachineSavedStatus = {
      date: new Date(),
      status: currentStatus
    };

    return {
      ...data,
      currentStatus,
      statuses: [savedStatus]
    };
  }
}
