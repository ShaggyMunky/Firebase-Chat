import types from '../actions/types';

const DEFAULT_STATE = {
    roomList: {},
    chatLog: []
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type){
        case types.GET_ROOM_LIST:
            return {...state, roomList: action.payload};
        default:
            return state;
    }
}