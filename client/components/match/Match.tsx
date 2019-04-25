import * as React from 'react'
import AppStyles from '../../AppStyles';
import CryptoBlock from './CryptoBlock'
import Base from './Base'
import { TopBar, Button } from '../Shared'
import { onMatchTick } from '../uiManager/Thunks'
import { getFreshCoinBlock } from '../Util';

interface Props {
    currentUser: Player
    activeSession: Session
}

export default class Match extends React.Component<Props> {

    state = { activeView: 'base', activeCoinName: this.props.currentUser.wallet[0].name }
    
    componentDidMount = () => {
        setInterval(()=>onMatchTick(this.props.activeSession), 2000)
    }

    render(){
        return (
            <div style={AppStyles.window}>
                {TopBar('MacMiner')}
                <div style={{padding:'0.5em', maxWidth:'25em'}}>
                    {this.state.activeView === 'base' ? 
                        <Base 
                            onShowBlockForCoin={(activeCoin:Coin)=>this.setState({activeView:'block', activeCoinName:activeCoin.name})}
                            me={this.props.activeSession.players.find(player=>player.id===this.props.currentUser.id)}
                        />
                        :
                        <CryptoBlock 
                            coin={this.props.currentUser.wallet.find(coin=>coin.name===this.state.activeCoinName)}
                            me={this.props.activeSession.players.find(player=>player.id===this.props.currentUser.id)}
                            onShowBase={()=>this.setState({activeView:'base'})}
                        />
                    }
                </div>
         </div>
        )
    }
}

const styles = {
    
}