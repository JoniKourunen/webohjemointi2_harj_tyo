import { Component, useState } from 'react';
import Lisays from './Lisays';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';


class Muokkaus extends Component {

    constructor(props) {
        super();

        this.buttonClicked = this.buttonClicked.bind(this);
        this.poista = this.poista.bind(this);
        this.plus = this.plus.bind(this);
        this.miinus = this.miinus.bind(this);

        this.state = {
            data: null,
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
        
         axios.delete('http://localhost:4000/Tavara/' +  event.target.id, {
          })
           this.fetchData();
            setTimeout(function() {    
            this.setState({render: true})
        }.bind(this), 500)
         this.fetchData();
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {     //tietojen haku

        let response = await fetch("http://localhost:4000/Tavara");
        let data = await response.json();
        this.setState({ data: data });
    }

    async plus(event){  //määrän lisäys nappi
        console.log(event.target.id)
        console.log(event.target.value)
        await axios.put('http://localhost:4000/Tavara/' +  event.target.id, {
                Nimitys: event.target.name,
                kpl: event.target.value++
            })
            if(event.target.value == 11 || event.target.value >11){
                alert("Enempää ei mahdu hyllylle!")
                event.target.value-=1
                return;
            }
            else{
                this.fetchData(); 
        }    
    }

    async miinus(event){     //määrän vähennys nappi.
        console.log(event.target.id)
        console.log(event.target.value)
        await axios.put('http://localhost:4000/Tavara/' +  event.target.id, {
                Nimitys: event.target.name,
                kpl: event.target.value-=1
            })
            if(event.target.value <1){
                alert("Jos haluat vielä vähemmän tuotteita poista tuote.")
                event.target.value++
                return;
            }
            else{
                this.fetchData(); 
        }
    }

    render() {
        if (this.state.data == null)
            return (
                <div>
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
            let dataObjektit = this.state.data.map((tuote) =>
                <tr key={tuote.id}>
                    <td>{tuote.id}</td>
                    <td>{tuote.Nimitys}</td>  

                    <td>{tuote.kpl}</td>
                {/*  <td>{tuote.Hyllynumero}</td>  */}
                    <td>
                        <Button variant='success' onClick={this.plus} id={tuote.id} value={tuote.kpl} name={tuote.Nimitys}> +</Button>
                    </td>
                    <td>
                        <Button variant='danger' onClick={this.miinus} id={tuote.id} value={tuote.kpl} name={tuote.Nimitys}> -</Button>
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
                    <table>
                        <tbody>
                            <tr>
                                <th>Tuote id</th>
                                <th>nimitys</th>
                                <th>kpl</th>
                                <th>+</th>
                                <th>-</th>
                                <th>Hyllynumero</th>
                                <th>Poista</th>
                            </tr>
                            {dataObjektit}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}
export default Muokkaus