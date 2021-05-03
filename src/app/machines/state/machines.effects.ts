import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AddMachine, MachinesActionTypes, RequestMachine } from './machines.actions';
import { map, mergeMap } from 'rxjs/operators';
import { MachinesApiService } from '../services/machines-api.service';

@Injectable()
export class MachinesEffects {
  @Effect()
  addMachine$ = this.actions$.pipe(
    ofType<RequestMachine>(MachinesActionTypes.RequestMachine),
    mergeMap(action => this.machinesApiService.getMachineDataById(action.payload.id)),
    map(machine => new AddMachine({ machine }))
  );

  constructor(private actions$: Actions, private machinesApiService: MachinesApiService) {}
}
