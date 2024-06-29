import styles from "./button.module.scss";

const Button = (props) => {
  const getClassName = () => {
    const classNames = [styles.btn];
    if (props.variant === "primary") {
      classNames.push(styles.primary);
    } else if (props.variant === "secondary") {
      classNames.push(styles.secondary);
    } else if (props.variant === "invert") {
      classNames.push(styles.invert);
    }
    return classNames.join(" ");
  };

  return (
    <button className={getClassName()} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
