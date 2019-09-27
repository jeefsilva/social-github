import axios from 'axios';

export const api = axios.create({ baseURL: 'https://api.github.com/' });

export const loadProfile = async () => {
    var userLogin = this.state.value;

    try {
      const profiles = await api.get(`/${userLogin}`, {
        auth: {
          username: "testvoxus",
          password: "258webVOXUS"
        }
      });
      this.state.links.unshift(profiles.data);
      console.log(this.state.links);
      localStorage.setItem("list_users", JSON.stringify(this.state.links));
      this.setState({ links: JSON.parse(localStorage.getItem("list_users")) });
    } catch {
      alert("Usuário Inválido");
    }
    //load dos dados da API via input pelo nome de usuário
  };

 export const loadUsers = async () => {
    const response = await api.get("/users", {
      auth: {
        username: "testvoxus",
        password: "258webVOXUS"
      }
    });



    const users = response.data;
    const result = users.map(user => user.login);
    

    var collection = [];

    for (const a of result) {
      const profiles = await api.get(`/users/${a}`, {
        auth: {
          username: "testvoxus",
          password: "258webVOXUS"
        }
      });
      collection.push(profiles.data);
    }
    localStorage.setItem("list_users", JSON.stringify(collection));
    collection = JSON.parse(localStorage.getItem("list_users"))
    return collection
    //load dos dados da API do github
  };
