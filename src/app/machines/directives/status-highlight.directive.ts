import { Directive, ElementRef, Input } from '@angular/core';
import { MachineStatus } from '../models/machine.interface';

@Directive({
  selector: '[appStatusHighlight]'
})
export class StatusHighlightDirective {
  @Input('appStatusHighlight')
  set status(value: MachineStatus) {
    this.highLight(value);
  }

  constructor(private el: ElementRef) {}

  private highLight(status: MachineStatus): void {
    this.el.nativeElement.style.color = status === MachineStatus.ON ? 'green' : 'red';
  }
}
