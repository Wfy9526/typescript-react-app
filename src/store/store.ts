import {createStore} from 'redux';
import * as eventEnum from './eventEnum';

interface Iaction {
    type: string,
    val: any,
};

const reducer = (state: object = {}, action: Iaction) => {
    let result: object = {};
    switch (action.type){
        case eventEnum.TEST:
            result = {val: action.val};
            break;
    }
    return result;
};
const store = createStore(reducer);

export default store;
