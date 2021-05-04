import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Machine, MachineApiResponse, MachineStatusFromWebSocket } from '../models/machine.interface';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MachinesAdapterService } from './machines-adapter.service';
import { ENV } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class MachinesApiService {
  constructor(
    private httpClient: HttpClient,
    private machineAdapter: MachinesAdapterService,
    @Inject(ENV) private environment
  ) {}

  getMachineData(machineStatus: MachineStatusFromWebSocket): Observable<Machine> {
    return this.httpClient
      .get<MachineApiResponse>(`${this.environment.baseUrl}/machines/${machineStatus.id}`)
      .pipe(map(machine => this.machineAdapter.adapt(machine, machineStatus.status)));
  }
}
