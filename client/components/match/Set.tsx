import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button } from '../Shared'
import { getRandomInt } from '../Util';


enum CardTexture {
    STARS,
    FUZZ1,
    FUZZ2,
    GRAVEL,
    STONE1,
    STONE2
}

interface Card {
    id: string
    color: string
    pattern: CardTexture
    number: number
    symbol: string
    isSelected: boolean
}

interface Props {
    dimension: number
    sets:number
    onSolved: Function
}

interface State{
    cards: Array<Card>
}

export default class Set extends React.Component<Props, State> {

    state = { cards: getInitialCards(this.props.dimension) }
    
    toggleSelectCard = (card:Card) => {
        this.state.cards = this.state.cards.map(scard=>{
            if(card.id === scard.id) return {...scard, isSelected: !scard.isSelected}
            else return scard
        })
        this.setState({cards: this.state.cards})
    }

    onTrySolve = () => {
        let selected = this.state.cards.filter(card=>card.isSelected)
        let availableCards = Array.from(selected)
        let matches=0
        for(var i=0; i<this.props.sets; i++){
            selected.forEach(card=>{
                const match = availableCards.filter(selectedCard=>
                        selectedCard.color === card.color &&
                        selectedCard.symbol === card.symbol && 
                        selectedCard.number === card.number &&
                        selectedCard.pattern === card.pattern)
                if(match.length >= 3){
                    //Remove found cards
                    availableCards = availableCards.filter(selectedCard=>
                        !match.find(mcard => selectedCard.id === mcard.id))
                    matches++
                }
            })
        }
        if(matches===this.props.sets) this.props.onSolved(true)
        else this.props.onSolved(false)
    }

    render(){
        return (
            <div style={AppStyles.window}>
                {TopBar('HashSolver v0.9')}
                <div style={{padding:'0.5em', maxWidth:'25em'}}>
                    {this.state.cards.map(card => 
                        <div style={card.isSelected ? styles.cardSelected : styles.card} 
                             onClick={()=>this.toggleSelectCard(card)}/>
                    )}
                </div>
                {Button(true, this.onTrySolve, 'Solve')}
         </div>
        )
    }
}

const getInitialCards = (dimension:number) => {
    let cards = new Array(dimension*dimension).fill(null).map(card => {
        return {
            id: Date.now()+''+Math.random(),
            color: 'black',
            pattern: CardTexture.STARS,
            number: getRandomInt(3),
            symbol: 'a',
            isSelected: false
        }
    })
    //TODO: set correct number of correct sets for difficulty, then shuffle


    return cards
}


const styles = {
    card: {

    },
    cardSelected: {

    }
}