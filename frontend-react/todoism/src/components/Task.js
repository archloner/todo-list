import { useRef, useEffect } from 'react'

function Task({index, task: { taskTitle, taskDescription, priority, dueDate, isComplete}}) {

  const taskDetailsRef = useRef()
  const priorityLabelRef = useRef()
  const taskWrapperRef = useRef()
  const moreMenuRef = useRef()

  function getPriorityClasses(priority) {
    let wrapper = ''
    let label = ''

    if (priority === 'Default') {
      wrapper = 'priority-default-border'
      label = 'bg-light'
    } else if (priority === 'High') {
      wrapper = 'priority-high-border'
      label = 'bg-danger'
    } else if (priority === 'Low') {
      wrapper = 'priority-low-border'
      label = 'bg-low'
    } else if (priority === 'Medium') {
      wrapper = 'priority-medium-border'
      label = 'bg-medium'
    }

    return { wrapperClassName: wrapper, labelBackgroundClassName: label }
  }

  useEffect(() => {
    let { wrapperClassName, labelBackgroundClassName } = getPriorityClasses(priority)
    taskWrapperRef.current.classList.add(wrapperClassName)
    priorityLabelRef.current.classList.add(labelBackgroundClassName)
  }, [])

  function handleShowTaskClick(e) {
    console.log(index)
    const button = e.target
    button.classList.toggle('fa-chevron-down')
    button.classList.toggle('fa-chevron-up')
    taskDetailsRef.current.classList.toggle('hide')
  }

  function showTaskDetails() {
    taskDetailsRef.current.classList.remove('hide')
  }

  function handleCheckboxClick(e) {
    isComplete = !isComplete
  }

  function handleShowMoreClick() {
    moreMenuRef.current.classList.toggle('hide')
  }

  return (
    <div className="task" data-index="0" ref={taskWrapperRef}>
      <div className="task-content">
        <input type="checkbox" id={'task-' + index} defaultChecked={isComplete} onChange={handleCheckboxClick}/>
        <div className="checkbox-wrapper">
          <label htmlFor={'task-' + index}>
            <span className="checkbox">
              <span className="check"></span>
            </span>
          </label>
        </div>
        <div className="task-text">
          <div className="title">{taskTitle}</div>
          <div className="task-details hide" ref={taskDetailsRef}>
            <div className="description font-sm">
              {taskDescription}
            </div>
            <div className="flex-row">
              <div className="priority font-sm" ref={priorityLabelRef}>{priority}</div>
              <div className="due-date font-sm">
                Due date
                <span className="date"> {dueDate} </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="task-menu">
        <i className="fas fa-chevron-down icon chevron" onClick={handleShowTaskClick}></i>
        <i className="fas fa-ellipsis-v icon more" onClick={handleShowMoreClick}></i>
        <div className="more-menu hide" ref={moreMenuRef}>
          <ul>
            <li className="more-menu-option edit">
              <i className="far fa-edit icon"></i>Edit
            </li>
            <li className="more-menu-option delete">
              <i className="far fa-trash-alt icon"></i> Delete
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Task;
