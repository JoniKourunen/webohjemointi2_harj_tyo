import React, { Component } from 'react'
import axios from 'axios'
import fetchData from './Hyllyt'

export class Lisays extends Component {
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
  }





  submitHandler = e => {
      e.preventDefault()
      console.log(this.state)
      axios
      .post('http://localhost:4000/Tavara', this.state)
      .then(response => {
          console.log(response)
        })
        .catch(error => {
            console.log(error)
        })

        

  }



    render() {
        const { id, Nimitys, Sarjanumero, Hyllynumero } = this.state
        
        
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

                    <button type="submit">Tallenna</button>


                   
                </form>
            </div>
        )
  }
}
// "id": 1,
// "Nimitys": "Laatikko",
// "Sarjanumero":1234,
// "Hyllynumero":1

export default Lisays