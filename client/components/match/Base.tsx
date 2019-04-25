import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button, LightButton } from '../Shared'
import { onMatchTick } from '../uiManager/Thunks'

interface Props {
    onShowBlockForCoin: Function
    me: Player
}

export default class Match extends React.Component<Props> {

    state = { placingBuilding: false }

    showBuildingInfo = (buildingId:string) => {

    }

    getBuldingStyle = (buildingId:string) => {
        return styles.emptyBaseTile
    }

    placeBuilding = (tile:BaseTile) => {

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
                    {this.props.me.wallet.map(coin=>
                        <div style={{display:'flex'}}>
                            <div style={{fontFamily:'Coin'}}>{coin.rune}</div>
                            {coin.name}
                            {coin.amount}
                            {coin.value}
                            {LightButton(true, ()=>this.props.onShowBlockForCoin(coin), 'Buy')}
                            {LightButton(true, ()=>this.props.onShowBlockForCoin(coin), 'Sell')}
                            {LightButton(true, ()=>this.props.onShowBlockForCoin(coin), 'Mine')}
                        </div>
                    )}
                </div>
                <div>
                    building options or selected building info here
                </div>
                <div style={{padding:'0.5em', maxWidth:'25em', display:'flex', justifyContent:'center'}}>
                    {this.props.me.base.map(row=>
                        <div>
                            {row.map((baseTile:BaseTile)=>
                                baseTile.buildingId ? 
                                    <div onClick={()=>this.showBuildingInfo(baseTile.buildingId)} 
                                         style={this.getBuldingStyle(baseTile.buildingId)} 
                                    /> :
                                    <div onClick={this.state.placingBuilding ? 
                                            ()=>this.placeBuilding(baseTile) : ()=>this.showBuildOptions()} 
                                         style={styles.emptyBaseTile}/>
                            )}
                        </div>
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