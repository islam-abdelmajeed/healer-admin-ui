import { BsChevronRight } from "react-icons/bs";

function TitleOne() {
  return (
    <div className="title d-flex justify-content-between align-items-center">
      <div>
        <h2>Category Details</h2>
        <div className="path">
          <span>Product</span>
          <span>
            <BsChevronRight />
          </span>
          <span>Categories</span>
          <span>
            <BsChevronRight />
          </span>
          <span>Main Categories</span>
        </div>
      </div>
    </div>
  );
}
export default TitleOne;
