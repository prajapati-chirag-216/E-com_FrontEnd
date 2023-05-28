import { createSelector } from "reselect";

const selectFilterSlice = (state) =>state.filter


export const selectSortByHighPrice = createSelector(
    [selectFilterSlice],
    (filter) => filter.sortByHighPrice
)
export const selectSortByLowPrice = createSelector(
    [selectFilterSlice],
    (filter) => filter.sortByLowPrice

)
export const selectSortByNewDate = createSelector(
    [selectFilterSlice],
    (filter) => filter.sortByNewDate
)
export const selectSortByOldDate = createSelector(
    [selectFilterSlice],
    (filter) => filter.sortByOldDate
)
export const selectSortByPopularity= createSelector(
    [selectFilterSlice],
    (filter) => filter.sortByPopularity
)



