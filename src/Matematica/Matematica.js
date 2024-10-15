import React, { useState, useEffect } from 'react';
import styles from './Matematica.module.css'; // Arquivo CSS para estilos

const Matematica = () => {
  useEffect(() => {
    document.title = 'Matemática | Quiz Educacional';
  }, []);

  const perguntasOriginais = [
    {
      pergunta: "Qual é o resultado de 5 + 5?",
      opcoes: ["8", "9", "10", "11"],
      respostaCorreta: "10"
    },
    {
      pergunta: "Quantos lados tem um triângulo?",
      opcoes: ["3", "4", "5", "6"],
      respostaCorreta: "3"
    },
    {
      pergunta: "Se você tem 12 maçãs e come 4, quantas maçãs sobraram?",
      opcoes: ["6", "7", "8", "9"],
      respostaCorreta: "8"
    },
    {
      pergunta: "Qual é o dobro de 7?",
      opcoes: ["12", "13", "14", "15"],
      respostaCorreta: "14"
    },
    {
      pergunta: "Quanto é 9 menos 3?",
      opcoes: ["5", "6", "7", "8"],
      respostaCorreta: "6"
    },
    {
      pergunta: "Quantas rodas tem uma bicicleta?",
      opcoes: ["1", "2", "3", "4"],
      respostaCorreta: "2"
    },
    {
      pergunta: "Quantos segundos tem um minuto?",
      opcoes: ["50", "60", "70", "80"],
      respostaCorreta: "60"
    },
    {
      pergunta: "Qual é o maior número: 7, 10 ou 5?",
      opcoes: ["7", "10", "5", "Todos são iguais"],
      respostaCorreta: "10"
    },
    {
      pergunta: "Se um bolo é dividido em 8 fatias e você come 2, quantas fatias sobram?",
      opcoes: ["6", "7", "5", "4"],
      respostaCorreta: "6"
    },
    {
      pergunta: "Qual é o resultado de 3 x 4?",
      opcoes: ["6", "8", "12", "15"],
      respostaCorreta: "12"
    }
  ];

  const TEMPO_LIMITADO = 59; // Tempo limite em segundos

  const embaralharArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const [perguntas, setPerguntas] = useState([]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [terminado, setTerminado] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(TEMPO_LIMITADO);
  const [respostaSelecionada, setRespostaSelecionada] = useState("");
  const [feedback, setFeedback] = useState(""); // Novo estado para o feedback da resposta

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
    } else {
      setFeedback(`Errado! A resposta certa é: ${perguntas[indiceAtual]?.respostaCorreta}`);
    }

    setTimeout(() => {
      const proximaPergunta = indiceAtual + 1;
      if (proximaPergunta < perguntas.length) {
        setIndiceAtual(proximaPergunta);
        setRespostaSelecionada("");
        setFeedback("");
        setTempoRestante(TEMPO_LIMITADO);
      } else {
        setTerminado(true);
      }
    }, 1000); // Delay de 1 segundos para mostrar o feedback
  };

  const reiniciarQuiz = () => {
    setPerguntas(embaralharArray([...perguntasOriginais]));
    setIndiceAtual(0);
    setPontuacao(0);
    setTerminado(false);
    setTempoRestante(TEMPO_LIMITADO);
    setRespostaSelecionada("");
    setFeedback(""); // Limpa o feedback
  };

  return (
    <div className={styles.quiz_container}>
      <h1 className={styles.titulo_one}>Quiz de Matemática</h1>
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
          {feedback && <p className={styles.feedback}>{feedback}</p>}
          <button className={styles.button} onClick={handleRespostaClick} disabled={!respostaSelecionada}>
            Confirmar Resposta
          </button>
        </div>
      )}
    </div>
  );
};

export default Matematica;
