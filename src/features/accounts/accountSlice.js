import { createSlice } from "@reduxjs/toolkit"



const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading: false
}

const accountSlice = createSlice({
    name: 'account',
    initialState: initialStateAccount,
    reducers: {
        deposit(state, action) {
            state.balance += action.payload
        },
        withdraw(state, action) {
            state.balance -= action.payload
        },
        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: {
                        amount, purpose
                    }
                }
            },
            reducer(state, action) {
                if (state.loan > 0) return;
                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.balance += action.payload.amount;
            }
        },
        payLoan(state, action) {
            state.balance -= state.loan;
            state.loan = 0;
            state.loanPurpose = "";
        }
    }
})

export const { withdraw, requestLoan, payLoan } = accountSlice.actions

export function deposit(amount, currency) {

    if (currency === "USD")
        return { type: "account/deposit", payload: amount }
    // Api Call
    return async function (dispatch, getState) {
        const res = await fetch(
            `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`)
        const data = await res.json()
        const convertedAmount = (amount * data.rates['USD']).toFixed(2);
        console.log(convertedAmount)
        //dispatch action
        dispatch({ type: "account/deposit", payload: convertedAmount })
    }
}

export default accountSlice.reducer


