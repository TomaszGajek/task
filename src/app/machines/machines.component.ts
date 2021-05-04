import { Component, OnDestroy, OnInit } from '@angular/core';
import { MachinesStatusService } from './services/machines-status.service';
import { select, Store } from '@ngrx/store';
import { State } from '../state';
import { selectAllMachines } from './store/machines.selectors';
import { Observable, Subscription } from 'rxjs';
import { Machine } from './models/machine.interface';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})
export class MachinesComponent implements OnInit, OnDestroy {
  public machines$: Observable<Machine[]> = this.store.pipe(select(selectAllMachines));

  private subscription: Subscription;

  constructor(private store: Store<State>, private machinesStatusService: MachinesStatusService) {}

  public ngOnInit(): void {
    this.subscription = this.machinesStatusService.handleMachinesStatusChanges().subscribe();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
