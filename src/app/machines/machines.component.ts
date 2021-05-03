import { Component, OnInit } from '@angular/core';
import { MachinesStatusService } from './services/machines-status.service';
import { Store } from '@ngrx/store';
import { RequestMachine } from './state/machines.actions';
import { State } from '../state';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})
export class MachinesComponent implements OnInit {
  constructor(private store: Store<State>, private machinesStatusService: MachinesStatusService) {}
  public ngOnInit(): void {
    this.machinesStatusService.listenOnMachinesStatusChanges().subscribe(machineStatus => {
      return this.store.dispatch(new RequestMachine({ id: machineStatus.id }));
    });
  }
}
