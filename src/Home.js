import { Component } from "react";

class Home extends Component{

    constructor(props){
        super();

        //metodien bindaus
        this.onAgeChanged = this.onAgeChanged.bind(this);
        this.buttonClicked = this.buttonClicked.bind(this);

        this.state = {
            age:null,
            address: "Koti",
            vari : "blue"
        }
//tämä on testi
    }

    onAgeChanged(event){
        this.setState({
            age : event.target.value
        })
    }

    buttonClicked(){
        alert("KLIKATTU");
        console.log("tätä klikattiin");
        this.setState({
            vari: "red"
        })
    }


    render(){
        // tilan perusteella voidaan muuttaa palautusta
        var ika = this.state.age;
        if (ika > 100)
            ika ="LIIKAA"
        return(
            <div>
                <p>Osoite on {this.state.address}</p>
                <form>
                    <input type="text" name="age" onChange={this.onAgeChanged}/>
                </form>
                <p>Ikä: {ika}</p>
                <button style={{color:this.state.vari}} onClick={this.buttonClicked}>Paina tätä</button>
                <OldAddress address={this.props.address} />
            </div>
        )
    }

}


// Tänne tuleva ominaisuus on lähtöisn App.js:ltä
function OldAddress(props){
    return (<p>{props.address}</p>)
}

export default Home;