let words: string[] = [
    'AGUACATE',
    'TELEFONO',
    'CELULAR',
    'NUMERO',
    'LAPTOP',
    'MICROFONO',
    'AURICULARES',
    'TECLADO',
    'ANIMAL',
    'CONSOLA',
    'RATON',
    'VIDEOJUEGOS',
    'VETERINARIO',
    'BRUJO',
    'LOBO', 
    'ANIME',
    'CREDO',
    'ESTERNOCLEIDOMASTOIDEO',
    'TERAPEUTA',
    'OTORRINOLARINGOLOGO',
    'PIRATA',
    'REY',
    'PIEZA'
];

export function getRandomWord() {

    const randomIndex = Math.floor( Math.random() * words.length );
    return words[ randomIndex ];
}