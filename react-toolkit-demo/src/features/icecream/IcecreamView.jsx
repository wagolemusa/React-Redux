import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { restocked, ordered } from './icecreamSlice'

const IcecreamView = () => {
   
    const [value, setValue] = React.useState(1)
    const numOfIcecream = useSelector((state) => state.icecream. numOfIcecreams)
    const dispatch = useDispatch()
    return(
        <div>
            <h2>Number of Ice cream - {numOfIcecream}</h2>
            <button onClick={() => dispatch(ordered())}>Order of cake</button>
            <input
                type='number'
                value={value}
                onChange={(e) => setValue(parseInt(e.target.value))}
            />
            <button onClick={() => dispatch(restocked(value))}>Restock cakes</button>
        </div>
    )
}
export default IcecreamView


