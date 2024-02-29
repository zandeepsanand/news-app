
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Header from './components/Header';
import Blog from './components/Blog';
import Article from './components/Article';


function App() {
  return (
    <div className="App">
     
      <Header/>
  
      <Article/>
    </div>
  );
}

export default App;
