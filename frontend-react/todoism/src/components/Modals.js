function Modals() {
  return (
    <div>
      <div
        className="modal-wrapper wrapper-fade-in-animation hide"
        id="new-task-modal-wrapper"
      >
        <div className="new-task-modal modal-show-animation">
          <h1 className="title">Add new task</h1>
          <form id="new-task-form">
            <div className="form-row">
              <label for="task-title" className="form-label" id="form-label-title">
                Task title <span className="validation-msg"></span>
              </label>
              <input
                type="text"
                name="task-title"
                id="task-title"
                placeholder="Title"
              />
            </div>

            <div className="form-row">
              <label
                for="task-description"
                className="form-label"
                id="form-label-description"
              >
                Task description <span className="validation-msg"></span>
              </label>
              <input
                type="text"
                name="task-description"
                id="task-description"
                placeholder="Description"
              />
            </div>

            <div className="form-row">
              <label
                for="task-priority"
                className="form-label"
                id="form-label-priority"
              >
                Priority
              </label>
              <form id="priority-form">
                <div className="flex-row radio-wrapper">
                  <div className="radio-container bg-white">
                    <input
                      type="radio"
                      name="priority"
                      id="priority-default"
                      value="default"
                      checked
                    />
                    <label for="priority-default">Default</label>
                  </div>
                  <div className="radio-container bg-low">
                    <input
                      type="radio"
                      name="priority"
                      id="priority-low"
                      value="low"
                    />
                    <label for="priority-low">Low</label>
                  </div>
                  <div className="radio-container bg-medium">
                    <input
                      type="radio"
                      name="priority"
                      id="priority-medium"
                      value="medium"
                    />
                    <label for="priority-medium">Medium</label>
                  </div>
                  <div className="radio-container bg-danger">
                    <input
                      type="radio"
                      name="priority"
                      id="priority-high"
                      value="high"
                    />
                    <label for="priority-high">High</label>
                  </div>
                </div>
              </form>
            </div>

            <div className="form-row">
              <label
                for="task-due-date"
                className="form-label"
                id="form-label-due-date"
              >
                Due date <span className="validation-msg">test</span>
              </label>
              <input type="date" name="task-due-date" id="task-due-date" />
            </div>

            <div className="form-row form-controls">
              <button className="btn btn-primary" id="new-task-submit">
                Create
              </button>
            </div>
            <div className="close-btn">
              <i className="fas fa-times"></i>
            </div>
          </form>
        </div>
      </div>

      <div
        className="modal-wrapper wrapper-fade-in-animation hide"
        id="new-project-modal-wrapper"
      >
        <div className="new-task-modal modal-show-animation">
          <h1 className="title">Add new project</h1>
          <form id="new-project-form">
            <div className="form-row">
              <label
                for="project-title"
                className="form-label"
                id="form-label-project-title"
              >
                Project title <span className="validation-msg"></span>
              </label>
              <input
                type="text"
                name="project-title"
                id="project-title"
                placeholder="Title"
              />
            </div>

            <div className="form-row">
              <label
                for="project-description"
                className="form-label"
                id="form-label-project-description"
              >
                Project description <span className="validation-msg"></span>
              </label>
              <input
                type="text"
                name="project-description"
                id="project-description"
                placeholder="Description"
              />
            </div>

            <div className="form-row form-controls">
              <button className="btn btn-primary" id="new-project-submit">
                Create
              </button>
            </div>
          </form>
          <div className="close-btn">
            <i className="fas fa-times"></i>
          </div>
        </div>
      </div>

      <div
        className="modal-wrapper wrapper-fade-in-animation hide"
        id="confirm-task-delete-modal"
      >
        <div className="new-task-modal modal-show-animation">
          <h1 className="title">Delete task?</h1>
          <p>
            Delete task <span className="task-title"></span>?
          </p>
          <div className="form-row form-controls">
            <button className="btn btn-danger" id="delete-confirm">
              Delete
            </button>
            <button className="btn btn-primary" id="delete-cancel">
              Cancel
            </button>
          </div>
          <div className="close-btn">
            <i className="fas fa-times"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modals;
