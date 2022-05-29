import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { restocked, ordered } from './icecreamSlice'

const IcecreamView = () => {
   
    const [value, setValue] = React.useState(1)
    const numOfIcecream = useAppSelector((state) => state.icecream.numOfIcecreams)
    const dispatch = useAppDispatch()
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


