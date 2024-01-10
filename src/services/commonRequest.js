// import axios
import axios from 'axios'
import { resolvePath } from 'react-router-dom';

export const commonRequest = async(method,url,body,header)=>{
    let config = {
        method,
        url,
        headers:header?header:{
            'Content-Type':"application/json"
        },
        data:body

    }
    // request instance 
    return axios(config).then(response=>{
        console.log(response);
        return response
    })
    .catch(err=>{
        console.log(err);
        return err
    })
}