import styles from "./submitBox.module.scss";

const SubmitBox = ({ label }) => {
  return (
    <div className={styles["submit-box"]}>
      <button type="submit">{label}</button>
    </div>
  );
};

export default SubmitBox;
