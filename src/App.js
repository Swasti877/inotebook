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
import Login from './component/Login';
import Signup from './component/Signup';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message, type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000)
  }

  return (
    <>
      <NoteState>
        <Router>
          <NavBar />
          <Alert alert={alert} />
          <div className='container'>
            <Routes>
              <Route exact path="/about" element={<About />} />
              <Route exact path='/login' element={<Login showAlert={showAlert}/>}  />
              <Route exact path='/signup' element={<Signup showAlert={showAlert}/>}  />
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
