import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../state';
import { getSelectedMachine } from '../store/machines.selectors';
import { Observable } from 'rxjs';
import { Machine } from '../machine.interface';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MachineComponent {
  public selectedMachine$: Observable<Machine> = this.store.pipe(select(getSelectedMachine));

  constructor(private store: Store<State>) {}
}
