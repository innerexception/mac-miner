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

    state = { activeView: 'base', activeCoin: null as null }
    
    componentDidMount = () => {
        setInterval(()=>onMatchTick(this.props.activeSession), 2000)
    }

    getActiveBlockForCoin = (coin:Coin) => {
        if(coin.activeBlock) return coin.activeBlock
        else coin.activeBlock = getFreshCoinBlock()
    }
    
    render(){
        return (
            <div style={AppStyles.window}>
                {TopBar('MacMiner')}
                <div style={{padding:'0.5em', maxWidth:'25em'}}>
                    {this.state.activeView === 'base' ? 
                        <Base 
                            onShowBlockForCoin={(activeCoin:Coin)=>this.setState({activeView:'block', activeCoin})}
                            me={this.props.activeSession.players.find(player=>player.id===this.props.currentUser.id)}
                        />
                        :
                        <CryptoBlock 
                            block={this.getActiveBlockForCoin(this.state.activeCoin)} 
                            coin={this.state.activeCoin}
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