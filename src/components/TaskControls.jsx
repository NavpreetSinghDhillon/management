import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskControls = () => {
  const { filter, setFilter, clearCompleted, allTasks, sortTasks } =
    useContext(TaskContext);

  const completedCount = allTasks.filter((t) => t.completed).length;
  const activeCount = allTasks.length - completedCount;

  return (
    <div className="task-controls">
      <div className="task-stats">
        <span>{activeCount} active</span>
        <span>{completedCount} completed</span>
      </div>

      <div className="filter-tasks">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={filter === "active" ? "active" : ""}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={filter === "completed" ? "active" : ""}
        >
          Completed
        </button>
      </div>

      <div className="sort-tasks">
        <label>Sort by:</label>
        <select onChange={(e) => sortTasks(e.target.value)}>
          <option value="none">None</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="alphabetical">A-Z</option>
        </select>
      </div>

      {completedCount > 0 && (
        <button onClick={clearCompleted} className="clear-completed">
          Clear Completed
        </button>
      )}
    </div>
  );
};

export default TaskControls;
