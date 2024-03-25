function SideMenu() {
  return (
    <div className="menu-left">
      <div className="brand">.todo</div>

      <div className="menu-controls">
        <button className="btn btn-outline-primary new-project-btn">
          <i className="fas fa-plus"></i> New list
        </button>
      </div>

      <div className="menu">
        <ul className="flex-grow menu-items">
          <a href="#" className="menu-item active">
            <li>
              <div className="flex-row">
                <i className="fa fa-home"></i>
                <div className="menu-item-text">
                  Overview
                  <p className="tasks-amount">6 Tasks</p>
                </div>
              </div>
            </li>
          </a>

          <a href="#" className="menu-item">
            <li>
              <div className="flex-row">
                <i className="fas fa-tasks"></i>
                <div className="menu-item-text">
                  Groceries
                  <p className="tasks-amount">10 Tasks</p>
                </div>
              </div>
            </li>
          </a>

          <a href="#" className="menu-item">
            <li>
              <div className="flex-row">
                <i className="fas fa-tasks"></i>
                <div className="menu-item-text">
                  Workout
                  <p className="tasks-amount">4 Tasks</p>
                </div>
              </div>
            </li>
          </a>

          <a href="#" className="menu-item">
            <li>
              <div className="flex-row">
                <i className="fas fa-tasks"></i>
                <div className="menu-item-text">
                  Reading
                  <p className="tasks-amount">5 Tasks</p>
                </div>
              </div>
            </li>
          </a>

          <div className="line"></div>

          <a href="#" className="menu-item">
            <li>
              <div className="flex-row">
                <i className="far fa-calendar-check"></i>
                <div className="menu-item-text">
                  Done
                  <p className="tasks-amount">15 Tasks</p>
                </div>
              </div>
            </li>
          </a>
        </ul>
        <ul className="push-bottom">
          <a href="#" className="menu-item">
            <li>
              <i className="fa fa-cog"></i> Logs
            </li>
          </a>

          <a href="#" className="menu-item">
            <li>
              <i className="fa fa-sign-out-alt"></i> Log out
            </li>
          </a>
        </ul>
      </div>
      <footer>
        Created by 
        <a href="https://github.com/archloner" className="author-link">
          archloner
        </a> 
        2022
      </footer>
    </div>
  );
}

export default SideMenu;
