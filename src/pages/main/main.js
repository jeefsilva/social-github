import React, { Component } from 'react';
import api from '../../services/api';

export default class Main extends Component {
    state = {
        users: []
    };
    
    componentDidMount() {
        this.loadUsers();
    };

    loadUsers = async () => {
        const response = await api.get("/users");

        this.setState({ users: response.data });
        console.log(response.data);
    };
    
    render() {
        return (
            <div className="user-list">
                {this.state.users.map(user => (
                    <h2 key={user.id}> {user.login}</h2>
                ))}
            </div>
        )
    };
}