import { createContext, useState } from "react";
import { BsSearch } from "react-icons/bs";
import TitleOne from "./maincategory/TitileOne";
import MainTable from "./maincategory/MainTable";
import EditPage from "./maincategory/EditPage";

export const MainCategoryContext = createContext();
function MainCategory() {
  const [searchCategory, setSearchCategory] = useState();
  const [id, setId] = useState(true);
  const [editPage, setEditPage] = useState(false);

  return (
    <MainCategoryContext.Provider value={{ id, setId, editPage, setEditPage }}>
      <div className="main-category">
        {editPage ? (
          <>
            <EditPage list={listProduct} />
          </>
        ) : (
          <>
            <TitleOne />
            <div className="search">
              <BsSearch />
              <input
                type="text"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                placeholder="Search by product name. . ."
                className="flex-grow-1"
              />
            </div>
            <MainTable list={listProduct} />
          </>
        )}
      </div>
    </MainCategoryContext.Provider>
  );
}
export default MainCategory;

const listProduct = [
  {
    Id: 1,
    Category: "رجال",
    Describtion: "Whatever your activity needs are, we’ve got you covered.",
    Suppliers: "11.266",
    Stock: "1,203",
    Added: "21 Oct 2022",
  },
  {
    Id: 2,
    Category: "نساء",
    Describtion: "Whatever your activity needs are, we’ve got you covered.",
    Suppliers: "11.266",
    Stock: "1,203",
    Added: "21 Oct 2022",
  },
  {
    Id: 3,
    Category: "ألعاب",
    Describtion: "Whatever your activity needs are, we’ve got you covered.",
    Suppliers: "11.266",
    Stock: "1,203",
    Added: "21 Oct 2022",
  },
  {
    Id: 4,
    Category: "رياضة",
    Describtion: "Whatever your activity needs are, we’ve got you covered.",
    Suppliers: "11.266",
    Stock: "1,203",
    Added: "21 Oct 2022",
  },
  {
    Id: 5,
    Category: "ركن الجمال",
    Describtion: "Whatever your activity needs are, we’ve got you covered.",
    Suppliers: "11.266",
    Stock: "1,203",
    Added: "21 Oct 2022",
  },
];
