import axios from "axios";

const GET_CHAMPIONS = "GET_CHAMPIONS";

const _getChampions = (champions) => {
    return {
        type: GET_CHAMPIONS,
        champions,
    };
};

export const getChampions = () => {
    return async (dispatch) => {
        const response = axios.get("/api/champions");
        dispatch(_getChampions(response.data));
    };
};

export default function championsReducer(state = [], action) {
    if(action.type === GET_CHAMPIONS) {
        state = action.champions;
    };
    return state;
}