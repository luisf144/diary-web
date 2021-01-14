import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from '../components/Spinner/Spinner';
import {auth} from '../actions/user.actions';

export default (Component, needAuth, adminRoute = null) => {
    function AuthenticationCheck(props) {
        const user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                if(!response.payload.isAuth) {
                    if(needAuth) {
                        props.history.push('/login');
                    }
                } else {
                    if(adminRoute && !response.payload.isAdmin) {
                        props.history.push('/');
                    } 

                    if(!localStorage.getItem('userId')){
                        localStorage.setItem('userId', response.payload.id)
                    }
                }
            })
        }, []);
        
        return(
            <>
                { user.loading ? <Spinner/> : <Component {...props} user={user} />}
            </>
        ); 
    }
    return AuthenticationCheck;
}
