import { Component, Input, OnInit } from '@angular/core';
import { MachineStatus } from '../models/machine.interface';

@Component({
  selector: 'app-machine-status',
  templateUrl: './machine-status.component.html',
  styleUrls: ['./machine-status.component.scss']
})
export class MachineStatusComponent {
  @Input()
  status: MachineStatus;
}
