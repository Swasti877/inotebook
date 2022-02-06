import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './component/Home';
import About from './component/About';
import NavBar from './component/NavBar';
import NoteState from './context/notes/NoteState';
import Alert from './component/Alert';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <NavBar />
          <Alert message="This is a Alert."/>
          <div className='container'>
            <Routes>
              <Route exact path="/about" element={<About />} />
              <Route exact path="/" element={<Home />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
