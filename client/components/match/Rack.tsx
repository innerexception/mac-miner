import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button, LightButton } from '../Shared'
import { onBuyCoin, onSellCoin } from '../uiManager/Thunks';
import { EmptyEquipment, EquipmentSprite, EquipmentType } from '../../../enum';

interface Props {
    onShowBlockForCoin: Function
    coins: Array<Coin>
    me: Player
}

export default class Rack extends React.Component<Props> {

    state = { 
        placingEquipment: false, 
        showBuildOptions: false,
        equipmentBuilder: EmptyEquipment
    }

    showEquipmentInfo = (equipment:Equipment) => {

    }

    getEquipmentStyle = (equipment:Equipment) => {
        return styles.emptyBaseTile
    }

    placeEquipment = (tile:RackTile) => {

    }

    getBuildOptions = () => 
        <div style={{...AppStyles.disabled, pointerEvents:'all', display: 'flex'}}>
            <div style={AppStyles.notification}>
                <div style={{marginBottom:'0.5em', whiteSpace:'pre-wrap'}}>
                    <h3 style={{marginBottom:'1em'}}>Configure New Equipment</h3>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-around'}}>
                        <div style={{...styles.equipment, backgroundImage: 'url('+this.state.equipmentBuilder.sprite+')'}}/>
                        <div>
                            <h4>lvl {this.state.equipmentBuilder.level} {this.state.equipmentBuilder.coinName} {this.state.equipmentBuilder.type}</h4>
                            <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
                                <h5>cost</h5>
                                <div>{this.state.equipmentBuilder.buildCost}</div>
                                <h5>power</h5>
                                <div>{this.state.equipmentBuilder.powerCost}</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4>Type</h4>
                        <select value={this.state.equipmentBuilder.type} style={{width:'5em'}}
                                onChange={(e)=>this.setState({equipmentBuilder: {...this.state.equipmentBuilder, type: e.currentTarget.value, coinName:null, sprite: (EquipmentSprite as any)[e.currentTarget.value]}})}>
                            {Object.keys(EquipmentType).map(type=><option value={type}>{type}</option>)}
                        </select>
                    </div>
                    {(this.state.equipmentBuilder.type === EquipmentType.Miner || this.state.equipmentBuilder.type === EquipmentType.Storage) &&
                        <div>
                            <h5>Coin Type</h5>
                            <select style={{width:'5em'}} defaultValue={null} value={this.state.equipmentBuilder.coinName} onChange={(e)=>this.setState({equipmentBuilder: {...this.state.equipmentBuilder, coinName: e.currentTarget.value}})}>
                                <option value={null}>Select...</option>
                                {this.props.coins.map(coin=><option value={coin.name}>{coin.name}</option>)}
                            </select>
                        </div>
                    }
                    <div>
                        <h5>Level</h5>
                        <input type="number" style={{width:'2em'}} 
                               min={1} value={this.state.equipmentBuilder.level} 
                               onChange={(e)=>this.setState({equipmentBuilder: {...this.state.equipmentBuilder, level: e.currentTarget.value, powerCost: +e.currentTarget.value*3, buildCost: +e.currentTarget.value*10}})}/>
                    </div>
                </div>
                {Button(true, ()=>this.setState({showBuildOptions:false}), 'Done')}
            </div>
        </div>  

    render(){
        return (
            <div style={AppStyles.window}>
                <div>
                    <h4>CoinEx</h4>
                    <div style={{display:'flex'}}>
                        <div style={{width:'4em'}}>Symbol</div>
                        <div style={{width:'4em'}}>Amt</div>
                        <div style={{width:'4em'}}>Val</div>
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
                                {LightButton(true, ()=>onBuyCoin(coin), 'Buy')}
                                {LightButton(true, ()=>onSellCoin(coin), 'Sell')}
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
                                            ()=>this.placeEquipment(rackTile) : ()=>this.setState({showBuildOptions:true})} 
                                         style={styles.emptyBaseTile}/>
                    )}
                </div>
                {this.state.showBuildOptions && this.getBuildOptions()}
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
    },
    equipment: {
        height:'2em', width:'2em',
        backgroundRepeat:'no-repeat',
        backgroundPosition:'center',
        backgroundSize:'contain'
    }
}