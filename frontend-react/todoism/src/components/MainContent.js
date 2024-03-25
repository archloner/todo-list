function MainContent() {
    return (
        <div className="container">
          <div className="flex-row">
            <h1 className="list-title">Overview</h1>
            <div className="push-right align-center">
            
              <i className="fas fa-ellipsis-v"></i>
            </div>
          </div>
          <p className="list-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <div className="tasks-wrapper">
            <div className="flex-row">
              <div className="tasks-title">Todo</div>
              <div className="push-right">
                <span id="expand-all-hide-all-span" className="font-sm">
                  Expand all
                </span>
              </div>
            </div>

            <form>
              <div className="task" data-index="0">
                <div className="task-content">
                  <input type="checkbox" id="task-1" />
                  <div className="checkbox-wrapper">
                    <label for="task-1">
                      <span className="checkbox">
                        <span className="check"></span>
                      </span>
                    </label>
                  </div>
                  <div className="task-text">
                    <div className="title">Update about page header</div>
                    <div className="task-details hide">
                      <div className="description font-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      </div>
                      <div className="flex-row">
                        <div className="priority bg-light font-sm">Default</div>
                        <div className="due-date font-sm">
                          Due date
                          <span className="date"> 20 January 2022 </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="task-menu">
                  <i className="fas fa-chevron-down icon chevron"></i>
                  <i className="fas fa-ellipsis-v icon more"></i>
                  <div className="more-menu hide">
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

              <div className="task priority-high-border" data-index="1">
                <div className="task-content">
                  <input type="checkbox" id="task-2" />
                  <div className="checkbox-wrapper">
                    <label for="task-2">
                      <span className="checkbox">
                        <span className="check"></span>
                      </span>
                    </label>
                  </div>
                  <div className="task-text">
                    <div className="title">About page wording</div>
                    <div className="task-details hide">
                      <div className="description font-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      </div>
                      <div className="flex-row">
                        <div className="priority bg-danger font-sm">High</div>
                        <div className="due-date font-sm">
                          Due date
                          <span className="date"> 20 January 2022 </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="task-menu">
                    <i className="fas fa-chevron-down icon chevron"></i>
                    <i className="fas fa-ellipsis-v icon more"></i>
                    <div className="more-menu hide">
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
              </div>

              <div className="task priority-medium-border" data-index="2">
                <div className="task-content">
                  <input type="checkbox" id="task-3" />
                  <div className="checkbox-wrapper">
                    <label for="task-3">
                      <span className="checkbox">
                        <span className="check"></span>
                      </span>
                    </label>
                  </div>
                  <div className="task-text">
                    <div className="title">New landing page layout</div>
                    <div className="task-details hide">
                      <div className="description font-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      </div>
                      <div className="flex-row">
                        <div className="priority bg-medium font-sm">Medium</div>
                        <div className="due-date font-sm">
                          Due date
                          <span className="date"> 20 January 2022 </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="task-menu">
                    <i className="fas fa-chevron-down icon"></i>
                    <i className="fas fa-ellipsis-v icon more"></i>
                    <div className="more-menu hide">
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
              </div>

              <div className="task priority-low-border" data-index="3">
                <div className="task-content">
                  <input type="checkbox" id="task-4" />
                  <div className="checkbox-wrapper">
                    <label for="task-4">
                      <span className="checkbox">
                        <span className="check"></span>
                      </span>
                    </label>
                  </div>
                  <div className="task-text">
                    <div className="title">Update global iconset</div>
                    <div className="task-details hide">
                      <div className="description font-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      </div>
                      <div className="flex-row">
                        <div className="priority bg-low font-sm">Low</div>
                        <div className="due-date font-sm">
                          Due date
                          <span className="date"> 20 January 2022 </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="task-menu">
                    <i className="fas fa-chevron-down icon"></i>
                    <i className="fas fa-ellipsis-v icon more"></i>
                    <div className="more-menu hide">
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
              </div>

              <div className="task" data-index="4">
                <div className="task-content">
                  <input type="checkbox" id="task-5" />
                  <div className="checkbox-wrapper">
                    <label for="task-5">
                      <span className="checkbox">
                        <span className="check"></span>
                      </span>
                    </label>
                  </div>
                  <div className="task-text">
                    <div className="title">New case study thumbnails</div>
                    <div className="task-details hide">
                      <div className="description font-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      </div>
                      <div className="flex-row">
                        <div className="priority bg-light font-sm">Default</div>
                        <div className="due-date font-sm">
                          Due date
                          <span className="date"> 20 January 2022 </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="task-menu">
                    <i className="fas fa-chevron-down icon"></i>
                    <i className="fas fa-ellipsis-v icon more"></i>
                    <div className="more-menu hide">
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
              </div>

              <div className="tasks-title">Done</div>

              <div className="task" data-index="5">
                <div className="task-content">
                  <input type="checkbox" id="task-6" />
                  <div className="checkbox-wrapper">
                    <label for="task-6">
                      <span className="checkbox">
                        <span className="check"></span>
                      </span>
                    </label>
                  </div>
                  <div className="task-text">
                    <div className="title">Update global iconset</div>
                    <div className="task-details hide">
                      <div className="description font-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      </div>
                      <div className="flex-row">
                        <div className="priority bg-light font-sm">Default</div>
                        <div className="due-date font-sm">
                          Due date
                          <span className="date"> 20 January 2022 </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="task-menu">
                    <i className="fas fa-chevron-down icon"></i>
                    <i className="fas fa-ellipsis-v icon more"></i>
                    <div className="more-menu hide">
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
              </div>

              <div className="task" data-index="6">
                <div className="task-content">
                  <input type="checkbox" id="task-7" />
                  <div className="checkbox-wrapper">
                    <label for="task-7">
                      <span className="checkbox">
                        <span className="check"></span>
                      </span>
                    </label>
                  </div>
                  <div className="task-text">
                    <div className="title">New case study thumbnails</div>
                    <div className="task-details hide">
                      <div className="description font-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      </div>
                      <div className="flex-row">
                        <div className="priority bg-light font-sm">Default</div>
                        <div className="due-date font-sm">
                          Due date
                          <span className="date"> 20 January 2022 </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="task-menu">
                    <i className="fas fa-chevron-down icon"></i>
                    <i className="fas fa-ellipsis-v icon more"></i>
                    <div className="more-menu hide">
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
              </div>
            </form>
          </div>
        </div> 
    )
}

export default MainContent