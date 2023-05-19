
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Menu from './Components/Menu';
import Login from './Components/Vista_Cliente/LogIn';

function App() {
  return (
    <div className="App">
      <Menu/>
      <Router>
        <Routes>
         <Route path={'/Login'} element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  )
}


export default App;
