
import {FETCH_SEARCH_ITEMS,FETCH_NOTIFICATIONS,
    ADD_NEW_NOTIFICATION,REG_ERR,REG_SUCC,AUTH_EMAIL_ERR,AUTH_OTHER_ERR,AUTH_PASSWORD_ERR,LOADING_REQ,FINISHING_REQ,AUTH_USER} from './types';

import axios from 'axios';
import {browserHistory} from 'react-router';
const BASE_URL = 'http://172.20.10.4:8000/api';


export function searchItems(query){
    return (dispatch) =>{
      //  dispatch({type:LOADING_REQ})
                dispatch({type:FETCH_SEARCH_ITEMS,payload:[{name:'1',place:'1'},{name:'2',place:'2'},{name:'3',place:'3'},{name:'4',place:'4'}]})
            }
}

export function submitItem(item){
    return (dispatch) =>{
        console.log(item);
    }
  
}

export function fetchNotifications(){
    return (dispatch) =>{
                  dispatch({type:FETCH_NOTIFICATIONS,payload:[{userName:'1',itemName:'1'},{userName:'2',itemName:'2'},{userName:'3',itemName:'3'},{userName:'4',itemName:'4'}]});
              }
}

export function fetchNewNotification(notification){
    return (dispatch) =>{
        dispatch({type:ADD_NEW_NOTIFICATION,payload:notification})
    }
}


export function Register(data){
    const URL = BASE_URL+'/auth/register';
    const req = axios.post(URL,data);
    console.log(data);

    return (dispatch) =>{
       // dispatch({type:LOADING_REQ})
        req.then( 
            (res)=>{
                console.log(res);
                dispatch({type:REG_SUCC});
              }
      
      ).catch(
              (e)=>{
               
                  if(e.response.data.errors){
                    dispatch({type:REG_ERR});
                     }
                     
              }
          )
      
        }
  
}

export function LogInUser(data){
    const URL = BASE_URL+'/auth/login';
    const req = axios.post(URL,data);
    return (dispatch) =>{
        dispatch({type:LOADING_REQ})
        req.then(
            (res)=>{
                localStorage.setItem('token', res.data.access_token);
                browserHistory.push('/');
                 dispatch({type:AUTH_USER});

            }
        ).catch((res)=>{
           let  errors = res.response.data.errors;
           if(errors){
                console.log(res.response.data);
                if(errors.email){
                    dispatch({type:AUTH_OTHER_ERR,payload:''})
                    dispatch({type:AUTH_EMAIL_ERR,payload:errors.email})
                }
                if(errors.password){
                    dispatch({type:AUTH_OTHER_ERR,payload:''})
                    dispatch({type:AUTH_PASSWORD_ERR,payload:errors.password})
                }
           }
            else{
                dispatch({type:AUTH_PASSWORD_ERR,payload:''})
                dispatch({type:AUTH_EMAIL_ERR,payload:''})
                dispatch({type:AUTH_OTHER_ERR,payload:res.response.data.error})
            }
        }).then(()=>{
            dispatch({type:FINISHING_REQ})
        })
    }
}