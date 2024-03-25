import './App.css';
import SideMenu from './components/SideMenu';
import TopBar from './components/TopBar';
import MainContent from './components/MainContent';
import NewTaskBtn from './components/NewTaskBtn';
import Modals from './components/Modals';
import Notifications from './components/Notifications';

function App() {
  return (
    <div className="wrapper">
      <SideMenu/>
      <div className="content-right">
        <TopBar />
        <MainContent />
        <NewTaskBtn />
      </div>
      <Modals />
      <Notifications />
    </div>
  );
}

export default App;
