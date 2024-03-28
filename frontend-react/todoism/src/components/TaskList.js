import Task from './Task'
import { v4 as uuid } from 'uuid'

function TaskList({tasks}) {
    return (
        tasks.map((task, index) => <Task key={uuid()} task={task} index={index}/>)
    )
}

export default TaskList