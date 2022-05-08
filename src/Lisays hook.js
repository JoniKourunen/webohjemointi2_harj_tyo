/* import React, { Component } from 'react'; */
import axios from 'axios';
import fetchData from './Hyllyt';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react';

/* export class Lisays extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
        id:'',
       Nimitys:'',
       Sarjanumero:'',
       Hyllynumero:''
    }
  }
  changeHandler = e => {
      this.setState({ [e.target.name]: e.target.value
    
    })
  } */



  function Tuotteet(props) {
    const [id, setid] = useState([]);
    const [Nimitys, setNimitys] = useState('');
    const [Sarjanumero, setSarjanumero] = useState('');
    const [Hyllynumero, setHyllynumero] = useState('');
   
  

  
    useEffect(() => {

       
            const { id, Nimitys, Sarjanumero, kpl, Hyllynumero } = this.state
            return (
                <div>
                    <form onSubmit={this.submitHandler}>
                        <div>
                            <input 
                            type="text" 
                            name="id" 
                            value={id}
                            onChange={this.changeHandler}  
                          /*   onChange={(e) => setName(e.target.value)} */ 
                            placeholder="id"
                            />
                        </div>
                        <div>
                            <input 
                            type="text" 
                            name="Nimitys" 
                            value={Nimitys} 
                            onChange={this.changeHandler} 
                            placeholder="Nimitys"
                            />
                        </div>
                        <div>
                            <input 
                            type="text" 
                            name="Sarjanumero" 
                            value={Sarjanumero} 
                            onChange={this.changeHandler} 
                            placeholder="Sarjanumero"
                            />
                        </div>                    <div>
                            <input 
                            type="text" 
                            name="kpl" 
                            value={kpl} 
                            onChange={this.changeHandler} 
                            placeholder="kpl"
                            />
                        </div>
                        <div>
                            <input 
                            type="text" 
                            name="Hyllynumero" 
                            value={Hyllynumero} 
                            onChange={this.changeHandler} 
                            placeholder="Hyllynumero"
                            />
                        </div>
    
                        <Button variant="primary" type="submit">Tallenna</Button>
    
    
                       
                    </form>
                </div>
            )
      }
    
    
  
      fetchData();
  
    }, [url]);




submitHandler = e => {
      e.preventDefault()
      console.log(this.state)
      axios.post('http://localhost:4000/Tavara', this.state)
      .then(response => {
          console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
        .then(window.location.reload(false))
    }
  



    
}
// "id": 1,
// "Nimitys": "Laatikko",
// "Sarjanumero":1234,
// "Hyllynumero":1

export default Lisays