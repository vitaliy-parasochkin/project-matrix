import {
  UPDATE_CELL,
  UPDATE_COLUMN,
  UPDATE_ITEMHOVERED,
  UPDATE_MATRIX,
  UPDATE_ROW,
  UPDATE_SUMHOVERED,
} from "./types";

const initialState = {
  colValue: 0,
  rowValue: 0,
  cellValue: 0,
  sumHovered: false,
  itemHovered: false,
  matrix: [],
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COLUMN:
      return { ...state, colValue: action.payload };
    case UPDATE_ROW:
      return { ...state, rowValue: action.payload };
    case UPDATE_CELL:
      return { ...state, cellValue: action.payload };
    case UPDATE_MATRIX:
      return { ...state, matrix: action.payload };
    case UPDATE_SUMHOVERED:
      return { ...state, sumHovered: action.payload };
    case UPDATE_ITEMHOVERED:
      return { ...state, itemHovered: action.payload };
    default:
      return state;
  }
};
