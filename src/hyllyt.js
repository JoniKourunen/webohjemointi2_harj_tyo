import { Component, useState } from 'react';
import Lisays from './Lisays';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'


class Hyllyt extends Component {

    constructor(props) {
        super();

        this.buttonClicked = this.buttonClicked.bind(this);
        this.poista = this.poista.bind(this);

        this.state = {
            data: null,
            enimi: "",
            eosoite: "",
            kpl: 0

        }

    }


    async buttonClicked() {   //etsi toiminto

        

        this.setState({
            
            data: null,
            id: document.getElementById("id").value,
            nimi: document.getElementById("nimi").value,
            kpl: document.getElementById("kpl").value

        })
    
        
       await this.fetchData();
    }

    async poista(event) {  //poista toiminto

        
       // alert("Poistettu "+ event.target.enimi);
        
         fetch('http://localhost:4000/Tavara/' +  event.target.id, {
            method: 'DELETE',
          })

           this.fetchData();
           

           //alla oleva koodipätkä kopsattu netistä. käsketään odottaa hetken ennen kuin päivitetään sivu
          setTimeout(function() { //Start the timer     
            this.setState({render: true}) //After 1 second, set render to true
        }.bind(this), 500)

         // await this.buttonClicked()
         this.fetchData();
    }
/*     async poista(event) {  //poista toiminto

        
        // alert("Poistettu "+ event.target.enimi);
         
          fetch('http://localhost:4000/Tavara' +  event.target.tavara_id, {
             method: 'PUT',
           })
 
            this.fetchData();
            
 
            //alla oleva koodipätkä kopsattu netistä. käsketään odottaa hetken ennen kuin päivitetään sivu
           setTimeout(function() { //Start the timer     
             this.setState({render: true}) //After 1 second, set render to true
         }.bind(this), 500)
 
          // await this.buttonClicked()
           
     } */
    


    componentDidMount() {

        this.fetchData();

    }

    async fetchData() {

        

        let response = await fetch("http://localhost:4000/Tavara");
        let data = await response.json();

        this.setState({ data: data });
        console.log(data.id);

    }
    async plus(event){
        await fetch('http://localhost:4000/Tavara/' +  event.target.id, {
            method: 'PUT'
            .then(response => {
                this.setState({
                    kpl: this.state.kpl +1
                })
                console.log(this.state.tuote.kpl)
            }
                )
          })
        console.log(this.state.tuote.kpl)
        this.fetchData();
    }
    
    async miinus(event){
        await fetch('http://localhost:4000/Tavara/' +  event.target.id, {
            method: 'PUT'
            .then(response => {
                this.setState({
                    kpl: this.state.kpl -1
                })
                console.log(this.state.tuote.kpl)
            }
                )
          })
        console.log(this.state.tuote.kpl)
        this.fetchData();
    }


        

    render() {

        

        if (this.state.data == null)

            return (
                <div>
                   
{/*                     <form>
                    <Lisays/>
                        <label>

                        Name:&nbsp;
                            <input id="etsinimi" type="texbox" defaultValue={this.state.nimi} />

                            <p>Osoite:&nbsp;

                                <input id="etsiosoite" type="texbox" />

                            </p>
                            
                        </label>
                       
                    </form>

                        <button onClick={this.buttonClicked} id="etsinappi">Etsi</button> */}

                        <p>Loading....</p>

                </div>

            )
            else if (this.state.data.length === 0){

                return(
            <div>
                   
            <form>
                <label>

                Name:&nbsp;
                    <input id="etsinimi" type="texbox" defaultValue={this.state.nimi} />

                    <p>Osoite:&nbsp;

                        <input id="etsiosoite" type="texbox" />

                    </p>
                    
                </label>
               
            </form>

                <Button variant="primary" onClick={this.buttonClicked} id="etsinappi">Etsi</Button>
                <Button variant="primary" onClick={this.buttonClicked} id="etsinappi">Post</Button>
                <p>Annetuilla hakuehdoilla ei löytynyt dataa</p>

        </div>
                )
            }
        else {
            <Lisays/>


           let dataObjektit = this.state.data.map((tuote) =>
         
      
                <tr key={tuote.id}>

                    <td>{tuote.id}</td>
                    <td>{tuote.Nimitys}</td>  
                    <td>{tuote.Sarjanumero}</td> 
                    <td>{tuote.kpl}</td>
                   {/*  <td>{tuote.Hyllynumero}</td>  */}
                   <td>
                        <Button variant='success' onClick={this.plus} id={tuote.id} value={tuote.kpl}> +</Button>
                   </td>
                   <td>
                    <Button variant='danger' onClick={this.miinus} id={tuote.id} value={tuote.kpl}> -</Button>
                    </td>
                    
                     <td>  
                    <label for="Hylly"></label>
                    <select id="hylly" name="hylly">
                    <option value="hylly.hylly_id">1</option>
                    <option value="hylly.hylly_id">2</option>
                    <option value="hylly.hylly_id">3</option>
                    <option value="hylly.hylly_id">4</option>

                
                    </select>
                    
                        </td> 




                        <td>

                    <Button variant='secondary' onClick={this.poista} id={tuote.id}> Poista</Button>
                    </td>
                
                </tr>

            );
                          console.log(dataObjektit) 

            return (

                <div>
                  {/*   <form>
 

                        <label>

                            Name:&nbsp;
                            <input id="etsinimi" type="texbox" defaultValue={this.state.nimi} />

                            <p>Osoite:&nbsp;

                                <input id="etsiosoite" type="texbox" />

                            </p>
                            
    
                        </label>
                    </form>

                    <p><button onClick={this.buttonClicked} id="etsinappi">Etsi</button> </p> */}
                    
                    <Lisays/>
                    <table>
                        <tbody>

                            <tr>
                            <th>Tuote id</th>
                            <th>Tuote nimitys</th>
                            <th>Tuote sarjanumero</th>
                            <th>kpl</th>
                            <th>+</th>
                            <th>-</th>
                            <th>Hyllynumero</th>
                            
                            <th>Poista</th>
                            </tr>
                            {dataObjektit}

                        </tbody>
                    </table>
                    <div>
                    </div>
                </div>

            )

        }
    }
}

export default Hyllyt




