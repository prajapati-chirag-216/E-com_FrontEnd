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

export const selectSearchField = createSelector(
  [selectUIReducer],
  (ui)=>ui.searchField
)


export const selectProductData = createSelector(
  [selectUIReducer],
  (ui)=> {
    console.log(ui.productData)
    return ui.productData
  }
)

export const selectProductDataState = createSelector(
  [selectUIReducer],
  (ui)=> {
    return ui.productDataState
  }
)

