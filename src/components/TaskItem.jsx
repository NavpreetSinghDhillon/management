import { useState, useContext, useEffect, useRef } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskItem = ({ task }) => {
  const { toggleTask, deleteTask, updateTask, editingTask, setEditingTask } =
    useContext(TaskContext);

  const [editText, setEditText] = useState(task.text);
  const [editDescription, setEditDescription] = useState(task.description);
  const editInputRef = useRef(null);

  // Focus the input when editing starts
  useEffect(() => {
    if (editingTask === task.id && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingTask, task.id]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateTask(task.id, editText, editDescription);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setEditingTask(null);
    }
  };

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        className="task-checkbox"
        aria-label={
          task.completed ? "Mark task as incomplete" : "Mark task as complete"
        }
      />

      {editingTask === task.id ? (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={editInputRef}
            className="edit-input"
            aria-label="Edit task title"
            required
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add description (optional)"
            className="edit-description-input"
            aria-label="Edit task description"
            rows="3"
          />
          <div className="edit-actions">
            <button type="submit" className="save-btn">
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditingTask(null)}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="task-content">
          <div
            className="task-text"
            onDoubleClick={() => setEditingTask(task.id)}
          >
            {task.text}
          </div>
          {task.description && (
            <div
              className="task-description"
              onDoubleClick={() => setEditingTask(task.id)}
            >
              {task.description}
            </div>
          )}
          <div className="task-meta">
            <span className="task-date">
              {new Date(task.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}

      <div className="task-actions">
        {editingTask !== task.id && (
          <>
            <button
              onClick={() => setEditingTask(task.id)}
              className="edit-btn"
              aria-label="Edit task"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="delete-btn"
              aria-label="Delete task"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default TaskItem;
