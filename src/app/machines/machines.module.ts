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
import { Features } from '../core/models/features.enum';

const sharedImportsExports = [MachinesComponent, MachineComponent, MachineStatusComponent, StatusHighlightDirective];

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature(Features.Machines, machinesReducer),
    EffectsModule.forFeature([MachinesEffects])
  ],
  declarations: sharedImportsExports,
  exports: sharedImportsExports,
  providers: []
})
export class MachinesModule {}
