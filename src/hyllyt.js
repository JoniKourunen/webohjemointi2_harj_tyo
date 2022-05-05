import { Component } from 'react';

class Search extends Component {

    constructor(props) {
        super();

        this.buttonClicked = this.buttonClicked.bind(this);
        this.poista = this.poista.bind(this);

        this.state = {
            data: null,
            enimi: "",
            eosoite: ""

        }

    }

    async buttonClicked() {   //etsi toiminto

        

        this.setState({
            
            data: null,
            enimi: document.getElementById("etsinimi").value,
            eosoite: document.getElementById("etsiosoite").value


        })
    
        
       await this.fetchData();
    }

    async poista(event) {  //poista toiminto

        
       // alert("Poistettu "+ event.target.enimi);
        
         fetch('http://localhost:4000/asiakkaat/' +  event.target.id, {
            method: 'DELETE',
          })

           this.fetchData();
           

           //alla oleva koodipätkä kopsattu netistä. käsketään odottaa hetken ennen kuin päivitetään sivu
          setTimeout(function() { //Start the timer     
            this.setState({render: true}) //After 1 second, set render to true
        }.bind(this), 500)

         // await this.buttonClicked()
          
    }
    


    componentDidMount() {

        this.fetchData();

    }

    async fetchData() {

        

        let response = await fetch("http://localhost:4000/asiakkaat?nimi_like=" + document.getElementById("etsinimi").value + "&osoite_like=" + document.getElementById("etsiosoite").value);
        let data = await response.json();

       // console.log("data: " + data);
       // console.log("data :" + JSON.stringify(data));
       // console.log(data);

        this.setState({ data: data });

    }

    render() {

        

        if (this.state.data == null)

            return (
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

                        <button onClick={this.buttonClicked} id="etsinappi">Etsi</button>

                        <p>Loading....</p>

                </div>

            )

            else if (this.state.data.length == 0){

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

                <button onClick={this.buttonClicked} id="etsinappi">Etsi</button>

                <p>Annetuilla hakuehdoilla ei löytynyt dataa</p>

        </div>


                )
            }

        else {

            let dataObjektit = this.state.data.map((tyyppi) =>

                <tr key={tyyppi.id}>

                    <td>  {tyyppi.nimi}    </td>

                    <td>{tyyppi.osoite}</td> 
                    <td> {tyyppi.Postinumero}</td>
                    <td> {tyyppi.Postitoimipaikka}</td>
                    <td> {tyyppi.puhelinnumero}</td>
                    <button onClick={this.poista} id={tyyppi.id}> Poista</button>
                   

                </tr>

            );
                          console.log(dataObjektit)

            return (

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

                    <p><button onClick={this.buttonClicked} id="etsinappi">Etsi</button> </p>

                    <table>
                        <tbody>


                            <tr>{dataObjektit}</tr>

                        </tbody>
                    </table>
                </div>

            )

        }
    }
}

export default Search




