import styles from "./formControl.module.scss";

const FormControl = (props) => {
  const { register, name, label, type, errors } = props;

  let input = <></>;
  if (type === "textarea") {
    input = (
      <textarea
        name={name}
        id={name}
        cols="30"
        rows="5"
        {...register(name)}
      ></textarea>
    );
  } else if (type === "select") {
    input = (
      <select
        onChange={
          props?.onChange ? (e) => props?.onChange(e.target.value) : null
        }
      >
        {props.list?.map((item, idx) => (
          <option key={idx} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
    );
  } else if (type === "file") {
    input = (
      <div className={styles["file-box"]}>
        {props.media?.length ? (
          <div className={styles.media}>
            {props.media.map((item, idx) => (
              <img
                key={idx}
                src={item.secure_url}
                alt={item.public_id}
                width="100"
                height="100"
              />
            ))}
          </div>
        ) : (
          <p>Drag and drop image here, or click choose file</p>
        )}

        <input type="file" name={name} id={name} {...props} />
      </div>
    );
  } else {
    input = <input {...register(name)} name={name} type={type} />;
  }

  return (
    <div className={styles["form-box"]}>
      <label htmlFor={name}>{label}</label>
      {input}
      {errors?.[name] && <span className="error">{errors[name]?.message}</span>}
    </div>
  );
};

export default FormControl;
