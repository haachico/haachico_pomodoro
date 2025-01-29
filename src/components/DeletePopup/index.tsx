import "./index.css";

type DeleteProps = {
  handleDelete: () => void;
  handleCancel: () => void;
};

const DeletePopup: React.FC<DeleteProps> = ({ handleDelete, handleCancel }) => {
  return (
    <div className="delete-popup">
      <h1>Are you sure you want to delete this task?</h1>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default DeletePopup;
