import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : 'user',
    initialState : {
        id: 0,
        name: '',
        email: '',
        role: '',
        items : [],  // Ids of books which are added to cart
        grandTotal : 0
    },
    reducers : {
        setUserData(state, action) {
            state.id = action.payload.id;
            state.name = action.payload.firstName;
            state.email = action.payload.email;
            state.role = action.payload.role;
            console.log("User value added...");
        },
        initializeCart(state, action) {
            return {
                ...state,
                items: action.payload
            }
        },
        add(state, action) {
            state.items.push(action.payload);
            console.log("Added in redux..");
        },
        update(state, action) {
            console.log("Updated");
            return {
                ...state,
                items : state.items.map(item => {
                    if(item.id===action.payload.id){
                        return {
                            ...item,
                            quantity: action.payload.count
                        };
                    }
                    else return item;
                })
            }
        },
        remove(state, action) {
            console.log("removing for : ", action.payload);
            const temp = state.items;
            console.log("Temp : ", temp);
            return {
              ...state,
              items: state.items.filter((item) => item.id !== action.payload),
            };
        },
        grandTotal(state, action) {
            let gt = 0;
            state.items.map(item=>gt+=item.price*item.quantity);
            console.log("Grand Total");
            return {
                ...state,
                grandTotal: gt
            }
        }
    }
})

export const { setUserData, initializeCart, add, update, remove, grandTotal } =
  userSlice.actions;
export default userSlice.reducer;