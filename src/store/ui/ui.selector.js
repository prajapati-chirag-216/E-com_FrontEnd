import { createSelector } from "reselect";

const selectUIReducer = (state) => state.ui;

export const selectIsLoading = createSelector(
  [selectUIReducer],
  (ui) => ui.isLoading
);

export const selectSearchField = createSelector(
  [selectUIReducer],
  (ui) => ui.searchField
);

export const selectProductData = createSelector(
  [selectUIReducer],
  (ui) => ui.productData
);

export const selectProductDataState = createSelector(
  [selectUIReducer],
  (ui) => ui.productDataState
);

export const selectSnackBar = createSelector(
  [selectUIReducer],
  (ui) => ui.snackBar
);

export const selectSuccess = createSelector(
  [selectUIReducer],
  (ui) => ui.success
);
