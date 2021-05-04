import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../state';
import { getSelectedMachine } from '../store/machines.selectors';
import { Observable, Subscription } from 'rxjs';
import { Machine } from '../models/machine.interface';
import { MachinesStatusService } from '../services/machines-status.service';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit, OnDestroy {
  public selectedMachine$: Observable<Machine> = this.store.pipe(select(getSelectedMachine));

  private subscription: Subscription;

  constructor(private store: Store<State>, private machinesStatusService: MachinesStatusService) {}

  ngOnInit() {
    this.subscription = this.machinesStatusService.handleMachinesStatusChanges().subscribe();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
