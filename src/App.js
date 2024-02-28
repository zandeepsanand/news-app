import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Header from './components/Header';
import Blog from './components/Blog';


function App() {
  return (
    <div className="App">
     
      <Header/>
      <Blog/>
    </div>
  );
}

export default App;
