import React, { useEffect } from 'react';
import styles from './Sobre.module.css';

const Sobre = () => {

  useEffect(() => {
    document.title = ' Sobre | Quiz Educacional';
  }, []);
  
  return (
    <div className={styles.container}>
    <h1 className={styles.title}>Bem-vindo ao Quiz Educacional</h1>
    <p className={styles.paragraph}>
      Este aplicativo foi desenvolvido com o objetivo de tornar o aprendizado divertido e interativo para crianças. Sabemos que aprender pode ser desafiador, mas acreditamos que, com a abordagem certa, pode se transformar em uma experiência agradável e envolvente.
    </p>
    <h2 className={styles.subtitle}>Por que Criamos Este App?</h2>
    <p className={styles.paragraph}>
      Nosso principal objetivo é oferecer uma ferramenta que auxilie no desenvolvimento educacional de maneira acessível e eficaz. Com o aumento da educação a distância (EAD) e a necessidade de novas metodologias de ensino, o quiz educacional surge como uma solução dinâmica para reforçar o conteúdo estudado em sala de aula.
    </p>
    <h2 className={styles.subtitle}>Como Funciona?</h2>
    <p className={styles.paragraph}>
      O aplicativo apresenta uma variedade de perguntas em áreas como português, matemática e história, todas cuidadosamente elaboradas para desafiar e estimular o raciocínio dos estudantes.
    </p>
    <p className={styles.paragraph}>
      Esperamos que você aproveite esta jornada de aprendizado e que o quiz educacional seja uma ferramenta valiosa em seus estudos. Vamos aprender juntos de forma divertida!
    </p>
  </div>
  );
}

export default Sobre;
