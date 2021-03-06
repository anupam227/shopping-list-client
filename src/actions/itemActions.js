import axios from 'axios';
import * as actions from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';  


export const getItem = () => dispatch => {
    dispatch(setItemLoading());
    axios.get('https://list-itmes.herokuapp.com/api/items')
    .then(res => 
        dispatch({
            type: actions.GET_ITEMS,
            payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
    })
};

export const addItem = item => (dispatch, getState) => {
    axios.post('https://list-itmes.herokuapp.com/api/items', item, tokenConfig(getState))
    .then(res => dispatch({
        type: actions.ADD_ITEM,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data.message, err.response.status));
    })
};

export const deleteItem = id => (dispatch, getState) => {
    axios.delete(`https://list-itmes.herokuapp.com/api/items/${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: actions.DELETE_ITEM,
        payload: id
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data.message, err.response.status));
    })
};

export const setItemLoading = () => {
    return {
        type: actions.ITEMS_LOADING
    }
}