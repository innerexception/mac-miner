import { dispatch } from '../../../client/App'
import { ReducerActions } from '../../../enum'
import { getFreshCoinBlock } from '../Util';

export const onMatchStart = (currentUser:Player) => {
    dispatch({
        type: ReducerActions.SET_USER,
        session: {
            players: [currentUser]
        },
        currentUser
    })
}

export const onMineBlock = (tile:CryptoTile, coin:Coin, miner:Player) => {
    miner.wallet = miner.wallet.map(thisCoin=>{
        if(thisCoin.name===coin.name){
            thisCoin.currentFragments+=0.1
            tile.isMined = true
            if(thisCoin.currentFragments >= 1){
                //Close out the block
                thisCoin.amount++
                thisCoin.circulation++
                thisCoin.difficulty++
                thisCoin.currentFragments = 0
                thisCoin.activeBlock = getFreshCoinBlock()
            }
            else 
                thisCoin.activeBlock[tile.x][tile.y] = {...tile}
            return {...thisCoin}
        }
        else
            return thisCoin
    })

    dispatch({
        type: ReducerActions.PLAYER_UPDATE,
        player:miner
    })
}

export const onMatchTick = (session:Session) => {
    //TODO
    //1. subtract power req of connected buildings and set power status
    //2. if power status low, disable enough buildings so that it is not
    //3. check coin market and adjust for value and difficulty
    //4. check miner outputs for each powered coin miner and record progress or produce a coin
    //5. check for global event trigger
    //6. check if AI miners have closed out a block, perform mining for them
}

export const onPurchaseBuilding = (building:Building) => {

}

export const onPurchasePower = (kw:number) => {

}

export const onPlaceBuilding = (building:Building) => {

}

export const onPurchasePassive = (passive:Passive) => {

}

export const onSellCoin = (coin:Coin) => {
    //TODO: value decreases
}

export const onBuyCoin = (coin:Coin) => {
    //TODO: value increases
}

export const onClearTile = (tile:CryptoTile) => {
    //TODO: chance to discover new coin (trigger ICO)
    //TODO: clearing requires equipment in some cases
    //TODO: tile may have affinity for a coin type
}

export const onCleanSession = () => {
    dispatch({
        type: ReducerActions.MATCH_CLEANUP
    })
}