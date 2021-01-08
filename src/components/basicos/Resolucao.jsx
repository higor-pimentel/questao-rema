import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import React from 'react';
import { Component } from 'react';

const styles = (theme) => ({
  root: {},
  secoes: {
    margin: '0.5em 1em',
  },
  formControl: {
    margin: '0.5em',
  },
  radio: {
    margin: '0 1em',
  },
});

class Resolucao extends Component {
  constructor(props) {
    super(props);
    this.state = { raio: this.raio(), secaoAngle: 'AB', secaoCisalhante: 'AB' };
  }

  anguloDeTorcao = (raio, comprimentoSecao) => {
    const { torque, propriedadeG } = this.props.entradas;
    return (
      ((torque * comprimentoSecao) / (Math.PI / 2)) *
      raio *
      propriedadeG *
      Math.pow(10, 9)
    );
  };

  selecionaSecao(secao) {
    const { comprimentoAB, comprimentoAC, comprimentoCD } = this.props.entradas;

    switch (secao) {
      case 'AB':
        return comprimentoAB;
      case 'AC':
        return comprimentoAC;
      case 'CD':
        return comprimentoCD;
      default:
        break;
    }
  }

  raio = () => {
    const { tauMax, torque } = this.props.entradas;
    let aux = torque / ((tauMax * Math.PI) / 2);
    return parseFloat(Math.cbrt(aux).toFixed(2));
  };

  tensaoCisalhante = () => {
    return 0;
  };

  tensoesLimites = (tensaoCalculada) => {
    const { tauMax } = this.props.entradas;
    if (tensaoCalculada <= tauMax) return 'Dentro do Limite';
    else if (tensaoCalculada <= tauMax) return 'Fora do limite';
    else return 'Não foi possível avaliar';
  };

  handleChange = (event) => {
    let change;

    if (event.target.name === 'secoesAngulo') {
      change = { secaoAngle: event.target.value };
    }
    if (event.target.name === 'secoesCisalhante') {
      change = { secaoCisalhante: event.target.value };
    }

    this.setState({ ...this.state, ...change });
  };

  render() {
    const { classes, entradas } = this.props;
    const { raio, secaoAngle, secaoCisalhante } = this.state;

    return (
      <>
        <h2>Resolução</h2>
        <form>
          <div className={classes.secoes}>
            <Typography>Reações no Apoio</Typography>
            <FormControl className={classes.formControl}>
              <TextField
                name='reacoesApoio1'
                label='Esforco Cortante'
                variant='outlined'
                value={0}
                fullWidth
                inputProps={{ type: 'number', readOnly: true, step: 0.01 }}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                name='reacoesApoio2'
                label='Momento Fletor'
                variant='outlined'
                value={entradas.torque}
                fullWidth
                inputProps={{ type: 'number', readOnly: true, step: 0.01 }}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                name='reacoesApoio3'
                label='Momento no Apoio'
                variant='outlined'
                value={-entradas.torque}
                fullWidth
                inputProps={{ type: 'number', readOnly: true, step: 0.01 }}
              />
            </FormControl>
          </div>
          <hr />
          <div className={classes.secoes}>
            <Typography>Ângulo de torção na seção definida</Typography>
            <FormControl className={classes.formControl}>
              <TextField
                name='anguloTorcao'
                label={`Ângulo de torção`}
                variant='outlined'
                value={this.anguloDeTorcao(
                  raio,
                  this.selecionaSecao(secaoAngle)
                )}
                fullWidth
                inputProps={{ type: 'number', readOnly: true, step: 0.01 }}
              />
            </FormControl>
            <FormControl component='fieldset' className={classes.formControl}>
              <FormLabel component='legend' className={classes.label}>
                Seções
              </FormLabel>
              <RadioGroup
                aria-label='sectionsAngle'
                name='secoesAngulo'
                row
                value={secaoAngle}
                onChange={this.handleChange}
              >
                <FormControlLabel
                  value='AB'
                  control={<Radio />}
                  label='Seção AB'
                  labelPlacement='top'
                />
                <FormControlLabel
                  value='AC'
                  control={<Radio />}
                  label='Seção AC'
                  labelPlacement='top'
                />
                <FormControlLabel
                  value='CD'
                  control={<Radio />}
                  label='Seção CD'
                  labelPlacement='top'
                />
              </RadioGroup>
            </FormControl>
          </div>
          <hr />
          <div className={classes.secoes}>
            <Typography>
              Valor da tensão cisalhante na seção e na posição definidas
            </Typography>
            <FormControl className={classes.formControl}>
              <TextField
                name='tensaoCisalhante'
                label='Tensão Cisalhante'
                variant='outlined'
                value={this.tensaoCisalhante()}
                fullWidth
                inputProps={{ type: 'number', readOnly: true, step: 0.01 }}
              />
            </FormControl>
            <FormControl component='fieldset' className={classes.formControl}>
              <FormLabel component='legend' className={classes.label}>
                Seções
              </FormLabel>
              <RadioGroup
                aria-label='sectionsCisalhante'
                name='secoesCisalhante'
                row
                value={secaoCisalhante}
                onChange={this.handleChange}
              >
                <FormControlLabel
                  value='AB'
                  control={<Radio />}
                  label='Seção AB'
                  labelPlacement='top'
                />
                <FormControlLabel
                  value='AC'
                  control={<Radio />}
                  label='Seção AC'
                  labelPlacement='top'
                />
                <FormControlLabel
                  value='CD'
                  control={<Radio />}
                  label='Seção CD'
                  labelPlacement='top'
                />
              </RadioGroup>
            </FormControl>
          </div>
          <hr />
          <div className={classes.secoes}>
            <Typography>Avaliação de limites de tensão </Typography>
            <FormControl className={classes.formControl}>
              <TextField
                name='tensaoLimite'
                label='Tensão limite foi Ultrapassada?'
                variant='outlined'
                value={this.tensoesLimites()}
                fullWidth
                inputProps={{ type: 'text' }}
              />
            </FormControl>
          </div>
        </form>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Resolucao);
