import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button, LightButton } from '../Shared'
import { onBuyCoin, onSellCoin } from '../uiManager/Thunks'
import { getTotalPower } from '../Util';

interface Props {
    coin: Coin
    ownedCoins: Array<Coin>
    holding: CoinHolding | undefined
    hide: Function
}

export default class CoinShop extends React.Component<Props> {

    state = { 
        amount:0,
        price:0,
        payCoin: this.props.ownedCoins[0],
        buying: true
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
                        <div style={{width:'4em'}}>Dif</div>
                    </div>
                    <div style={{display:'flex'}}>
                        <div style={{width:'4em'}}>
                            <span style={{fontFamily:'Coin'}}>{this.props.coin.rune}</span> {this.props.coin.name}
                        </div>
                        <div style={{width:'4em'}}>{this.props.holding.amount}</div>
                        <div style={{width:'4em'}}>{this.props.coin.value}</div>
                        <div style={{width:'4em'}}>{this.props.coin.difficulty}</div>
                        <input type="number" min={0} 
                               value={this.state.amount} 
                               onChange={(e)=>this.setState({amount: e.currentTarget.value})}/>
                    </div>
                    <div>
                        <div>Price</div>
                        <div>{this.state.amount*this.props.coin.value}</div>
                    </div>
                    //TODO: radio buttons for buy/sell
                    <div>
                        <h5>{this.state.buying ? 'Pay With' : 'Recieve Payment In'}</h5>
                        <div>
                            <h5>Coin Type</h5>
                            <select style={{width:'5em'}} defaultValue={null} value={this.state.payCoin.name} onChange={(e)=>this.setState({...this.state, payCoin: this.props.ownedCoins.find(coin=>coin.name===e.currentTarget.value) })}>
                                <option value={null}>Select...</option>
                                {this.props.ownedCoins.map(coin=><option value={coin.name}>{coin.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div style={{display:'flex', justifyContent:'flex-end', alignItems:'center'}}>
                        {LightButton(true, this.props.hide, 'Cancel')}
                        {Button(true, ()=>{this.props.hide()}, 'Ok')}
                    </div>
                </div>
         </div>
        )
    }
}

const styles = {
}