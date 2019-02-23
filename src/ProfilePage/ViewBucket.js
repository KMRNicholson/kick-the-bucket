//Various react components
import React, { Component } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../global-string';

//Material UI components
import Add from '@material-ui/icons/Add';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import Item from '../Item';
import AddItem from './AddItem';

//Styling
import './Profile.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ECB030',
    },
    secondary: blue,
  },
});

class ViewBucket extends Component{
  constructor(props){
    super(props);
    this.state={
      name:'',
      desc:'',
      items:[],
      ownerId:[],
      addItem:[],
      id:0,
      token:'',
      error:''
    }
  }

  addItem = () => {
    var bucket = this;
    var addItem = []
    addItem.push(<AddItem parentContext={this} key="addItem"/>)
    bucket.setState({
      addItem:addItem
    })
  }

  componentWillMount = () => {
    var modal = this;

    var id = modal.props.parentContext.state.id;
    var token = modal.props.parentContext.props.token;
    var name = modal.props.parentContext.state.name;
    var desc = modal.props.parentContext.state.desc;
    var ownerId = modal.props.parentContext.state.ownerId;
    
    modal.setState({
      id:id,
      ownerId:ownerId,
      token:token,
      name:name,
      desc:desc,
      addItem:[]
    });

    axios.get(apiBaseUrl+"users/"+ownerId+"/buckets/"+id+"/items", {
      headers: {
        Authorization:'Bearer '+token
    }})
    .then(function(response){
      var items = []
      modal.setState({
        items:[]
      })
      var count = 0;
      response.data.forEach((element, index, array) => {
        items.push(<Item 
          name={element.name} 
          isComplete={element.complete}
          desc={element.description}
          link={element.link}
          id={element.id}
          ownerId={ownerId}
          bucketId={element.parentId}
          token={token}
          key={"item"+count+1}
          parentContext={modal} />);
        
        count++;
        
        if(count === array.length) {
          modal.setState({
            items:items
          });
        }
      })
    })
    .catch(function(error){
      console.log(error.response);
    });
  }

  render() {
    return (
      <div>
          {this.state.name}
          {this.state.desc}
          {this.state.items}
          {this.state.addItem}
          <br/>
          <Add onClick={() => this.addItem()} color="primary"/>
      </div>
    );
  }
}

export default ViewBucket;
