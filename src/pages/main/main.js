import React, { Component } from "react";
import api from "../../services/api";

export default class Main extends Component {
  state = {
    users: [],
    links: []
  };

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = async () => {
    const response = await api.get("/users", {
      auth: { 
         username: 'testvoxus', 
         password: '258webVOXUS' 
      }
   });
    

    this.setState({ users: response.data });


    const { users } = this.state;
    const result = users.map(user => (user.login));
    
    var collection = [];

    for (const a of result) {
      const profiles = await api.get(`/users/${a}` , {
        auth: { 
           username: 'testvoxus', 
           password: '258webVOXUS' 
        }
     });
     collection.push(profiles.data);

    };

    this.setState({ links: collection });


  };

  render() {
    const { links } = this.state;
    return (
      <div className="user-list">
        <input></input>
        <button></button>
          {links.map(link => (
              <div key={link.id} className="user-card">
            <h1> {link.login}</h1>
            <h1> {link.name}</h1>
            <img alt="teste" src={link.avatar_url}/>
            </div>
          ))}
        
      </div>
    );
  }
}
