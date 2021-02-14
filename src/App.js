import { useState } from 'react';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import MineField from './component/MineField';
import Setting from './component/Setting';


function App() {
  const [diff, setDiff] = useState([10,10,10])
  const [now, setNow] = useState([])
  function mineFieldFunc(func, arg = {}) {
    switch (func) {
      case 'change':
        
        break;
    
      default:
        break;
    }
  }
  return (
    <div className="mine-sweeper">
      <Router >
        <header className="header">
        </header>
        <div className="container">
          <Route exact path="/mine-sweeper/">
            <Setting diff={diff} setDiff={setDiff}>
              <Link to={{
                pathname: "/mine-sweeper/game",
                state: {diff: diff, cursor: "open", func: mineFieldFunc()}
              }}>게임시작</Link>
            </Setting>
          </Route>
          <Route path="/mine-sweeper/game" component={MineField} />
        </div>
      </Router>
    </div>
  );
}

export default App;
