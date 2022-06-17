import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateMatrixAction,
  updateRowAction,
  updateSumHovered,
} from "../redux/action";
import { MatrixCell } from "./MatrixCell";

export const MatrixRow = ({ index, row }) => {
  const dispatch = useDispatch();
  const matrix = useSelector((state) => state.data.matrix);
  const rowValue = useSelector((state) => state.data.rowValue);

  const countSum = () => {
    let sum = 0;
    row.forEach((element) => {
      sum += element.amount;
    });
    return sum;
  };

  const deleteRow = (e) => {
    let newArr = matrix.slice();
    const id = e.target.id;
    if (matrix.length > 1) {
      newArr.splice(id, 1);
      dispatch(updateRowAction(+rowValue - 1));
      dispatch(updateMatrixAction(newArr));
    }
  };

  const onHoverSum = (e) => {
    const id = e.target.id;
    const sum = e.target.innerHTML;
    const newArr = matrix[id];
    newArr.map((el) => {
      el.percentCount = Math.floor((el.amount * 100) / sum, 2);
    });
    dispatch(updateSumHovered(true));
  };

  const onLeaveSum = () => {
    matrix.map((row) => {
      row.map((item) => {
        item.percentCount = 0;
      });
    });
    dispatch(updateSumHovered(false));
  };

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        {row.map((el, id) => (
          <MatrixCell key={id} el={el} />
        ))}
        <td
          id={index}
          className="last-cell"
          onMouseOver={onHoverSum}
          onMouseLeave={onLeaveSum}
        >
          {countSum()}
        </td>
        <td className="delete" onClick={deleteRow} id={index}>
          ×
        </td>
      </tr>
    </>
  );
};
