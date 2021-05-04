import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Machine, MachineApiResponse, MachineStatusFromWebSocket } from '../models/machine.interface';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MachinesAdapterService } from './machines-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class MachinesApiService {
  constructor(private httpClient: HttpClient, private machineAdapter: MachinesAdapterService) {}

  getMachineData(machineStatus: MachineStatusFromWebSocket): Observable<Machine> {
    return this.httpClient
      .get<MachineApiResponse>(`http://localhost:3000/machines/${machineStatus.id}`)
      .pipe(map(machine => this.machineAdapter.adapt(machine, machineStatus.status)));
  }
}
