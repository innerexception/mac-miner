declare enum BuildingType {
    Pipe='Pipe',
    Miner1='Miner1',
    Storage1='Storage1',
    Miner2='Miner2',
    Storage2='Storage2',
    Solar='Solar',
    Battery1='Battery1',
    Battery2='Battery2',
    ColdStorage='ColdStorage'
}

declare enum PassiveType {
    CoinExchange1='CoinEachange1',
    CoinExchange2='CoinEachange2',
    PowerAutoFill='PowerAutoFill'
}

interface Player {
    id:string
    assets: Array<Building>
    power: number
    coins: Array<Coin>
    passives: Array<Passive>
}

interface Coin { 
    name: string
    rune: string
    value: number
    difficulty: number
    circulation: number
}

interface Passive {
    name: string
    type: PassiveType
}

interface Building {
    playerId: string
    tileId: string
    powerCost: number
    buildCost: number
    gif: string
    type: BuildingType
    name:string
}

interface Tile {
    id: string
}

interface Session {
    players: Array<Player>
    board: Array<Array<Tile>>
}

interface RState {
    isConnected: boolean
    currentUser: Player
    activeSession: Session
}