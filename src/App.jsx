import React, { useState } from 'react';

import './App.css';
import Entradas from './components/basicos/Inputs';
import Resolucao from './components/basicos/Resolucao';

export default () => {
  const [isShow, setShow] = useState(false);
  const [entradas, setEntradas] = useState({});

  const isToShow = (flag, entradas = {}) => {
    setShow(flag);
    setEntradas(entradas);
  };
  return (
    <div className='App'>
      <h2>Projeto Rema</h2>
      <h3>Questão 6</h3>

      <Entradas isToShow={isToShow} className='App' />

      {isShow && <Resolucao entradas={entradas} />}
    </div>
  );
};
