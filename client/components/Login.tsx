import * as React from 'react';
import { onMatchStart } from './uiManager/Thunks'
import AppStyles from '../AppStyles';
import { Button, TopBar } from './Shared'

export default class Login extends React.Component {
    render(){
        return (
            <div style={AppStyles.window}>
                {TopBar('Welcome')}
                <div style={{padding:'0.5em'}}>
                    <h3 style={{margin:'0'}}>MacMiner</h3>
                    {Button(true, ()=>onMatchStart(getUser()), 'Start')}
                </div>
            </div>
        )
    }
}

const getUser = () => {
   return {
       id: Date.now() + ''+ Math.random(),
       assets: new Array<Building>(),
       power: 0,
       coins: new Array<Coin>(),
       passives: new Array<Passive>()
    }
}