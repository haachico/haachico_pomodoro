import "./index.css";

type DeleteProps = {
  handleDelete: () => void;
  handleCancel: () => void;
};

const DeletePopup: React.FC<DeleteProps> = ({ handleDelete, handleCancel }) => {
  return (
    <div className="delete-popup">
      <h3>Are you sure you want to delete this task?</h3>
      <div className="delete-popup-buttons">
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default DeletePopup;
