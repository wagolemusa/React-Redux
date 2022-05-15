const redux = require('redux')
const createStore = redux.createStore
const binActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers
const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()
const applyMiddleware = redux.applyMiddleware

// Actons starts here
const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

function orderCake() {
    return{
        type: CAKE_ORDERED,
        payload: 1,
    }
}
function restockCake(qty = 1){
    return {
        type: CAKE_RESTOCKED,
        payload: qty,
    }
}
function orderIceCream(qty = 1){
    return{
        type: ICECREAM_ORDERED,
        payload: qty
    }
}
function restockIceCream(qty = 1){
    return{
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}

 

//  reducer starts here
const  initialIceCreamState = {
   
    numOfIcecream: 20,
}

const initalCakeState = {
    numOfCakes: 10,
}



const cakeReducer = (state = initalCakeState, action) =>{
    switch(action.type){
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        
        case CAKE_RESTOCKED:
            return {
                ...state,
                    numOfCakes: state.numOfCakes + action.payload
            }
        default:
            return state
    }
}

const iceReducer = (state = initialIceCreamState, action) =>{
    switch(action.type){
        case ICECREAM_ORDERED:
            return{
                ...state,
                numOfIcecream: state.numOfIcecream - 1,
            }
        case ICECREAM_RESTOCKED:
            return{
                ...state,
                numOfIcecream: state.numOfIcecream + action.payload,
            }
        default:
            return state
    }
}


const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceReducer
})

// store starts here    

const store = createStore(rootReducer, applyMiddleware(logger))
console.log('Intial state', store.getState())

// store.subscribe(() => console.log('Update state', store.getState()))

const unsubscribe = store.subscribe(() => {}
    // console.log('Update state', store.getState())
)

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(5))

const actions = binActionCreators(
    { orderCake, restockCake,  orderIceCream, restockIceCream}, store.dispatch)

actions.orderCake()
actions.orderCake()
actions.restockCake(5)
actions.orderIceCream()
actions.orderIceCream()

actions.restockIceCream(6)



unsubscribe()
