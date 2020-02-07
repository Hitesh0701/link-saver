import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Store } from "src/app/shared/models/store.model";
import { distinctUntilChanged, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class StoreService {
  private _storeDataSource = new BehaviorSubject(new Store());
  public store$ = this._storeDataSource.asObservable();
  constructor() {}

  // get current state
  getCurrentState() {
    return this._storeDataSource.getValue();
  }

  // update complete store
  updateCompleteStore(data: Store) {
    this._storeDataSource.next(data);
  }

  // update a particular state

  public setState(partialState: Partial<Store>): void {
    const currentState = this.getCurrentState();
    const nextState = Object.assign({}, currentState, partialState);
    this._storeDataSource.next(nextState);
  }

  // get state snapshot
  public getStateSnapshot(): Store {
    return this._storeDataSource.getValue();
  }

  // select a state and return its observable
  public select<K extends keyof Store>(key: K): Observable<Store[K]> {
    const selectStream = this._storeDataSource.pipe(
      map((state: Store) => {
        return state[key];
      }),
      distinctUntilChanged()
    );
    return selectStream;
  }

  removeObjectProperties = (obj, props) => {
    // tslint:disable-next-line: prefer-for-of
    for (var i = 0; i < props.length; i++) {
      if (obj.hasOwnProperty(props[i])) {
        delete obj[props[i]];
      }
    }
  };

  // when user logeed out store date removed
  resetStoreOnLogout() {
    const currentStateOfStore = this._storeDataSource.getValue();
    this.removeObjectProperties(currentStateOfStore, ["userData"]);
    this.updateCompleteStore(currentStateOfStore);
  }
}
