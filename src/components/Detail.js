import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

export default class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {breed: null};
    this.addFav = this.addFav.bind(this);
  }
  
   componentDidMount(){
     this.fillBreed();
   } 
  
    fillBreed() {
  var xmlhttp = new XMLHttpRequest();
  var component = this;
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    
      try {
        var data = JSON.parse(xmlhttp.responseText);
        
        component.setState({breed : data[0], img: ""});
        component.imageLink();
        console.log(data[0]);
      } catch (err) {
        return;
      }
    }
  };

  xmlhttp.open("GET", "https://api.thecatapi.com/v1/breeds/search?q="+this.props.id, true);
  xmlhttp.setRequestHeader("x-api-key", "DEMO-API-KEY")
  xmlhttp.send();
}

  imageLink(){
    var xmlhttp = new XMLHttpRequest();
   var component = this;
   xmlhttp.onreadystatechange = function() {
   if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
     try {
        var data = JSON.parse(xmlhttp.responseText);
        component.setState({img : data.url});
        console.log(data);
      } catch (err) {
        return;
      }
   }
  };

	  xmlhttp.open("GET", "https://api.thecatapi.com/v1/images/"+this.state.breed.reference_image_id, true);
	  xmlhttp.setRequestHeader("x-api-key", "DEMO-API-KEY")
	  xmlhttp.send();
}

  addFav(name){
  console.log();
  	let current = localStorage.getItem("favs");
  	if(!current){
  		localStorage.setItem("favs", [this.state.breed.name]);
  	}
	console.log(current);
  }
  
  
  render(){
  	let component = this;
    return <div>{this.state.breed && 
    <p>Nom: {this.state.breed.name}<br />
    Origine: {this.state.breed.origin}<br />
    Wiki: <a href={this.state.breed.wikipedia_url}>{this.state.breed.name}</a><br />
    Image: <img width="200" src={this.state.img} /></p>}
    <button onClick={this.addFav}>  Ajouter aux favoris
    </button></div>
  }
}