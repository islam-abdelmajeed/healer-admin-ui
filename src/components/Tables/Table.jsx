import { useState } from "react";
import { BsChevronLeft, BsChevronRight, BsPencil } from "react-icons/bs";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

const Table = (props) => {
  const [startItem, setStartItem] = useState(0);
  const [endItem, setEndItem] = useState(8);
  const num = 8;
  const paginations = _.range(0, Math.ceil(props.categories.length / 8));
  const navigate = useNavigate();

  const editCulc = (value) => {
    setStartItem((value - 1) * 8);
    setEndItem(value * 8);
  };
  const handleEdit = (category) => {
    navigate(`/category/${category._id}`, { state: { category } });
  };

  const onClickTableRow = (category) => {
    navigate(`/categories/${category._id}/sub-categories`);
  };

  const { categories } = props;

  return (
    <div className="table">
      <table className="main">
        <thead>
          <tr className="">
            <td>Category</td>
            <td>Suppliers</td>
            <td>Stock</td>
            <td>Added</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => {
            if (index >= startItem && index < endItem) {
              return (
                <tr
                  key={category._id}
                  onClick={() => onClickTableRow(category)}
                >
                  <td>
                    <div className="d-flex product-desc">
                      <div>
                        <p className="cat">{category.name}</p>
                        <span>{category.description}</span>
                      </div>
                    </div>
                  </td>
                  <td>{Math.ceil(Math.random() * 1000)}</td>
                  <td>{Math.ceil(Math.random() * 1000)}</td>
                  <td>{new Date(category.updatedAt).toDateString()}</td>
                  <td className="actions">
                    <button onClick={() => handleEdit(category)}>
                      <BsPencil />
                    </button>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
      <div className="tfooter">
        <div className="showing">
          {endItem < categories.length ? (
            <span>
              {" "}
              Showing {startItem + 1}-{endItem} from {categories.length}{" "}
            </span>
          ) : (
            <span>
              {" "}
              Showing {startItem + 1}-{categories.length} from{" "}
              {categories.length}{" "}
            </span>
          )}
        </div>
        <ul>
          <li
            onClick={() => {
              if (startItem >= 8) {
                setStartItem(startItem - 8);
                setEndItem(endItem - 8);
              }
            }}
          >
            <BsChevronLeft />
          </li>
          {paginations.map((value, idx) => {
            if (categories.length / 8 > value) {
              return (
                <li
                  key={idx}
                  className={`${startItem == value * num && "active"}`}
                  onClick={() => editCulc(value + 1)}
                >
                  {value + 1}
                </li>
              );
            }
          })}
          <li
            onClick={() => {
              if (startItem <= 8 * (Math.ceil(categories.length / 8) - 2)) {
                setStartItem(startItem + 8);
                setEndItem(endItem + 8);
              }
            }}
          >
            <BsChevronRight />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Table;
