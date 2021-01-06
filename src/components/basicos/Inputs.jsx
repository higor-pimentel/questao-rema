import "./Inputs.css";
import {
  Button,
  FormControl,
  MenuItem,
  TextField,
  withStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";
import { Component } from "react";

const styles = (theme) => ({
  root: {},
  formControl: {
    margin: "0.5em 0",
  },
  button: {
    padding: "0 0.5em",
  },
});

const geometrias = [
  {
    value: 0,
    label: "Circular",
  },
  {
    value: 3,
    label: "Triangular",
  },
  {
    value: 4,
    label: "Quadrada",
  },
];

class Entradas extends Component {
  constructor(props) {
    super(props);
    this.state = { geometria: 0 };
  }

  handleChange = (event) => {
    let change;

    if (event.target.name === "geometria") {
      change = { geometria: event.target.value };
    } else {
      change = {
        [event.target.name]: event.target.value ? event.target.value : null,
      };
    }
    this.setState({
      ...this.state,
      ...change,
    });
  };

  resolverQuestao = (event) => {
    event.preventDefault();
    console.log(this.state);
  };
  render() {
    const { classes } = this.props;
    const { geometria } = this.state;
    return (
      <form className="textField" onSubmit={this.resolverQuestao}>
        <FormControl className={classes.formControl}>
          <TextField
            name="tauMax"
            label="Tensão máxima"
            variant="outlined"
            required
            fullWidth
            onChange={this.handleChange}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            name="comprimentoAB"
            label="Comprimento barra AB"
            variant="outlined"
            required
            fullWidth
            onChange={this.handleChange}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            name="comprimentoAC"
            label="Comprimento barra AC"
            variant="outlined"
            required
            fullWidth
            onChange={this.handleChange}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            name="comprimentoCD"
            label="Comprimento barra CD"
            variant="outlined"
            required
            fullWidth
            onChange={this.handleChange}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            name="propriedadeG"
            label="Propriedade do material da viga"
            variant="outlined"
            required
            fullWidth
            onChange={this.handleChange}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            name="geometria"
            select
            label="Geometria da seção transversal"
            variant="outlined"
            value={geometria}
            required
            fullWidth
            onChange={this.handleChange}
          >
            {geometrias.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            type="input"
            name="tensaoAdmissivel"
            label="Valores admissíveis de tensão de cisalhamento"
            variant="outlined"
            required
            fullWidth
            onChange={this.handleChange}
          />
        </FormControl>
        <FormControl className={(classes.formControl, classes.button)}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Resolver
          </Button>
        </FormControl>
      </form>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Entradas);
