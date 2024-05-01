import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {behaviorPlugin} from "@testing-library/user-event/dist/keyboard/types";
import {RootState} from "../app/Store";


interface LoggedInType {
    loggedIn: boolean | null;
}

const initState: LoggedInType = {loggedIn: null};

const loggedInSlice = createSlice({
    name: "loggedIn",
    initialState: initState,
    reducers: {
        updateLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.loggedIn = action.payload;
        }
    }
})


export const loggedInSelector = (state: RootState) => state.loggedIn.loggedIn;

export const loggedInReducer = loggedInSlice.reducer;
export const {updateLoggedIn} = loggedInSlice.actions;
