const redux = require('redux')
const createStore = redux.createStore
const axios = require('axios')
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default


const initialState = {
    loading: false,
    users: [],
    error: '',
}

// Actions
const FETCH_USERS_REQUESTED = 'ETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
const FETCH_USER_FAILED = 'FETCH_USER_FAILED'

// Actons Creater
const fetchUsersRequest = ()  => {
    return {
        type: FETCH_USERS_REQUESTED
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users,
    }
}

const fetchUsersFailed = (error) => {
    return {
        type: FETCH_USER_FAILED,
        payload: error,
    }
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case FETCH_USERS_SUCCEEDED:
            return{
                ...state,
                users: action.payload,
                error: '',
            }
        case FETCH_USER_FAILED:
            return {
                loading: false,
                users: [],
                error: action.payload,
            }
    }
}


const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            // response data is the user
            const users = response.data.map((user) => user.id)
            dispatch(fetchUsersSuccess(users))
        })
        .catch((error) => {
            // error.message is error message
            dispatch(fetchUsersFailed(error.message))
        })
    }
}


const store = createStore(reducer, applyMiddleware(thunkMiddleware))

store.subscribe(() => { console.log(store.getState())})

store.dispatch(fetchUsers())
