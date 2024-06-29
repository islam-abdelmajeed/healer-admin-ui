import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const StaticModal = (props) => {
  const { show, handleClose, children } = props;
  return (
    <Modal show={show} onHide={handleClose}>
      {children}
    </Modal>
  );
};

export default StaticModal;
