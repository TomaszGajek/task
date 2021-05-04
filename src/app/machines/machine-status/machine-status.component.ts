import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MachineStatus } from '../models/machine.interface';

@Component({
  selector: 'app-machine-status',
  templateUrl: './machine-status.component.html',
  styleUrls: ['./machine-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MachineStatusComponent {
  @Input()
  status: MachineStatus;
}
