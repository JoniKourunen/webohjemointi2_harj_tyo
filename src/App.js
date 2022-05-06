import './App.css';
import Search from './Search';
import Hyllyt from './Hyllyt';
import Lisays from './Lisays';

import Home from './Home';
import { Link, Outlet } from 'react-router-dom';

function App() {


    
  return (
    <div className="App">
      <header className="App-header">

        <p>
          WEB2 harjoitustyö
          <lisäys/>
    

       {/*    <Search/>  */}
          <nav>

          <lisäys/>
            [<Link to="/Hyllyt">Hyllyt</Link>]

            [<Link to="/Koti">Koti</Link>]

            [<Link to="Yhteystiedot">Yhteystiedot</Link>]
          </nav>
          <Outlet/>

          <lisäys/>

        
          
            </p>
  
            
      </header>

      
    </div>
  );
}

export default App;
