import * as React from 'react'
import AppStyles from '../../AppStyles';
import Board from './Board'
import { TopBar, Button } from '../Shared'
import { onMatchTick } from '../uiManager/Thunks'

interface Props {
    currentUser: Player
    activeSession: Session
}

export default class Match extends React.Component<Props> {

    componentDidMount = () => {
        setInterval(()=>onMatchTick(this.props.activeSession), 2000)
    }

    render(){
        return (
            <div style={AppStyles.window}>
                {TopBar('MacMiner')}
                <div style={{padding:'0.5em', maxWidth:'25em'}}>
                    <Board 
                        board={this.props.activeSession.board} 
                        me={this.props.activeSession.players.find(player=>player.id===this.props.currentUser.id)}
                        activeSession={this.props.activeSession}
                        players={this.props.activeSession.players}/>
                </div>
         </div>
        )
    }
}

const styles = {
    
}