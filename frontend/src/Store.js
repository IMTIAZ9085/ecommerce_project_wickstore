import {createContext, useReducer} from 'react'

export const Store = createContext();

const initialstate = {
      cart:{
            cartItems: [],
      }
}

function reducer(state,action){
      switch(action.type){
            case 'CART_ADD_ITEM':
            //taking the new cart item by user
            const newItem = action.payload;
            //then checking if they are already present or not in the cart item list
            const existItem = state.cart.cartItems.find(
                  (item)=>item._id=== newItem._id
            )
            //if present the we are replacing that with the same one with increased quantity
            //or if not there then enlist it 
            const cartItems = existItem
            ? state.cart.cartItems.map((item)=>
                  item._id===existItem._id ? newItem : item)
                  : [...state.cart.cartItems,newItem];

            return {...state,cart:{...state.cart,cartItems}};
            //ADD TO CART FUNCTION
            // return {...state,
            //       cart:{
            //             ...state.cart,
            //             cartItems:[...state.cart.cartItems, action.payload],
            //       },
            // };
            default:
                  return state;
      }
}

export function StoreProvider(props){
      const [state,dispatch] = useReducer(reducer,initialstate);
      const value = {state, dispatch};
      
      return <Store.Provider value={value}>{props.children}</Store.Provider>
}