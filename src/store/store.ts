import {createStore} from 'redux';
import * as eventEnum from './eventEnum';

interface Iaction {
    type: string,
    val: any,
}

interface IState {
    rooms: object[]
}

const storeState = {
    rooms: []
}

const reducer = (state: IState = storeState, action: Iaction) => {
    let result: IState = state;
    switch (action.type){
        case eventEnum.ADDROOM:
            result = {rooms: [...state.rooms, ...action.val]};
            break;
        case eventEnum.DELETEROOM:
            result = {rooms: action.val};
            break;
        default:
            break;
    }
    return result;
};
const store = createStore(reducer);

export default store;
