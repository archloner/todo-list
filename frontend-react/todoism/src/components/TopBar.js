function TopBar() {
    return (
        <div className="top-bar">
          <div className="search-bar-wrapper">
            <i className="fas fa-search search-icon"></i>
            <input type="text" id="search-input" placeholder="Search" />
          </div>
          <div className="push-right account-controls flex-row">
            <div className="notifications-icon">
              <i className="far fa-bell"></i>
            </div>
            <div className="username-container">
              <span id="user-name">Zuzanna Jurczak</span>
              <i className="fas fa-chevron-down chevron"></i>
            </div>
            <div>
              <img
                src="./assets/user-profile-picture.jpg"
                className="user-profile-picture"
                alt="User profile picture"
              />
            </div>
            <div className="icon dark-mode-icon">
              <i className="fas fa-adjust"></i>
            </div>
          </div>
        </div>
    )
}

export default TopBar