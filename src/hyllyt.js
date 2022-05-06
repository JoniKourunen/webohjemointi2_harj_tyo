import { Component } from 'react';

class Hyllyt extends Component {

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
            enimi: document.getElementById("id").value,
            eosoite: document.getElementById("nimi").value

        })
    
        
       await this.fetchData();
    }

    async poista(event) {  //poista toiminto

        
       // alert("Poistettu "+ event.target.enimi);
        
         fetch('http://localhost:4000/Hylly' +  event.target.id, {
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

        

        let response = await fetch("http://localhost:4000/Hylly");
        let data = await response.json();

 

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
                <button onClick={this.buttonClicked} id="etsinappi">Post</button>
                <p>Annetuilla hakuehdoilla ei löytynyt dataa</p>

        </div>


                )
            }
        else {

           let dataObjektit = this.state.data.map((hylly) =>

                <tr key={hylly.id}>

                    <td>{hylly.id}</td>
                    <td>{hylly.Nimi}</td>  
              
                                        
                    <button onClick={this.poista} id={hylly.id}> Poista</button>
                   

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

export default Hyllyt




