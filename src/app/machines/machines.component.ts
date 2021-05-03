import { Component, OnInit } from '@angular/core';
import { MachinesStatusService } from './services/machines-status.service';
import { select, Store } from '@ngrx/store';
import { RequestMachine } from './state/machines.actions';
import { State } from '../state';
import { selectAllMachines } from './state/machines.selectors';
import { Observable } from 'rxjs';
import { Machine } from './machine.interface';
import { concatMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})
export class MachinesComponent implements OnInit {
  machines$: Observable<Machine[]> = this.store.pipe(select(selectAllMachines));

  constructor(private store: Store<State>, private machinesStatusService: MachinesStatusService) {}

  public ngOnInit(): void {
    this.machinesStatusService
      .listenOnMachinesStatusChanges()
      .pipe(
        tap(console.log)
        // concatMap( machineStatus => {
        //
        // })
      )
      .subscribe(machineStatus => {
        this.store.dispatch(new RequestMachine({ id: machineStatus.id }));
      });
  }
}
