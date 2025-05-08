import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const FilterTasks = () => {
  const { filter, setFilter } = useContext(TaskContext);

  return (
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
  );
};

export default FilterTasks;
