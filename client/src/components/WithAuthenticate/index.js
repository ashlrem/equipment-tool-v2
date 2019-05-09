import { useEffect } from 'react';
import { useDispatch } from 'redux-react-hook';
import axios from 'axios';
import * as actions from '../../constants/action_types';

async function authenticate(dispatch) {
    const token = localStorage.getItem('token');

    if (!!token) {
        try{
            const requestBody = {
                query: `
                   query {
                       verifyToken(token: "${token}") {
                        username
                       }
                   }
                `
            }

            const { data } = await axios.post('http://localhost:5000/graphql', requestBody);

            const user = await data.data.verifyToken;

            if (user) {
                const { username } = await data.data.verifyToken;

                dispatch({
                    type: actions.SET_AUTH_USER,
                    authUser: {
                        username: user.username,
                    }
                })

            }else {
                dispatch({ type: actions.SET_AUTH_USER, authUser: null });
                localStorage.removeItem('token');
            }

        }catch(e){
            dispatch({ type: actions.SET_AUTH_USER, authUser: null });
        }
    }else {
        dispatch({ type: actions.SET_AUTH_USER, authUser: null });
    }

}


function useWithAuthenticate() {
    const dispatch = useDispatch();
    useEffect(() => {
        authenticate(dispatch);
    })
}

export default useWithAuthenticate;