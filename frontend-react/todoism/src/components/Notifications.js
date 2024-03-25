function Notifications() {
  return (
    <div className="notification-wrapper">
      <div className="notification bg-medium hide">
        <div className="notification-icon">
          <i className="fa-solid fa-bell"></i>
        </div>
        <div className="notification-body">
          <div className="notification-title">Notification</div>
          <div className="notification-text">Something has happened</div>
        </div>
        <div className="notification-icon">
          <i className="fa-solid fa-xmark close"></i>
        </div>
      </div>
    </div>
  );
}

export default Notifications