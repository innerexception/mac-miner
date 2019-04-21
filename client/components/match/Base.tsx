import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button } from '../Shared'
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
                {TopBar('MacMiner')}
                <div>
                    coin exchange goes here
                </div>
                <div>
                    building options or selected building info here
                </div>
                <div style={{padding:'0.5em', maxWidth:'25em'}}>
                    {this.props.me.base.map(row=>
                        <div>
                            {row.map((baseTile:BaseTile)=>
                                baseTile.buildingId ? 
                                    <div onClick={()=>this.showBuildingInfo(baseTile.buildingId)} 
                                         style={this.getBuldingStyle(baseTile.buildingId)}/> :
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
        
    }
}