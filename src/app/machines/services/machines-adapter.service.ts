import { Injectable } from '@angular/core';
import { Machine, MachineApiResponse, MachineSavedStatus, MachineStatus } from '../../core/models/machine.interface';

@Injectable({
  providedIn: 'root'
})
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
