import "./index.css";

const TaskDescription = () => {
  return (
    <div className="description-form">
      <div>
        <label htmlFor="title">Title:</label>
        <input id="title" placeholder="Title" />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input id="description" placeholder="Description" />
      </div>
    </div>
  );
};

export default TaskDescription;
