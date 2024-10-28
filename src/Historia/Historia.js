import React, { useState, useEffect } from 'react';
import styles from './Historia.module.css'; 

const Historia = () => {
  useEffect(() => {
    document.title = 'História | Quiz Educacional';
  }, []);

  const perguntasOriginais = [
    {
      pergunta: "Quem foi o primeiro imperador do Brasil?",
      opcoes: ["Dom Pedro I", "Dom Pedro II", "Getúlio Vargas", "Deodoro da Fonseca"],
      respostaCorreta: "Dom Pedro I"
    },
    {
      pergunta: "Em que ano o Brasil foi descoberto?",
      opcoes: ["1492", "1500", "1600", "1700"],
      respostaCorreta: "1500"
    },
    {
      pergunta: "Quem descobriu o Brasil?",
      opcoes: ["Cristóvão Colombo", "Pedro Álvares Cabral","Dom João VI", "Tiradentes"],
      respostaCorreta: "Pedro Álvares Cabral"
    },
    {
      pergunta: "Qual país colonizou o Brasil?",
      opcoes: ["Espanha", "Portugal", "França", "Inglaterra"],
      respostaCorreta: "Portugal"
    },
    {
      pergunta: "Quem proclamou a independência do Brasil?",
      opcoes: ["Dom Pedro I","Dom Pedro II","Tiradentes","Getúlio Vargas"],
      respostaCorreta: "Dom Pedro I"
    },
    {
      pergunta: "Qual foi o nome da primeira capital do Brasil?",
      opcoes: ["Brasília","São Paulo", "Salvador", "Rio de Janeiro"],
      respostaCorreta: "Salvador"
    },
    {
      pergunta: "Em que ano a escravidão foi abolida no Brasil?",
      opcoes: ["1888", "1822", "1900", "1891"],
      respostaCorreta: "1888"
    },
    {
      pergunta: "Qual princesa assinou a Lei Áurea?",
      opcoes: ["Princesa Isabel", "Rainha Vitória", "Imperatriz Leopoldina", "Princesa Diana"],
      respostaCorreta: "Princesa Isabel"
    },
    {
      pergunta: "Qual desses eventos foi importante na história do Brasil?",
      opcoes: ["Descobrimento do fogo", "Independência do Brasil", "Revolução Francesa", "Guerra Civil Americana"],
      respostaCorreta: "Independência do Brasil"
    },
    {
      pergunta: "Quem foi Tiradentes?",
      opcoes: ["Um médico","Um professor","Um líder da Inconfidência Mineira","Um político"],
      respostaCorreta: "Um líder da Inconfidência Mineira"
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
      <h1 className={styles.titulo_one}>Quiz de História</h1>
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

export default Historia;
