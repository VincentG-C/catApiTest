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
        
        component.setState({breed : data[0]});
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
  
  render(){
    return <div>{this.state.breed && 
    <p>Nom: {this.state.breed.name}<br />
    Origine: {this.state.breed.origin}<br />
    Wiki: <a href={this.state.breed.wikipedia_url}>{this.state.breed.name}</a></p>}</div>
  }
}