export const getRandomInt = (max:number) => Math.floor(Math.random() * Math.floor(max))

export const getRandomCoinName = () => 'TODO'

export const getRandomCoinRune = () => 'TODO'

export const getFreshCoinBlock = () => new Array(25).fill(null).map(row=>new Array(25).fill(null).map(tile=>{
    return {
        id: Date.now()+''+Math.random(),
        isMined: false,
        hadFragment: false
    }
}))

export const shuffleArray = (array:Array<any>) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return Array.from(array)
  }