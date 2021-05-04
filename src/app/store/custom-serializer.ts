import * as fromRouter from '@ngrx/router-store';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterStateUrl } from './state';

export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.children[0]) {
      state = state.children[0];
    }

    const { params } = state;

    return { url, queryParams, params };
  }
}
