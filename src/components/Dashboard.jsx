import Sidebar from "./Sidebar/Sidebar";
import "./dashboard.css";
import Man from "../assets/man_1.png";
import ProductList from "./ProductList";
import { createContext, useState } from "react";
import MainCategory from "./MianCategory";
import SubCategory from "./SubCategory";
import Orders from "./Orders";
import Customer from "./Customer";
import Supplier from "./Supplier";
import Banner from "./Banner";

export const ShowPageContext = createContext();

function Dashboard() {
  const [page, setpage] = useState("home");
  return (
    <section className="dashboard d-flex">
      <ShowPageContext.Provider value={{ page, setpage }}>
        <Sidebar />
      </ShowPageContext.Provider>
      <div className="header ">
        <div className="flex-grow-1">
          <img src={Man} />
          <span className="active"></span>
          <div className="d-flex flex-column">
            <h1>Ahmed Taha</h1>
            <span>Manager</span>
          </div>
        </div>
        {page == "home" ? (
          "home"
        ) : page == "prolist" ? (
          <ProductList />
        ) : page == "cate" ? (
          <MainCategory />
        ) : page == "sub" ? (
          <SubCategory />
        ) : page == "orders" ? (
          <Orders />
        ) : page == "customer" ? (
          <Customer />
        ) : page == "supplier" ? (
          <Supplier />
        ) : page == "ad" ? (
          <Banner />
        ) : (
          ""
        )}
      </div>
    </section>
  );
}
export default Dashboard;
