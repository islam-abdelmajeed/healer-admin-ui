import { BsChevronRight } from "react-icons/bs";
import { useContext, useState } from "react";
import { BiSave } from "react-icons/bi";

function EditPage(props) {
  const { id, setId, editPage, setEditPage } = useContext(MainCategoryContext);
  const [category, setCategory] = useState();
  const [describtion, setDescription] = useState();

  return (
    <>
      <div className="title d-flex justify-content-between align-items-center">
        <div>
          <h2>Product</h2>
          <div className="path">
            <span>Product</span>
            <span>
              <BsChevronRight />
            </span>
            <span>Categories</span>
            <span>
              <BsChevronRight />
            </span>
            {props.list.map((item) => {
              if (item.Id == id) {
                return <span>{item.Category}</span>;
              }
            })}
            <span>
              <BsChevronRight />
            </span>
            <span>Category Details</span>
          </div>
        </div>
        <div>
          <button className="cel me-3" onClick={() => setEditPage(false)}>
            x cancel
          </button>
          <button>
            <BiSave /> Save Category
          </button>
        </div>
      </div>
      {props.list.map((item) => {
        if (item.Id == id) {
          return (
            <div className="edit-category">
              <h2>General Information</h2>
              <div>
                <p>Category Name</p>
                <input
                  name="category"
                  value={category}
                  placeholder={item.Category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div>
                <p>Description</p>
                <textarea
                  name="description"
                  rows={6}
                  value={describtion}
                  placeholder={item.Describtion}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
          );
        }
      })}
    </>
  );
}
export default EditPage;
