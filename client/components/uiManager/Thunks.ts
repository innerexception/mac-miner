import { dispatch } from '../../../client/App'
import { ReducerActions } from '../../../enum'

export const onMatchStart = (currentUser:Player) => {
    dispatch({
        type: ReducerActions.MATCH_TICK,
        action: {
            session: {
                players: [currentUser]
            }
        }
    })
}

export const onMatchTick = (session:Session) => {
    //TODO
    //1. subtract power req of connected buildings and set power status
    //2. if power status low, disable enough buildings so that it is not
    //3. check coin market and adjust for value and difficulty
    //4. check miner outputs for each powered coin miner and record progress or produce a coin
    //5. check for global event trigger
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
    //TODO: can only build on cleared tiles
    //TODO: tile may have affinity for a coin type
}

export const onCleanSession = () => {
    dispatch({
        type: ReducerActions.MATCH_CLEANUP
    })
}