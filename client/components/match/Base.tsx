import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button, LightButton } from '../Shared'

interface Props {
    onShowBlockForCoin: Function
    coins: Array<Coin>
    me: Player
}

export default class Match extends React.Component<Props> {

    state = { placingEquipment: false }

    showEquipmentInfo = (equipment:Equipment) => {

    }

    getEquipmentStyle = (equipment:Equipment) => {
        return styles.emptyBaseTile
    }

    placeEquipment = (tile:RackTile) => {

    }

    showBuildOptions = () => {

    }

    render(){
        return (
            <div style={AppStyles.window}>
                <div>
                    <h4>CoinEx</h4>
                    <div style={{display:'flex'}}>
                        <div>Symbol</div>
                        <div>Amt</div>
                        <div>Val</div>
                    </div>
                    {this.props.me.wallet.map(coinHolding=>{
                        let coin = this.props.coins.find(coin=>coin.name===coinHolding.name)
                        return (
                            <div style={{display:'flex'}}>
                                <div style={{fontFamily:'Coin'}}>{coin.rune}</div>
                                {coin.name}
                                {coinHolding.amount}
                                {coin.value}
                                {LightButton(true, ()=>this.props.onShowBlockForCoin(coin), 'Buy')}
                                {LightButton(true, ()=>this.props.onShowBlockForCoin(coin), 'Sell')}
                                {LightButton(true, ()=>this.props.onShowBlockForCoin(coin), 'Mine')}
                            </div>
                        )
                    })}
                </div>
                <div>
                    building options or selected building info here
                </div>
                <div style={{padding:'0.5em', maxWidth:'25em', display:'flex', justifyContent:'center'}}>
                    {this.props.me.rack.map((rackTile:RackTile)=>
                                rackTile.equipment ? 
                                    <div onClick={()=>this.showEquipmentInfo(rackTile.equipment)} 
                                         style={this.getEquipmentStyle(rackTile.equipment)} 
                                    /> :
                                    <div onClick={this.state.placingEquipment ? 
                                            ()=>this.placeEquipment(rackTile) : ()=>this.showBuildOptions()} 
                                         style={styles.emptyBaseTile}/>
                    )}
                </div>
         </div>
        )
    }
}

const styles = {
    emptyBaseTile: {
        backgroundImage: 'url('+require('../../assets/pipes/tile035.png')+')',
        backgroundRepeat: 'no-repeat',
        height:'1.5em',
        width:'1.5em',
        margin:'2px',
        border: '1px dotted'
    }
}