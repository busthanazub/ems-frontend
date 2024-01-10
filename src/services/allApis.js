
import { commonRequest } from "./commonRequest";
import {BASE_URL} from './base_url'
// register api call

export const empRegister=async(body,headers)=>{
    return commonRequest('POST',`${BASE_URL}/employee/register`,body,headers)
}

// get all employee
export const getEmployees=async(searchKey)=>{
   return commonRequest('GET',`${BASE_URL}/employee/getEmployee?search=${searchKey}`,"",)
}

// paticular employee details
export const viewProfile=(id)=>{
    return commonRequest('GET',`${BASE_URL}/employee/viewprofile/${id}`,"",)
}
// remove employee Details
export const removeEmployee=async(id)=>{
    return commonRequest('DELETE',`${BASE_URL}/employee/deleteEmployee/${id}`,{})
}
// update employee details
export const updateEmployee=async(id,body,headers)=>{
    return await commonRequest('PUT',`${BASE_URL}/employee/updateEmployee/${id}`,body,headers)
}