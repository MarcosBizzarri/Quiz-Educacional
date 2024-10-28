import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Tela.module.css'; 

const Tela = () => {
  useEffect(() => {
    document.title = 'Inicio | Quiz Educacional';
  }, []);

  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nome && idade) {
      console.log(`Nome: ${nome}, Idade: ${idade}`);

      localStorage.setItem('nomeUsuario', nome);

      navigate('/Home');
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Quiz Educacional</h1>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputBlock}>
          <label htmlFor="nome" className={styles.label}>Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
            className={styles.input}
          />
        </div>

        <div className={styles.inputBlock}>
          <label htmlFor="idade" className={styles.label}>Idade:</label>
          <input
            id="idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            placeholder='Digite sua idade'
            className={styles.select}
          />
        </div>

        <button type="submit" className={styles.submitButton}>Entrar</button>
      </form>
    </div>
  );
};

export default Tela;
