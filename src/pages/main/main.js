import React, { Component } from "react";
import api from "../../services/api";

export default class Main extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = async () => {
    const response = await api.get("/users");
    

    this.setState({ users: response.data });
    console.log(response.data);

  };

  render() {
    const { users } = this.state;
    return (
      <div className="user-list">
        
          {users.map(user => (
              <div key={user.id} className="user-card">
            <h1> {user.login}</h1>
            </div>
          ))}
        
      </div>
    );
  }
}
