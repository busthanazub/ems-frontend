
import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Row } from 'react-bootstrap'
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css'
import { updateEmployee } from '../services/allApis';
import {useNavigate, useParams} from 'react-router-dom'
import { viewProfile } from '../services/allApis';
import { BASE_URL } from '../services/base_url';
function Edit() {
  const [existingData,setExistingData]= useState('')
  const [employeeData,setEmployeeDetails] = useState({})

  // get parameter from url
  const {id} = useParams()
  console.log(id);
  // get details of groupid from server
  
  console.log(employeeData);

  // navigate to home page
  const navigate = useNavigate()
  //create state to hold profile 
  const [preview, setPreview] = useState("")

  //create state for hold images
  const [image, setImage] = useState("")

  const setProfile = (event) => {
      setImage(event.target.files[0]);
  }
  console.log(image);

  //create a state to hold user input data
  const [userData, setUserData] = useState({
      fname: "",
      lname: "",
      email: "",
      mobile: "",
      gender: "",
      location: ""
  })

  //create a state for status
  const [status, setStatus] = useState("Active")
  //to update status
  const updateStatus = (ev) => {
      console.log(ev.value);
      setStatus(ev.value)
  }

  
  //update user data when user enter the input using html
  const userDetails = (e) => {
      console.log(e);
      const { name, value } = e.target
      setUserData({ ...userData, [name]: value })
  }
  console.log(userData);
// use effect
useEffect(()=>{
  getProfile()
},[id])

  // useEffect
  useEffect(() => {
      if (image) {
          setPreview(URL.createObjectURL(image))
      }
  }, [image])

  const options = [
      { value: 'Active', label: 'Active' },
      { value: 'Inactive', label: 'Inactive' }
  ]
  const getProfile=async()=>{
            // api call to get particular profile
            const {data} = await viewProfile(id)
            console.log(data);//details of the profile
            setUserData(data)
            setExistingData(data.profile)
          }

  const handleSubmit = async(e) => {

      e.preventDefault()  //preventDefaults stops reloading

      const { fname, lname, email, mobile, gender, location } = userData

      if (fname == "") {
          toast.error('Enter Your First Name', {
              position: toast.POSITION.TOP_CENTER,
              className: 'toast-error'
          });
      }
      else if (lname == "") {
          toast.error('Enter Your Last Name', {
              position: toast.POSITION.TOP_CENTER,
              className: 'toast-error'
          });
      }
      else if (email == "") {
          toast.error('Enter Your Email', {
              position: toast.POSITION.TOP_CENTER,
              className: 'toast-error'
          });
      }
      else if (gender == "") {
          toast.error('Select Your Gender', {
              position: toast.POSITION.TOP_CENTER,
              className: 'toast-error'
          });
      }
      else if (location == "") {
          toast.error('Enter Your Location', {
              position: toast.POSITION.TOP_CENTER,
              className: 'toast-error'
          });
      }
      else {
          // toast.success('Registered Successfully', {
          //     position: toast.POSITION.TOP_CENTER,
          //     className: 'toast-success'

          // }
          // )
          // header config
          
          const headerConfig={
              'Content-Type':"multipart/form-data"

          }
          // body - form data
          const data = new FormData()
          data.append("user_profile",image)
          data.append("fname",fname)
          data.append("lname",lname)
          data.append("email",email)
          data.append("mobile",mobile)
          data.append("status",status)
          data.append("gender",gender)
          data.append("location",location)
          // api call

          const response = await updateEmployee(id,data,headerConfig);
          console.log(response);
          if(response.status == 200)
          {
              // navigate to home page
              navigate('/')
              toast.success("Update Successfully",{
                className:'toast message2'
              })

          }
      }

  }

  return (
    <div>

        <div className="container my-5">
            <h1 className="text-center">Employee Register Details</h1>
            <Card className="shadow rounded bg-dark">
                <div className="text-center mx-5 mt-5">
                    <img className='rounded-circle border border-black bg-light' width="180px" src={preview ? preview : `${BASE_URL}/uploads/${existingData}`} alt="" />
                </div>

                <Form className="m-3 text-light">
                    <Row>

                        <Form.Group className="col-lg-6 my-2">
                            <Form.Label className="ms-3">First Name</Form.Label>
                            <Form.Control className="rounded" required type="text" placeholder="Enter First Name" name='fname' onChange={userDetails} value={userData.fname} />
                        </Form.Group>

                        <Form.Group className="col-lg-6 my-2">
                            <Form.Label className="ms-3">Last Name</Form.Label>
                            <Form.Control className="rounded" required type="text" placeholder="Enter Last Name" name='lname' onChange={userDetails} value={userData.lname} />
                        </Form.Group>

                        <Form.Group className="col-lg-6 my-2">
                            <Form.Label className="ms-3">Email</Form.Label>
                            <Form.Control className="rounded" required type="text" placeholder="Enter Email" name='email' onChange={userDetails} value={userData.email} />
                        </Form.Group>

                        <Form.Group className="col-lg-6 my-2">
                            <Form.Label className="ms-3">Phone Number</Form.Label>
                            <Form.Control className="rounded" required type="text" placeholder="Enter Phone Number" name='mobile' onChange={userDetails} value={userData.mobile} />
                        </Form.Group>

                        {/* select  */}
                        <Form.Group className="col-lg-6 my-2">
                            <Form.Label className="ms-1">Select Employee Status</Form.Label>
                            <Select className="text-dark" options={options} onChange={updateStatus} defaultInputValue={status} value={userData.status} />
                        </Form.Group>

                        {/* upload photo */}

                        <Form.Group className="col-lg-6 my-2">
                            <Form.Label className="ms-1">Choose a Profile Photo</Form.Label>
                            <Form.Control className="rounded" name="profile" type='file' required onChange={setProfile} />
                        </Form.Group>

                        {/* Location */}
                        <Form.Group className="col-lg-6 my-2">
                            <Form.Label className="ms-3">Enter Your Location</Form.Label>
                            <Form.Control className="rounded" required type="text" placeholder="Employee Location" name='location' onChange={userDetails} value={userData.location} />
                        </Form.Group>

                        {/* Submit Button */}
                        <div className="submit text-center">
                            <Button onClick={handleSubmit} className="my-3 form-control rounded">Submit</Button>
                            <ToastContainer />
                        </div>
                    </Row>
                </Form>

            </Card>

        </div>

    </div>
)
}

export default Edit