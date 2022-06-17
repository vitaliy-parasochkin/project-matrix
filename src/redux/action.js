import {
  UPDATE_CELL,
  UPDATE_COLUMN,
  UPDATE_ITEMHOVERED,
  UPDATE_MATRIX,
  UPDATE_ROW,
  UPDATE_SUMHOVERED,
} from "./types";

export const updateColumnAction = (payload) => ({
  type: UPDATE_COLUMN,
  payload,
});
export const updateRowAction = (payload) => ({ type: UPDATE_ROW, payload });
export const updateCellAction = (payload) => ({ type: UPDATE_CELL, payload });
export const updateMatrixAction = (payload) => ({
  type: UPDATE_MATRIX,
  payload,
});
export const updateSumHovered = (payload) => ({
  type: UPDATE_SUMHOVERED,
  payload,
});
export const updateItemHovered = (payload) => ({
  type: UPDATE_ITEMHOVERED,
  payload,
});
