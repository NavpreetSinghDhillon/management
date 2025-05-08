// import "./styles.css";

// export default function App() {
//   return (
//     <div className="App">
//       <h1>Hello CodeSandbox</h1>
//       <h2>Start editing to see some magic happen!</h2>
//     </div>
//   );
// }

import { TaskProvider } from "./context/TaskContext";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import TaskControls from "./components/TaskControls";
import "./styles.css";

function App() {
  return (
    <TaskProvider>
      <div className="app">
        <h1>Task Manager</h1>
        <AddTask />
        <TaskControls />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;
