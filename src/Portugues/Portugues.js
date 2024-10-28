import React, { useState, useEffect } from 'react';
import styles from './Portugues.module.css';

const Portugues = () => {
  useEffect(() => {
    document.title = 'Português | Quiz Educacional';
  }, []);

  const perguntasOriginais = [
    {
      pergunta: "Qual destas palavras é um substantivo?",
      opcoes: ["Correr", "Bola", "Alegre", "Rápido"],
      respostaCorreta: "Bola"
    },
    {
      pergunta: "Qual a palavra que rima com 'casa'?",
      opcoes: ["Escola", "Mesa", "Brasa", "Sol"],
      respostaCorreta: "Brasa"
    },
    {
      pergunta: "Qual a letra inicial da palavra 'Elefante'?",
      opcoes: ["A", "E", "O", "U"],
      respostaCorreta: "E"
    },
    {
      pergunta: "Qual destas palavras é um verbo?",
      opcoes: ["Carro", "Azul", "Correr", "Bonito"],
      respostaCorreta: "Correr"
    },
    {
      pergunta: "Qual destas palavras está escrita corretamente?",
      opcoes: ["sabi", "sabe", "sabee", "sabê"],
      respostaCorreta: "sabe"
    },
    {
      pergunta: "Qual palavra completa a frase: 'Eu gosto de ______ futebol'?",
      opcoes: ["Dormir", "Comer", "Jogar", "Correr"],
      respostaCorreta: "Jogar"
    },
    {
      pergunta: "Qual destas palavras é um adjetivo?",
      opcoes: ["Bonito", "Caminhar", "Brasil", "Casa"],
      respostaCorreta: "Bonito"
    },
    {
      pergunta: "Qual palavra completa a frase: 'A menina está muito ______'?",
      opcoes: ["Brincar", "Correr", "Feliz", "Amarelo"],
      respostaCorreta: "Feliz"
    },
    {
      pergunta: "Qual é o plural de 'carro'?",
      opcoes: ["Carra", "Carros", "Carrões", "Carrinhos"],
      respostaCorreta: "Carros"
    },
    {
      pergunta: "Qual palavra está incorreta?",
      opcoes: ["Elefante", "Cafê", "Chocolate", "Cadeira"],
      respostaCorreta: "Cafê"
    }
  ];

  const TEMPO_LIMITADO = 59; 

  const embaralharArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const [perguntas, setPerguntas] = useState([]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [terminado, setTerminado] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(TEMPO_LIMITADO);
  const [respostaSelecionada, setRespostaSelecionada] = useState("");
  const [feedback, setFeedback] = useState(""); 
  const [corFeedback, setCorFeedback] = useState(""); 

  useEffect(() => {
    setPerguntas(embaralharArray([...perguntasOriginais]));
    setTempoRestante(TEMPO_LIMITADO);
  }, []);

  useEffect(() => {
    if (tempoRestante > 0 && !terminado) {
      const timer = setInterval(() => {
        setTempoRestante((prevTempo) => prevTempo - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (tempoRestante === 0) {
      handleRespostaClick();
    }
  }, [tempoRestante, terminado]);

  const handleRespostaClick = () => {
    if (respostaSelecionada === perguntas[indiceAtual]?.respostaCorreta) {
      setPontuacao(pontuacao + 1);
      setFeedback("Correto! 🎉");
      setCorFeedback(styles.correta); 
    } else {
      setFeedback(`Errado! A resposta certa é: ${perguntas[indiceAtual]?.respostaCorreta}`);
      setCorFeedback(styles.errada); 
    }

    setTimeout(() => {
      const proximaPergunta = indiceAtual + 1;
      if (proximaPergunta < perguntas.length) {
        setIndiceAtual(proximaPergunta);
        setRespostaSelecionada("");
        setFeedback("");
        setCorFeedback(""); 
        setTempoRestante(TEMPO_LIMITADO);
      } else {
        setTerminado(true);
      }
    }, 2000); 
  };

  const reiniciarQuiz = () => {
    setPerguntas(embaralharArray([...perguntasOriginais]));
    setIndiceAtual(0);
    setPontuacao(0);
    setTerminado(false);
    setTempoRestante(TEMPO_LIMITADO);
    setRespostaSelecionada("");
    setFeedback(""); 
    setCorFeedback(""); 
  };


  const progresso = Math.round(((indiceAtual + 1) / perguntas.length) * 100);

  return (
    <div className={styles.quiz_container}>
      <h1 className={styles.titulo_one}>Quiz de Português</h1>
      {terminado ? (
        <div>
          <h2>Você finalizou o quiz!</h2>
          <p>Sua pontuação: {pontuacao} de {perguntas.length}</p>
          <p>{pontuacao >= perguntas.length / 2 ? "Parabéns, você foi muito bem!" : "Continue praticando, você está indo bem!"}</p>
          <button onClick={reiniciarQuiz}>Reiniciar Quiz</button>
        </div>
      ) : (
        <div>
          <h2 className={styles.pergunta}>{perguntas[indiceAtual]?.pergunta}</h2>
          <p>Tempo restante: {tempoRestante} segundos</p>
          <div className={styles.progresso_container}>
            <div
              className={styles.progresso_barra}
              style={{ width: `${progresso}%` }}
            >
              {progresso}%
            </div>
          </div>
          <div className={styles.opcoes_container}>
            {perguntas[indiceAtual]?.opcoes.map((opcao, index) => (
              <div key={index} className={styles.opcao}>
                <input
                  type="radio"
                  name="opcao"
                  value={opcao}
                  checked={respostaSelecionada === opcao}
                  onChange={() => setRespostaSelecionada(opcao)}
                />
                {opcao}
              </div>
            ))}
          </div>
          {feedback && <p className={`${styles.feedback} ${corFeedback}`}>{feedback}</p>}
          <button className={styles.button} onClick={handleRespostaClick} disabled={!respostaSelecionada}>
            Confirmar Resposta
          </button>
        </div>
      )}
    </div>
  );
};

export default Portugues;
