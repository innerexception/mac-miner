import * as React from 'react'
import { } from '../uiManager/Thunks'
import AppStyles from '../../AppStyles';
import { Button, LightButton } from '../Shared'
import { TileState, MatchStatus } from '../../../enum'

interface Props {
    me: Player
    block: Array<Array<CryptoTile>>
    coin: Coin
    onShowBase: Function
}

interface State {
    showMessage: string
}

export default class CryptoBlock extends React.Component<Props, State> {

    state = {
        showMessage: ''
    }

    getNotification = () => {
        if(this.state.showMessage)
            return (
                <div style={{...styles.disabled, display: 'flex'}}>
                    <div style={AppStyles.notification}>
                        <div style={{marginBottom:'0.5em', whiteSpace:'pre-wrap'}}>
                            {this.state.showMessage}
                        </div>
                        {Button(true, ()=>this.setState({showMessage:''}), 'Done')}
                    </div>
                </div>
            )
    }

    mineBlock = (tile:CryptoTile) => {

    }

    getTileBackground = (tile:CryptoTile) => {
        
    }

    render(){
        return (
            <div>
                <div style={{...styles.tileInfo}}>
                    <div style={styles.infoInner}>
                        info
                    </div>
                </div>
                <div style={{position:'relative'}}>
                    <div style={styles.mapFrame}>
                        <div style={{display:'flex'}}>
                            {this.props.block.map((row) => 
                                <div>
                                    {row.map((tile:CryptoTile) => 
                                         <div 
                                            onClick={tile.isMined ? null : ()=>this.mineBlock(tile)}
                                            style={{
                                                ...styles.tile, 
                                                background: tile.isMined ? 'white' : 'black',
                                                borderStyle: tile.isMined ? 'solid' : 'dotted',
                                                }}>
                                            {tile.hadFragment && <div style={styles.fragment}/>}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    {this.getNotification()}
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
        width: '6em',
        height:'2em',
        border: '1px',
        position:'relative' as 'relative',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
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