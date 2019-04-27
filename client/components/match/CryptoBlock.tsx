import * as React from 'react'
import { onMineBlock } from '../uiManager/Thunks'
import AppStyles from '../../AppStyles';
import { Button, LightButton } from '../Shared'
import { TileState, MatchStatus } from '../../../enum'
import Set from './Set'

interface Props {
    me: Player
    coin: Coin
    onShowBase: Function
    activeSession: Session
}

interface State {
    showMessage: string,
    showSetForTile: CryptoTile | null
}

export default class CryptoBlock extends React.Component<Props, State> {

    state = {
        showMessage: '',
        showSetForTile: null as null
    }

    onSolved = (success:boolean) => {
        if(success) this.mineBlock(this.state.showSetForTile)
        this.setState({showSetForTile: null})
    }

    getNotification = () => 
        <div style={{...styles.disabled, display: 'flex'}}>
            <div style={AppStyles.notification}>
                <div style={{marginBottom:'0.5em', whiteSpace:'pre-wrap'}}>
                    {this.state.showMessage}
                </div>
                {Button(true, ()=>this.setState({showMessage:''}), 'Done')}
            </div>
        </div>  

    getSetForTile = () => 
        //TODO: 
        //set field size and # of sets increases with difficulty
        //base is 3x3 with 1 set, scaled by difficulty
        //set categories: color, texture, shape, number
        <Set sets={this.props.coin.difficulty}
             onSolved={this.onSolved}
             dimension={2+this.props.coin.difficulty}/>
    

    mineBlock = (tile:CryptoTile) => {
        onMineBlock(tile.x, tile.y, this.props.coin, this.props.me, this.props.activeSession)
    }

    getTileBackground = (tile:CryptoTile) => {
        
    }

    render(){
        return (
            <div>
                <div style={{...styles.tileInfo}}>
                    <div style={styles.infoInner}>
                        info
                        {LightButton(true, this.props.onShowBase, 'Home')}
                    </div>
                </div>
                <div style={{position:'relative'}}>
                    <div style={styles.mapFrame}>
                        <div style={{display:'flex'}}>
                            {this.props.coin.activeBlock.map((row) => 
                                <div>
                                    {row.map((tile:CryptoTile) => 
                                         <div 
                                            onClick={tile.isMined ? null : ()=>this.setState({showSetForTile: tile})}
                                            style={{
                                                ...styles.tile, 
                                                ...(tile.isMined ? styles.minedTile : {})
                                                }}>
                                            {tile.hadFragment && <div style={styles.fragment}/>}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    {this.state.showMessage && this.getNotification()}
                    {this.state.showSetForTile && this.getSetForTile()}
                </div>
            </div>
        )
    }
}

const styles = {
    disabled: {
        pointerEvents: 'none' as 'none',
        alignItems:'center', justifyContent:'center', 
        position:'absolute' as 'absolute', top:0, left:0, width:'100%', height:'100%'
    },
    mapFrame: {
        position:'relative' as 'relative',
        backgroundImage: 'url('+require('../../assets/whiteTile.png')+')',
        backgroundRepeat: 'repeat',
        overflow:'auto',
        maxHeight:'60vh',
        maxWidth:'100%'
    },
    tileInfo: {
        marginBottom: '0.5em',
        padding: '0.5em',
        border: '1px solid'
    },
    infoInner: {
        padding:'0.5em',
        background:'white',
        borderRadius:'5px'
    },
    tile: {
        width: '32px',
        height:'32px',
        border: '1px',
        position:'relative' as 'relative',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        backgroundImage: 'url('+require('../../assets/pipes/tile026.png')+')',
        cursor:'pointer'
    },
    minedTile: {
        backgroundImage: 'url('+require('../../assets/pipes/tile004.png')+')',
        cursor:'none'
    },
    tileInner: {
        background: 'white',
        width: '100%',
        textAlign: 'center' as 'center',
        borderRadius: '5px',
        border: '1px solid',
        margin: '5px'
    },
    otherTeamTurn: {
        background: 'white',
        padding: '2px',
        borderRadius: '5px',
        textAlign: 'center' as 'center',
        margin: '5px'
    },
    fragment: {
        
    }
}