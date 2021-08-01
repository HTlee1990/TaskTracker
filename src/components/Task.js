import {RiDeleteBin5Line} from 'react-icons/ri'

const Task = ({task, deleteTask, toggleReminder}) => {
    return (
        <div className={task.reminder ? "task reminder" : "task"} onDoubleClick={() => toggleReminder(task.id)}>
            <h3>{task.text} <RiDeleteBin5Line onClick={() => deleteTask(task)} style={{color: "#62757f", cursor: "pointer"}}/></h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task
