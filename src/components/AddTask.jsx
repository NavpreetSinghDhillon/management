import { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const AddTask = () => {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const { addTask } = useContext(TaskContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(text, description);
    setText("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-task">
      <div className="task-input-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Task title..."
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description (optional)"
          rows="2"
          className="task-description-input"
        />
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
