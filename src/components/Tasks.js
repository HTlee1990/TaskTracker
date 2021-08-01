import Task from'./Task'

const Tasks = ({tasks, deleteTask, toggleReminder}) => {  
  return (
    <>
      {tasks.map((task, idx) => (
        <Task toggleReminder={toggleReminder} key={idx} deleteTask={deleteTask} task = {task}/>
      ))}
    </>
  );
};

export default Tasks;
