import React from "react";
import axios from "../../../../axios";
import Button from "@components/Button/Button";
import LinkIcon from "@icons/LinkIcon";

import styles from "./productModalContent.module.scss";

const ProductModalContent = (props) => {
  const { linkedProducts, setLinkedProducts, handleClose } = props;
  const [products, setProducts] = React.useState([]);
  const [checked, setChecked] = React.useState([]);

  const setCheckedProducts = React.useCallback(() => {
    const newChecked = [...checked];
    linkedProducts.forEach((linkedProduct) => {
      products.forEach((product, idx) => {
        if (linkedProduct._id === product._id) {
          newChecked[idx] = true;
        }
      });
    });
    setChecked(newChecked);
  }, [linkedProducts, products]);

  const getProducts = async () => {
    const res = await axios.get("/product");
    setProducts(res.data);
    setChecked(Array(res.data?.length).fill(false));
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  React.useEffect(() => {
    setCheckedProducts();
  }, [products, setCheckedProducts]);

  const onCheckHandler = (id) => {
    const newChecked = [...checked];
    newChecked[id] = !newChecked[id];
    setChecked(newChecked);
  };

  const onClickReset = () => {
    setChecked(Array(products?.length).fill(false) || []);
  };

  const onClickLink = () => {
    const data = [];
    products.forEach((product, idx) => {
      if (checked[idx]) {
        data.push(product);
      }
    });
    setLinkedProducts(data);
    handleClose();
  };

  return (
    <div className={styles["products-modal-content"]}>
      <ul>
        {products.map((product, idx) => (
          <li key={product._id}>
            <input
              className="form-check-input"
              type="checkbox"
              value={checked[idx]}
              checked={checked[idx]}
              onChange={() => onCheckHandler(idx)}
              id="flexCheckDefault"
            ></input>
            <img
              src={product.images[0]?.secure_url}
              alt={product.images[0]?.public_id}
            />
            <span>{product.name}</span>
          </li>
        ))}
      </ul>
      <div className={styles.actions}>
        <Button variant="secondary" onClick={onClickReset}>
          Reset
        </Button>
        <Button variant="primary" onClick={onClickLink}>
          <LinkIcon />
          Link
        </Button>
      </div>
    </div>
  );
};

export default ProductModalContent;
