import React, { useEffect, useState } from 'react'
import { Card, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { viewProfile } from '../services/allApis';
import { BASE_URL } from '../services/base_url';

function ViewProfile() {
  // create a state to hold particular employee details
  const [employeeDetails,setemployeeDetails]=useState({});

  // use params hook is used to get path parameter of route
  const { id } = useParams()
  console.log(id); //id 

  const getprofile = async()=>{
    // to get particular userdetails
    const {data}= await viewProfile(id)
    console.log(data);
    setemployeeDetails(data)
  }

  useEffect(()=>{
    getprofile()
  },[])
  return (
    <div className='container'>
      <Card className='m-3 shadow'>
        <Card.Body>
          <Row>
            <div className='col'>
              <div className='profile-image d-flex justify-content-center'>
                <img style={{ width: '100px' }}
                  src={`${BASE_URL}/uploads/${employeeDetails.profile}`} />
              </div>
            </div>
          </Row>
          <div className='text-center'>
            <h3 className='fw-bolder mt-2'>{employeeDetails.fname} &nbsp; {employeeDetails.lname}</h3>
            <h5><i class='me-2 fa-solid fa-envelope'></i>{employeeDetails.email}</h5>
            <h5><i class='text-dark me-2 fa-solid fa-mobile'></i>{employeeDetails.mobile}</h5>
            <h5><i class='text-success me-2 fa-solid fa-location-dot'></i>{employeeDetails.location}</h5>
            <h5><i class='text-warning me-2 fa-solid fa-chart-line'></i>{employeeDetails.status}</h5>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default ViewProfile