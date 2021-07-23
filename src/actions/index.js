export const actions = {
    setFavorite: 'SET_FAVORITE',
    deleteFavorite: 'DELETE_FAVORITE',
    loginRequest: 'LOGIN_REQUEST',
    logoutRequest: 'LOGOUT_REQUEST',
    registerRequest: 'REGISTER_REQUEST',
    getVideoSource: 'GET_VIDEO_SOURCE',
    searchQuery: 'GET_LIST_VIDEOS',
}

export const setFavorite = (payload) => ({
    type: actions.setFavorite,
    payload,
});

export const deleteFavorite = payload => (
    {
        type: actions.deleteFavorite,
        payload: payload
    }
)

export const loginRequest = payload => ({
    type: actions.loginRequest,
    payload,
});

export const logoutRequest = payload => ({
    type: actions.logoutRequest,
    payload: payload,
})

export const registerRequest = payload => ({
    type: actions.registerRequest,
    payload,
})

export const getVideoSource = payload => ({
    type: actions.getVideoSource,
    payload,
})


export const searchQuery = payload => ({
    type: actions.searchQuery,
    payload,
})