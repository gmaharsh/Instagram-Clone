export const initialState = {
    user: null,
    following: [],
    followers: []
}

export const actionTypes = {
    SET_USER : "SET_USER"
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user:action.user
            }
        case "REMOVE_USER":
            return {
                user:null
            }
        case "UPDATE":
            return {
                ...state,
                following: action.payload.following,
                followers: action.payload.followers
            }
        
        default:
            return state
    }
}

