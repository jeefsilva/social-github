import React, { Component } from "react";
import { api } from "../../services/api";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import styles from './main.module.scss';
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
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.loadProfile();
  };

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
    //load dos dados da API via input pelo nome de usuário
  };

  componentDidMount() {
    var local = JSON.parse(localStorage.getItem("list_users"));
    if (local === null) {
      this.loadUsers();
      console.log ("Está usando a API")
    } else {
      this.loadLocalUsers();
      console.log ("Está usando o Local Storage")
    } //loop para ver se existe algum dado na localStorage
  };

  loadLocalUsers = async () => {
    this.setState({ links: JSON.parse(localStorage.getItem("list_users")) });
    //carrega os usuários do localStorage
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
    //load dos dados da API do github
  };



  render() {
    const { links } = this.state;
    return (
      <Grid container className={styles.root} justify="center">
        <Grid container className={styles.header} justify="center">
          <header id="main-header" className={styles.header}>
            <div className={styles.flexCenter}>
              <img className={styles.logo} alt="logo" src="../../assets/logo.svg" />
              <div className={`${styles.addSection} ${styles.flexCenter}`}>
                <TextField
                  className={styles.userInput}
                  label="Add a user"
                  value={this.state.value}
                  onChange={this.handleChange}
                ></TextField>
                <Button
                  variant="contained"
                  className={styles.addButton}
                  onClick={this.handleSubmit}
                >
                  Add
                </Button>
              </div>
            </div>
            <hr className={styles.line}></hr>
          </header>
        </Grid>
        <Grid container className={`${styles.app} ${styles.flexWrap}`}>
          {links.map(link => (
            <Paper className={styles.card} key={link.id}>
              <div className={styles.flexSpaceBetween}>
                <Typography variant="h6" className={styles.nickname}>
                  {" "}
                  {link.login}
                </Typography>
                <a
                  rel="noopener noreferrer"
                  href={link.html_url}
                  target="_blank"
                >
                  <Icon className={styles.icon}>account_circle</Icon>
                </a>
              </div>

              <img className={styles.avatar} alt="teste" src={link.avatar_url} />

              <Typography className={styles.disabled} variant="subtitle1">
                Name
              </Typography>
              <Typography variant="h5" className={`${styles.name} ${styles.textHeight}`}>
                {" "}
                {link.name}
              </Typography>

              <Typography className={styles.disabled} variant="subtitle2">
                Blog
              </Typography>
              <a rel="noopener noreferrer" href={link.blog} target="_blank">
                <Typography variant="body1" className={`${styles.blog} ${styles.textHeight}`}>
                  {" "}
                  {link.blog}{" "}
                </Typography>
              </a>
              <Typography className={styles.disabled} variant="subtitle2">
                Location
              </Typography>
              <Typography variant="body1" className={`${styles.location} ${styles.textHeight}`}>
                {" "}
                {link.location}{" "}
              </Typography>
              <div className={styles.flex}>
                <div className={`${styles.flexColumn} ${styles.marginRepos}`}>
                  <Typography className={styles.disabled} variant="subtitle2">
                    Public Repos
                  </Typography>
                  <Typography variant="body1" className={`${styles.repos} ${styles.textHeight}`}>
                    {" "}
                    {link.public_repos}{" "}
                  </Typography>
                </div>
                <div className={styles.flexColumn}>
                  <Typography className={styles.disabled} variant="subtitle2">
                    Followers
                  </Typography>
                  <Typography variant="body1" className={`${styles.followers} ${styles.textHeight}`}>
                    {" "}
                    {link.followers}{" "}
                  </Typography>
                </div>
              </div>

              <hr className={styles.line}></hr>
              <div className={styles.flexSpaceBetween}>
                <Icon>close</Icon>
                <Icon>favorite</Icon>
              </div>
            </Paper>
          ))}
        </Grid>
        <Grid container className={styles.grid} justify="flex-end">
          <Button className={styles.buttonReset}>Reset All</Button>
        </Grid>
      </Grid>
    );
  }
}
