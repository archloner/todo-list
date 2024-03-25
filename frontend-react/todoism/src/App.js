import './App.css';
import SideMenu from './components/SideMenu';
import TopBar from './components/TopBar';
import MainContent from './components/MainContent';
import NewTaskBtn from './components/NewTaskBtn';
import Modals from './components/Modals';

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
    </div>
  );
}

export default App;
