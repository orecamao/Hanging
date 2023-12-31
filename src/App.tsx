import { useEffect, useState } from 'react';
import './App.css';
import { HangImage } from './components/HangImage';
import { letters } from './helpers/letters';
import { getRandomWord } from './helpers/getRandomWord';

function App() {

  const [ word, setWord ] = useState( getRandomWord() );
  const [ hiddenWord, setHiddenWord ] = useState( '_ '.repeat(word.length) );
  const [ attempts, setAttempts ] = useState( 0 );
  const [ lose, setLose ] = useState( false );
  const [ won, setWon ] = useState( false );


  useEffect( () => {
    if( attempts >= 9 ) { 
      setLose( true );
      setWon( false );

      // Desplaza la ventana hacia abajo
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth' // Opcional: hace que el desplazamiento sea suave
      });
    }
  }, [ attempts ] ) // hooks

  // Determinar si la persona ganó
  useEffect( () => {
    const currentHiddenWord = hiddenWord.split(' ').join('');
    if( currentHiddenWord === word ) {
      setWon( true );
      setLose( false );
    }
  },[ hiddenWord ])

  const checkLetter = (letter: string) => {

    if( lose ) {
      return;
    }
    if( won ) {
      return;
    }

    if( !word.includes( letter ) ) {
      setAttempts( Math.min( attempts + 1, 9 ) );
      return;
    }

    const hiddenWordArray = hiddenWord.split(' ');
    for(let i=0; i < word.length; i++) {
      if( word[i] === letter ) {
        hiddenWordArray[i] = letter;
      }
    }
    setHiddenWord(hiddenWordArray.join(' '));

  }

  const newGame = () => {
    const newWord = getRandomWord();

    setWord( newWord );
    setHiddenWord( '_ '.repeat(newWord.length) );
    setAttempts( 0 );
    setLose( false );
    setWon( false );

    // Desplaza la ventana hacia arriba
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Hace que el desplazamiento sea suave
  });

  }

  return (
    <div className='App'>

      {/* Imágenes */}
      <HangImage imageNumber={ attempts }/>
      
      {/* Palábra oculta */}
      <h3>{hiddenWord}</h3>

      {/* Contador de intentos */}
      <h3>Intentos: { attempts }</h3>

      {/* Mensaje si perdió */}
      {
        ( lose ) 
          ? <h2>Perdió { word }</h2>  
          : ''
      }

      {/* Mensaje si ganó */}
      {
        ( won ) 
          ? <h2>Ganó { word }</h2>
          : ''
      }

      {/* Botónes de letras */}
      
      {
        letters.map( (letter) => (
          <button 
            onClick={() => checkLetter( letter ) }  
            key={ letter }>
              { letter } 
          </button>
        ))

      }

      <br /><br />
      <button onClick={ newGame }
        style={{backgroundColor: 'skyblue'}}>
        Nuevo juego?
      </button>
    </div>
  )
};

export default App;
