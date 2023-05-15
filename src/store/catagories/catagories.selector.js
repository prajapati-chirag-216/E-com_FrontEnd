import { createSelector } from "reselect";

const catagorySlice = (state) =>  state.catagories;

export const selectCatagoriId = createSelector(
[catagorySlice],
(catagories) => catagories.categoryId
)

export const selectCatagoryName = createSelector(
    [catagorySlice],
    (catagories) => catagories.catagoryName
)