import { createSelector } from "reselect";

const selectUIReducer = (state) => state.ui;

export const selectIsLoggedIn = createSelector(
  [selectUIReducer],
  (ui) => ui.isLoggedIn
);

export const selectIsLoading = createSelector(
  [selectUIReducer],
  (ui) => ui.isLoading
);

export const selectSearchField = createSelector(
  [selectUIReducer],
  (ui) => ui.searchField
);

export const selectProductData = createSelector([selectUIReducer], (ui) => {
  return ui.productData;
});

export const selectProductDataState = createSelector(
  [selectUIReducer],
  (ui) => {
    return ui.productDataState;
  }
);

export const selectAccessToken = createSelector(
  [selectUIReducer],
  (ui) => ui.accessToken
);

export const selectSnackBar = createSelector(
  [selectUIReducer],
  (ui) => ui.snackBar
);


export const selectModelState = createSelector(
  [selectUIReducer],
  (ui) => ui.modelState
);

export const selectUser = createSelector(
  [selectUIReducer],
  (ui) => ui.user
);