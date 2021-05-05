import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoConfig, SocketIoModule } from 'ng-socket-io';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../store/state';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from '../../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { MachinesModule } from '../machines/machines.module';
import { SandboxModule } from '../sandbox/sandbox.module';
import { CustomSerializer } from '../store/custom-serializer';
import { ENV } from '../app.config';

const config: SocketIoConfig = { url: environment.socketUrl, options: {} };

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MachinesModule,
    SandboxModule,
    SocketIoModule.forRoot(config),
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([])
  ],
  declarations: [],
  providers: [{ provide: ENV, useValue: environment }, { provide: RouterStateSerializer, useClass: CustomSerializer }]
})
export class CoreModule {}
