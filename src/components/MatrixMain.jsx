import React from "react";
import { MatrixRow } from "./MatrixRow";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCellAction,
  updateColumnAction,
  updateMatrixAction,
  updateRowAction,
} from "../redux/action";

export const MatrixMain = () => {
  const dispatch = useDispatch();
  const rowValue = useSelector((state) => state.data.rowValue);
  const colValue = useSelector((state) => state.data.colValue);
  const cellValue = useSelector((state) => state.data.cellValue);
  const matrix = useSelector((state) => state.data.matrix);

  const handleSubmit = (e) => {
    e.preventDefault();

    let matrixArr = [];
    for (let i = 0; i < rowValue; i++) {
      matrixArr[i] = [];
      for (let j = 0; j < colValue; j++) {
        const element = {
          amount: Math.floor(Math.random() * 900) + 100,
          id: nanoid(),
          percentCount: 0,
          isCloser: false,
        };
        matrixArr[i][j] = element;
      }
    }

    dispatch(updateMatrixAction(matrixArr));
  };

  const searchAvg = (i) => {
    let sum = 0;
    matrix.map((row) => {
      sum += row[i].amount;
    });
    return Math.trunc(sum / matrix.length);
  };

  const avgSum = (arr) => {
    let sumArr = [];

    arr.map((row) => {
      let sum = 0;
      row.forEach((element) => {
        sum += element.amount;
      });

      sumArr.push(sum);
    });

    return Math.trunc(sumArr.reduce((acc, num) => acc + num, 0) / arr.length);
  };

  const addRow = () => {
    dispatch(updateRowAction(+rowValue + 1));

    const newRow = [];

    for (let i = 0; i < matrix[0].length; i++) {
      const element = {
        amount: Math.floor(Math.random() * 900) + 100,
        id: nanoid(),
      };
      newRow[i] = element;
    }
    dispatch(updateMatrixAction([...matrix, newRow]));
  };

  return (
    <div className="matrix-wrapper">
      <div className="matrix-title">
        <h1>MemCrab Test</h1>
      </div>

      <form className="matrix-form" onSubmit={handleSubmit}>
        <input
          min="1"
          max="100"
          type="number"
          className="form-row"
          placeholder="Enter rows"
          value={rowValue}
          onChange={(e) => dispatch(updateRowAction(e.target.value))}
        />
        <input
          type="number"
          min="1"
          max="100"
          className="form-col"
          placeholder="Enter cols"
          value={colValue}
          onChange={(e) => dispatch(updateColumnAction(e.target.value))}
        />
        <input
          type="number"
          min="1"
          className="form-cell"
          placeholder="Enter cells"
          value={cellValue}
          onChange={(e) => dispatch(updateCellAction(e.target.value))}
        />
        <button type="submit" className="form-button">
          Create matrix
        </button>
      </form>
      <div className="add-row-wrapp">
        <button onClick={addRow} className="add-row">
          Add row
        </button>
      </div>
      {matrix[0] && (
        <div className="matrix-table-wrapper">
          <table className="matrix-table">
            <tbody>
              <tr>
                <td>№</td>
                {matrix[0] &&
                  matrix[0].map((el, i) => <td key={i}>{i + 1}</td>)}
                <td>Sum</td>
              </tr>
              {matrix.map((row, i) => (
                <MatrixRow
                  matrix={matrix}
                  key={"row" + i}
                  row={row}
                  index={i}
                />
              ))}
              <tr>
                <td className="last-cell">AVG</td>
                {matrix[0] &&
                  matrix[0].map((_, i) => <td key={i}>{searchAvg(i)}</td>)}
                <td className="last-cell">{matrix[0] && avgSum(matrix)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
