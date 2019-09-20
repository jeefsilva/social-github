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
    

    for (const a of result) {
      const profiles = await api.get(`/users/${a}` , {
        auth: { 
           username: 'testvoxus', 
           password: '258webVOXUS' 
        }
     });

      this.setState({ links: profiles.data });

      const { links } = this.state
      console.log(links);
    };



  };

  render() {
    const { users } = this.state;
    return (
      <div className="user-list">
        <input></input>
        <button></button>
          {users.map(user => (
              <div key={user.id} className="user-card">
            <h1> {user.login}</h1>
            </div>
          ))}
        
      </div>
    );
  }
}
