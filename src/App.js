import './App.css';
import Search from './Search';
import Hyllyt from './Hyllyt';
import Lisays from './Lisays';
import Home from './Home';
import { Link, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'


  //npx json-server db.json --watch --port 4000


function App() {


    
  return (
    <div className="App">
      <header className="App-header">

        <p>
          WEB2 harjoitustyö
        
    

       {/*    <Search/>  */}
          <nav>

         {/*  <Lisays/> */}
          
          
            [<Link to="/Hyllyt">Tuotteet</Link>]

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
