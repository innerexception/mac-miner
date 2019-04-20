import { ReducerActions } from '../../../enum'

const appReducer = (state = getInitialState(), action:any) => {
    switch (action.type) {
        case ReducerActions.MATCH_TICK: 
            return { ...state, activeSession: action.session }
        case ReducerActions.SET_USER: 
            return { ...state, currentUser: action.currentUser }
        case ReducerActions.MATCH_CLEANUP: 
            return { ...state, activeSession: null, currentUser:null}
        default:
            return state
    }
};

export default appReducer;

const getInitialState = () => {
    return {
        activeSession: {
            players: new Array<Player>(),
            board: new Array<Array<Tile>>()
        },
        currentUser: {
            
        }
    }
}