function SideMenu() {
  return (
    <div className="menu-left">
      <div className="brand menu-padding">.todoism</div>

      <div className="menu-controls menu-padding">
        <button className="btn btn-outline-primary new-project-btn">
          <i className="fas fa-plus"></i> New list
        </button>
      </div>

      <div className="menu flex-1">
        <ul className="flex-1 menu-items">
          <a href="#" className="menu-item active">
            <li className="menu-padding">
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
            <li className="menu-padding">
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
            <li className="menu-padding">
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
            <li className="menu-padding">
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
            <li className="menu-padding">
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
            <li className="menu-padding">
              <i className="fa fa-cog"></i> Settings
            </li>
          </a>

          <a href="#" className="menu-item">
            <li className="menu-padding">
              <i className="fa fa-sign-out-alt"></i> Log out
            </li>
          </a>
        </ul>
      </div>
      <footer className="menu-padding menu-footer">
        &copy; Created by 
        <a href="https://github.com/philbjern" className="author-link">
          philbjern
        </a> 
        2022
      </footer>
    </div>
  );
}

export default SideMenu;
