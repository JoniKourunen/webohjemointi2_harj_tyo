import './App.css';
import Search from './Search';

import Home from './Home';
import { Link, Outlet } from 'react-router-dom';

function App() {


    
  return (
    <div className="App">
      <header className="App-header">

        <p>
          Tehtävät 8-13
    
{/*    fdgdfgdg */}
       {/*    <Search/>  */}
          <nav>

            {/* <Link to="/">Asiakkaat</Link> */}

            [<Link to="/Search">Asiakkaat</Link>]

            [<Link to="/Koti">Koti</Link>]

            [<Link to="Yhteystiedot">Yhteystiedot</Link>]
          </nav>
          <Outlet/>

        
          
            </p>
  

      </header>

      
    </div>
  );
}

export default App;
