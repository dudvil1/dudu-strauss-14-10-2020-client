import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  Action,
  on,
} from "@ngrx/store";
import * as CoreActions from "../actions/core.actions";
import { environment } from "src/environments/environment";
import { FilterEmailsCollectionModel } from "src/app/models/componentsModels/inbox-outbox-collection.model";

export const coreFeatureKey = "core";

export interface CoreState {
  token?: string;
  allEmails: FilterEmailsCollectionModel[];
  currentEmails: FilterEmailsCollectionModel[];
  userEmail?: string;
  searchField?: string;
}

export const initialState: CoreState = {
  allEmails: [],
  currentEmails: [],
};

const coreReducer = createReducer(
  initialState,
  on(CoreActions.coreInitComplete, (state, action) => {
    return {
      ...state,
      token: action.token,
      userEmail: action.userEmail,
    };
  }),
  on(CoreActions.coreLoginComlete, (state, action) => {
    return {
      ...state,
      token: action.token,
      userEmail: action.userEmail,
    };
  }),
  on(CoreActions.coreGetAllEmailsComplete, (state, action) => {
    return {
      ...state,
      allEmails: action.allEmails,
    };
  }),
  on(CoreActions.coreDeleteEmailComlete, (state, action) => {
    return {
      ...state,
      allEmails: state.allEmails.filter((item) => item._id != action.id),
      currentEmails: state.currentEmails.filter(
        (item) => item._id != action.id
      ),
    };
  }),
  on(CoreActions.corefilterEmailsByUserEmail, (state, action) => {
    return {
      ...state,
      currentEmails: action.filterFunc(state.allEmails, state.userEmail),
    };
  }),
  on(CoreActions.coreSetSearchField, (state, action) => {
    return {
      ...state,
      searchField: action.searchField,
    };
  }),
  on(CoreActions.coreSerchEmails, (state, action) => {
    return {
      ...state,
      currentEmails: action.filterFunc(state.allEmails, state.searchField),
    };
  }),
  on(CoreActions.coreInitCurrentEmails, (state, action) => {
    return {
      ...state,
      currentEmails: [],
    };
  })
);

export function reducer(state: CoreState | undefined, action: Action) {
  return coreReducer(state, action);
}

export const core = createFeatureSelector<CoreState>(coreFeatureKey);
export const token = createSelector(core, (core) => core.token);
export const userEmail = createSelector(core, (core) => core.userEmail);
export const allEmails = createSelector(core, (core) => core.allEmails);
export const currentEmails = createSelector(core, (core) => core.currentEmails);

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [debug]
  : [];

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    return reducer(state, action);
  };
}
