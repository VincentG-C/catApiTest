import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default class Home extends React.Component {
  constructor(props){
    super(props);
        this.handleChange = this.handleChange.bind(this);
    this.state = {breeds: null, search: ""};
    this.fillBreeds();
  }
  
  fillBreeds() {
  var xmlhttp = new XMLHttpRequest();
  var component = this;
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    
      try {
        var data = JSON.parse(xmlhttp.responseText);
        
        component.setState({breeds : data});
        console.log(this.state.breeds);
      } catch (err) {
        return;
      }
    }
  };

  xmlhttp.open("GET", "https://api.thecatapi.com/v1/breeds", true);
  xmlhttp.setRequestHeader("x-api-key", "DEMO-API-KEY")
  xmlhttp.send();
}

handleChange(event) {   
 this.setState({search: event.target.value});
}
  
  render() {
  let listItems = null;
  if(this.state.breeds){
  listItems = this.state.breeds.map((breed) => 
   <div>
   {breed.name.toLowerCase().indexOf(this.state.search.toLowerCase()) != -1 && <Link to={"detail/"+breed.name}>{breed.name}</Link>}
  </div>);
  }
    return <h1>
    <input type="text" value={this.state.search} onChange={this.handleChange} />{this.state.search}
    {listItems}
    </h1>;
  }
}