import axios from 'axios'

const TOKEN = 'TOKEN'

const initState = {
    token: ''
}

export function user(state=initState,action){
    switch(action.type){
        case TOKEN :
            return {...state,token:action.payload}
        default:
            return state
    }
}

function saveToken(obj){
    const token  = obj
    return { type: TOKEN,payload:token}
}

export function getToken(data){
    return dispatch=>{
        axios.get('/getToken').then(res=>{
            if(res.status === 200 && res.data.code === 0) {
                // this.setState({
                //     token: res.data.token
                // })
                dispatch(saveToken(res.data.token))
            }
        })
    }
}