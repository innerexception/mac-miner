declare enum EquipmentType {
    Miner='Miner',
    Storage='Storage',
    Solar='Solar',
    Battery='Battery',
    CStorage='CStorage'
}

declare enum PassiveType {
    CoinExchange1='CoinEachange1',
    CoinExchange2='CoinEachange2',
    PowerAutoFill='PowerAutoFill'
}

interface Player {
    id:string
    rack: Array<RackTile>
    power: number
    wallet: Array<CoinHolding>
    passives: Array<Passive>
}

interface CoinHolding {
    name: string
    amount: number
    currentFragments: number
}

interface Coin { 
    name: string
    rune: string
    value: number
    difficulty: number
    circulation: number
    activeBlock: Array<Array<CryptoTile>>
}

interface Passive {
    name: string
    type: PassiveType
}

interface Equipment {
    powerCost: number
    isEnabled: boolean
    buildCost: number
    sprite: string
    type: EquipmentType
    coinName: string
    level: number
}

interface RackTile {
    id: string
    equipment: Equipment
}

interface CryptoTile {
    id: string
    isMined: boolean
    hadFragment: boolean
    x:number
    y:number
}

interface Session {
    players: Array<Player>
    coins: Array<Coin>
}

interface RState {
    isConnected: boolean
    currentUser: Player
    activeSession: Session
}