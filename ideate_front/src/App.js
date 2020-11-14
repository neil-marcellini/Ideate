import './App.css';
import 'fontsource-roboto';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import SignUp from './components/SignUp';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route path="/signup" component={SignUp} />
      </div>
    </Router>
    
  );
}

export default App;
