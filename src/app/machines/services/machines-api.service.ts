import { Injectable } from '@angular/core';
import { uuid } from '../../shared/interfaces/uuid.interface';
import { Observable } from 'rxjs';
import { Machine } from '../machine.interface';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MachinesApiService {
  constructor(private httpClient: HttpClient) {}

  getMachineDataById(id: uuid): Observable<Machine> {
    return this.httpClient.get<Machine>(`http://localhost:3000/machines/${id}`);
  }
}
