import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateItemHovered, updateMatrixAction } from "../redux/action";

export const MatrixCell = ({ el }) => {
  const dispatch = useDispatch();
  const matrix = useSelector((state) => state.data.matrix);
  const sumHovered = useSelector((state) => state.data.sumHovered);
  const itemHovered = useSelector((state) => state.data.itemHovered);
  const cellValue = useSelector((state) => state.data.cellValue);

  const addValue = (e) => {
    let newArr = matrix.slice();
    newArr.map((row) => {
      row.map((item) => {
        if (item.id === e.target.id) {
          item.amount++;
        }
      });
    });
    dispatch(updateMatrixAction(newArr));
  };

  const itemHover = () => {
    const newArr = matrix.flat();
    let values = [];
    let minArr = [];
    const currentElement = el.amount;

    newArr.map((el) => {
      values.push(el.amount);
    });

    values.sort((a, b) => {
      return a - b;
    });

    values.map((el) => {
      if (currentElement >= el) {
        minArr.push(currentElement - el);
      } else {
        minArr.push(el - currentElement);
      }
    });

    minArr
      .sort((a, b) => {
        return a - b;
      })
      .shift();

    minArr.splice(cellValue, values.length - cellValue - 1);

    const maxDiff = minArr.slice(-1);
    console.log(minArr, maxDiff);

    matrix.map((row) => {
      row.map((el) => {
        if (((currentElement - el.amount) <= maxDiff) && Math.sign(currentElement - el.amount) !== -1
        ) {
          el.isCloser = true;
        } else if (
          ((el.amount - currentElement) <= maxDiff) &&
          Math.sign(el.amount - currentElement) !== -1
        ) {
          el.isCloser = true;
        }
      });
    });

    dispatch(updateItemHovered(true));
  };

  const itemHoverClear = () => {
    matrix.map(row => {
      row.map(el => {
        el.isCloser = false;
      })
    })

    dispatch(updateItemHovered(false));
  }

  return (
    <td
      className={`cell-item + ${itemHovered ? (el.isCloser ? 'closer' : '') : ""}`}
      key={el.id}
      id={el.id}
      onClick={addValue}
      style={{
        backgroundImage: `linear-gradient(to top, rgba(70,70,70, 0.3) ${el.percentCount}%, rgba(0, 0, 0, 0) 0%)`,
      }}
      onMouseOver={itemHover}
      onMouseLeave={itemHoverClear}
    >
      {sumHovered
        ? el.percentCount > 0
          ? `${el.percentCount}%`
          : el.amount
        : el.amount}
    </td>
  );
};
