import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddTask from "./components/AddTask";
import axios from "axios";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchData();
      setTasks(tasksFromServer);
    };
    //fetch로 하기.
    // const fetchTasks = async() => {
    //   const res = await fetch('http://localhost:5000/tasks');
    //   const datas = await res.json();
    //   console.log(datas)
    // }

    getTasks();
  }, []);

  // axios로 fetch하기
  const fetchData = async () => {
    const data = await axios.get("http://localhost:5000/tasks");
    const fetchedTasks = data.data;
    return fetchedTasks;
  };

  const deleteTask = async (task) => {
    await axios.delete(`http://localhost:5000/tasks/${task.id}`);

    const deleted = tasks.filter((el) => el.id !== task.id);
    setTasks(deleted);
  };

  const toggleReminder = async (id) => {
    const taskToToggle = await axios.get(`http://localhost:5000/tasks/${id}`);
    const toggledTask = taskToToggle.data;
    await axios.put(`http://localhost:5000/tasks/${id}`, {
      ...toggledTask,
      reminder: !toggledTask.reminder,
    });
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  const addTask = async (task) => {
    const res = await axios.post(`http://localhost:5000/tasks`, task);
    setTasks([...tasks, res.data]);
    // const id = Math.floor(Math.random() * 10000) +1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask] )
  };

  return (
    <Router>
      <div className="container">
        <Header
          title="hello"
          onAdd={() => setShowAddTask(!showAddTask)}
          showAddTask={showAddTask}
        />
        {showAddTask && <AddTask addTask={addTask} />}
        <Route
          exact
          path="/"
          render={(props) => (
            <>
              {tasks.length > 0 ? (
                <Tasks
                  toggleReminder={toggleReminder}
                  deleteTask={deleteTask}
                  tasks={tasks}
                />
              ) : (
                "add tasks"
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
