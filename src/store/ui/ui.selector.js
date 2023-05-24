import { createSelector } from "reselect";

const selectUIReducer = (state) => state.ui;

export const selectIsLoggedIn = createSelector(
  [selectUIReducer],
  (ui) => ui.isLoggedIn
)

export const selectIsLoading = createSelector(
    [selectUIReducer],
    (ui) => ui.isLoading
)