import React, { Component } from "react";
import api from "../../services/api";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import "./main.scss";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";


export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      links: [],
      profiles: [],
      value: "",
      local: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.loadProfile();
  }

  loadProfile = async () => {
    var userLogin = this.state.value;
    const profiles = await api.get(`/users/${userLogin}`, {
      auth: {
        username: "testvoxus",
        password: "258webVOXUS"
      }
    });
    console.log(profiles.data);
    localStorage.setItem("list_profiles", JSON.stringify(profiles.data));
    this.setState({
      profiles: JSON.parse(localStorage.getItem("list_profiles"))
    });
  };

  componentDidMount() {
    var local = JSON.parse(localStorage.getItem("list_users"));
    if (local === null) {
      this.loadUsers();
      console.log ("Está usando a API")
    } else {
      this.loadLocalUsers();
      console.log ("Está usando o Local Storage")
    }
  };

  loadLocalUsers = async () => {
    this.setState({ links: JSON.parse(localStorage.getItem("list_users")) });
  };

  loadUsers = async () => {
    const response = await api.get("/users", {
      auth: {
        username: "testvoxus",
        password: "258webVOXUS"
      }
    });

    this.setState({ users: response.data });

    const { users } = this.state;
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
    this.setState({ links: JSON.parse(localStorage.getItem("list_users")) });
  };

  render() {
    const { links } = this.state;
    return (
      <Grid container className="root" justify="center">
        <Grid container className="header" justify="center">
          <header id="main-header">
            <div className="flex-center">
              <img className="logo" alt="logo" src="../../assets/logo.svg" />
              <div className="add-section flex-center">
                <TextField
                  className="user-input"
                  label="Add a user"
                  value={this.state.value}
                  onChange={this.handleChange}
                ></TextField>
                <Button
                  variant="contained"
                  className="add-button"
                  onClick={this.handleSubmit}
                >
                  Add
                </Button>
              </div>
            </div>
            <hr className="line"></hr>
          </header>
        </Grid>
        <Grid container className="app flex-wrap">
          {links.map(link => (
            <Paper className="card flex-column" key={link.id}>
              <div className="flex-space-between">
                <Typography variant="h6" className="nickname">
                  {" "}
                  {link.login}
                </Typography>
                <a
                  rel="noopener noreferrer"
                  href={link.html_url}
                  target="_blank"
                >
                  <Icon className="icon">account_circle</Icon>
                </a>
              </div>

              <img className="avatar" alt="teste" src={link.avatar_url} />

              <Typography className="disabled" variant="subtitle1">
                Name
              </Typography>
              <Typography variant="h5" className="name text-height">
                {" "}
                {link.name}
              </Typography>

              <Typography className="disabled" variant="subtitle2">
                Blog
              </Typography>
              <a rel="noopener noreferrer" href={link.blog} target="_blank">
                <Typography variant="body1" className="blog text-height">
                  {" "}
                  {link.blog}{" "}
                </Typography>
              </a>
              <Typography className="disabled" variant="subtitle2">
                Location
              </Typography>
              <Typography variant="body1" className="location text-height">
                {" "}
                {link.location}{" "}
              </Typography>
              <div className="flex">
                <div className="flex-column margin-repos">
                  <Typography className="disabled" variant="subtitle2">
                    Public Repos
                  </Typography>
                  <Typography variant="body1" className="repos text-height">
                    {" "}
                    {link.public_repos}{" "}
                  </Typography>
                </div>
                <div className="flex-column">
                  <Typography className="disabled" variant="subtitle2">
                    Followers
                  </Typography>
                  <Typography variant="body1" className="followers text-height">
                    {" "}
                    {link.followers}{" "}
                  </Typography>
                </div>
              </div>

              <hr className="line disabled"></hr>
              <div className="flex-space-between">
                <Icon>close</Icon>
                <Icon>favorite</Icon>
              </div>
            </Paper>
          ))}
        </Grid>
        <Grid container className="grid" justify="flex-end">
          <Button className="button-reset">Reset All</Button>
        </Grid>
      </Grid>
    );
  }
}
