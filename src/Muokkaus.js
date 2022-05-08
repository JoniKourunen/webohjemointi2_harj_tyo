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

    async fetchData() {

        let response = await fetch("http://localhost:4000/Tavara");
        let data = await response.json();
        this.setState({ data: data });
        console.log(data.id);
    }

    async plus(event){
        console.log(event.target.id)
        console.log(event.target.value)
        event.target.value++
        await axios.put(('http://localhost:4000/Tavara?id_like=' +  event.target.id), {
                value: event.target.value
            })
            this.fetchData();
            console.log(event.target.value)                
    }

    async miinus(event){
        console.log(event.target.id)
        console.log(event.target.value)
        event.target.value-=1
        await axios.put(('http://localhost:4000/Tavara?id_like=' +  event.target.id), {
                value: event.target.value
            })
            this.fetchData();
            console.log(event.target.value)                
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
                </div>
            )
        }
    }
}
export default Muokkaus