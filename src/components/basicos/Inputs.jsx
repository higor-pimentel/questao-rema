import './Inputs.css';
import {
  Button,
  FormControl,
  MenuItem,
  TextField,
  withStyles,
} from '@material-ui/core';
import React from 'react';
import { Component } from 'react';

const styles = (theme) => ({
  root: {},
  formControl: {
    margin: '0.5em 0',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'inline',
    padding: '0 0.5em',
  },
  button: {
    margin: '0 0.3em',
    flexGrow: 4,
  },
});

const geometrias = [
  {
    value: 0,
    label: 'Circular',
  },
  // {
  //   value: 3,
  //   label: 'Triangular',
  // },
  // {
  //   value: 2,
  //   label: 'Quadrada',
  // },
];

class Entradas extends Component {
  constructor(props) {
    super(props);
    this.state = { geometria: 1 };
  }

  handleChange = (event) => {
    let change;

    if (event.target.name === 'geometria') {
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

  handleSubmit = (event) => {
    event.preventDefault();
    const { isToShow } = this.props;

    isToShow(true, { ...this.state });
  };

  handleClick = (event) => {
    const { isToShow } = this.props;

    isToShow(false);
  };

  render() {
    const { classes } = this.props;
    const { geometria } = this.state;
    return (
      <>
        <form className='textField' onSubmit={this.handleSubmit}>
          <FormControl className={classes.formControl}>
            <TextField
              name='torque'
              label='Torque concentrados'
              variant='outlined'
              required
              fullWidth
              inputProps={{ type: 'number', step: 0.01 }}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              name='comprimentoAB'
              label='Comprimento barra AB'
              variant='outlined'
              required
              fullWidth
              inputProps={{ type: 'number', step: 0.01 }}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              name='comprimentoAC'
              label='Comprimento barra AC'
              variant='outlined'
              required
              fullWidth
              inputProps={{ type: 'number', step: 0.01 }}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              name='comprimentoCD'
              label='Comprimento barra CD'
              variant='outlined'
              required
              fullWidth
              inputProps={{ type: 'number', step: 0.01 }}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              name='propriedadeG'
              label='Propriedade do material da viga (GPa)'
              variant='outlined'
              required
              fullWidth
              inputProps={{ type: 'number', step: 0.01 }}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              name='geometria'
              select
              label='Geometria da seção transversal'
              variant='outlined'
              value={geometria}
              required
              fullWidth
              onChange={this.handleChange}
            >
              <MenuItem key={1} value={1}></MenuItem>
              {geometrias.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              name='tauMax'
              label='Valores admissíveis de tensão de cisalhamento'
              variant='outlined'
              required
              fullWidth
              inputProps={{ type: 'number', step: 0.01 }}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <div className={classes.buttons}>
              <Button
                id='botaoLimpar'
                type='reset'
                variant='contained'
                color='primary'
                className={classes.button}
                onClick={this.handleClick}
              >
                Limpar
              </Button>
              <Button
                id='botaoResolver'
                type='submit'
                variant='contained'
                color='primary'
                className={classes.button}
              >
                Resolver
              </Button>
            </div>
          </FormControl>
        </form>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Entradas);
