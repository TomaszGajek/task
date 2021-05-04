import { NgModule } from '@angular/core';
import { MachinesComponent } from './machines.component';
import { MachineComponent } from './machine/machine.component';
import { SharedModule } from '../shared/modules/shared.module';
import { MachineStatusComponent } from './machine-status/machine-status.component';
import { EffectsModule } from '@ngrx/effects';
import { MachinesEffects } from './store/machines.effects';
import { StoreModule } from '@ngrx/store';
import { machinesReducer } from './store/machines.reducer';
import { StatusHighlightDirective } from './directives/status-highlight.directive';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('machines', machinesReducer),
    EffectsModule.forFeature([MachinesEffects])
  ],
  declarations: [MachinesComponent, MachineComponent, MachineStatusComponent, StatusHighlightDirective],
  exports: [MachinesComponent, MachineStatusComponent, StatusHighlightDirective],
  providers: []
})
export class MachinesModule {}
