import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css'; // Certifique-se de criar esse arquivo CSS

const Home = () => {

  useEffect(() => {
    
    document.title = 'Matérias | Quiz Educacional';
  }, []);




  const [selectedSubject, setSelectedSubject] = useState('portugues');
  const [nome, setNome] = useState(''); // Adiciona um estado para o nome
  const navigate = useNavigate();

  useEffect(() => {
    // Recupera o nome do localStorage
    const nomeUsuario = localStorage.getItem('nomeUsuario');
    if (nomeUsuario) {
      setNome(nomeUsuario);
    }
  }, []);

  const handleChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleStart = () => {
    console.log(`Iniciando quiz de ${selectedSubject}`);
    // Redireciona para a rota da matéria selecionada
    navigate(`/${selectedSubject}`);
  };

  const handleBack = () => {
    // Redireciona para a tela de cadastro (Tela.js)
    navigate('/Tela');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>
        Seja Bem-Vindo(a), {nome}, ao <br />Quiz Educacional
      </h1>
      <p className={styles.paragrafo}>
        Diga qual matéria você quer aprender e navegue pelas questões personalizadas para aprimorar seus conhecimentos.
      </p>

      <div className={styles.selectBlock}>
        <label htmlFor="subject" className={styles.nome_titulo}>Qual matéria você deseja aprender?</label>
        <select id="subject" value={selectedSubject} onChange={handleChange}>
          <option value="portugues">Português</option>
          <option value="matematica">Matemática</option>
          <option value="historia">História</option>
        </select>
      </div>

      <div className={styles.buttonGroup}>
        <button onClick={handleBack} className={styles.backButton}>
          Voltar
        </button>
        
        <button onClick={handleStart} className={styles.startButton}>
          Começar
        </button>
      </div>
    </div>
  );
};

export default Home;
