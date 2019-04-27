import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button, LightButton } from '../Shared'
import { onBuyCoin, onSellCoin } from '../uiManager/Thunks'
import EquipmentBuilder from './EquipmentBuilder'
import PowerStore from './PowerStore'
import { getTotalPower } from '../Util';

interface Props {
    onShowBlockForCoin: Function
    coins: Array<Coin>
    me: Player
}

export default class Rack extends React.Component<Props> {

    state = { 
        placingEquipment: false, 
        showBuildOptions: false,
        showEquipmentInfo: false,
        showBuyPower: false,
        rackSpace: 0
    }

    getEquipmentStyle = (equipment:Equipment) => {
        return {
            backgroundImage: 'url('+equipment.sprite+')',
            ...AppStyles.equipment,
            margin:'2px',
            border: '1px dotted'
        }
    }

    render(){
        return (
            <div style={AppStyles.window}>
                <div>
                    <h4>CoinEx</h4>
                    <div style={{display:'flex'}}>
                        <div style={{width:'4em'}}>Symbol</div>
                        <div style={{width:'4em'}}>Amt</div>
                        <div style={{width:'4em'}}>Val</div>
                        <div style={{width:'4em'}}>Hash Rate</div>
                    </div>
                    {this.props.me.wallet.map(coinHolding=>{
                        let coin = this.props.coins.find(coin=>coin.name===coinHolding.name)
                        return (
                            <div style={{display:'flex'}}>
                                <div style={{width:'4em'}}>
                                    <span style={{fontFamily:'Coin'}}>{coin.rune}</span> {coin.name}
                                </div>
                                <div style={{width:'4em'}}>{coinHolding.amount}</div>
                                <div style={{width:'4em'}}>{coin.value}</div>
                                <div>{getHashRate(this.props.me.rack, coin.name)}</div>
                                {LightButton(true, ()=>onBuyCoin(coin), 'Buy')}
                                {LightButton(true, ()=>onSellCoin(coin), 'Sell')}
                                {LightButton(true, ()=>this.props.onShowBlockForCoin(coin), 'Mine')}
                            </div>
                        )
                    })}
                </div>
                <div>
                    <h4>My Rack</h4>
                    <div style={{display:'flex'}}>
                        <h4>Power</h4>
                        <div>{this.props.me.power} (-{getTotalPower(this.props.me.rack)})</div>
                        {LightButton(true, ()=>this.setState({showBuyPower: true}), 'Buy')}
                    </div>
                    <div style={{padding:'0.5em', maxWidth:'25em', display:'flex', justifyContent:'center'}}>
                        {this.props.me.rack.map((rackTile:RackTile, i)=>
                                    rackTile.equipment ? 
                                        <div onClick={()=>this.setState({showEquipmentInfo: rackTile.equipment})} 
                                            style={this.getEquipmentStyle(rackTile.equipment)} 
                                        /> :
                                        <div onClick={()=>this.setState({showBuildOptions:true, rackSpace: i})} 
                                            style={styles.emptyBaseTile}/>
                        )}
                    </div>
                </div>
                {this.state.showBuildOptions && 
                    <EquipmentBuilder hide={()=>this.setState({showBuildOptions:false})} 
                                      me={this.props.me}
                                      rackSpace={this.state.rackSpace}
                                      coins={this.props.coins}/>
                }
                {this.state.showBuyPower && 
                    <PowerStore me={this.props.me}
                                coins={this.props.coins}
                                hide={()=>this.setState({showBuyPower:false})}/>
                }
                {this.state.showEquipmentInfo && 
                    <div style={{...AppStyles.disabled, display: 'flex'}}>
                        <div style={AppStyles.notification}>
                            <div style={{marginBottom:'0.5em', whiteSpace:'pre-wrap'}}>
                                
                            </div>
                            {Button(true, ()=>this.setState({showEquipmentInfo:false}), 'Done')}
                        </div>
                    </div>  
                }
         </div>
        )
    }
}

const getHashRate = (rack:Array<RackTile>, coinName:string) => {
    let rate = 0
    rack.forEach(space=>{
        if(space.equipment && space.equipment.coinName===coinName && space.equipment.isEnabled) rate+=space.equipment.level
    })
    return rate
}

const styles = {
    emptyBaseTile: {
        backgroundImage: 'url('+require('../../assets/pipes/tile035.png')+')',
        backgroundRepeat: 'no-repeat',
        height:'1.5em',
        width:'1.5em',
        margin:'2px',
        border: '1px dotted',
        cursor:'pointer'
    }
}