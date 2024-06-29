import styles from "./formBox.module.scss";

const FormBox = (props) => {
  const getClassName = () => {
    const classNames = [];
    if (props.col) {
      if (props.col === 3) {
        classNames.push(styles["col-3"]);
      } else if (props.col === 2) {
        classNames.push(styles["col-2"]);
      }
    }
    return classNames.join(" ");
  };

  return (
    <div className={styles["form-box"]}>
      <p>{props.title}</p>
      <div className={getClassName()}>{props.children}</div>
    </div>
  );
};

export default FormBox;
