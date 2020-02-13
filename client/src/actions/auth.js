import axios from 'axios';
import {setAlert} from './alert';
import {REGISTER_FAIL, REGISTER_SUCCESS} from './actionTypes';

// Register User
export const register = ({userName, firstName, lastName, email,password, confirmPassword}) => async dispatch => {
    const config =  {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({userName, firstName, lastName, email,password, confirmPassword});
    try {
        const res = await axios.post('https://localhost:5000/api/users/', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors)
        {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'error'))
            });
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}