
import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Row } from 'react-bootstrap'
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css'
import { empRegister } from '../services/allApis';
import {useNavigate} from 'react-router-dom'

function Register() {

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

            const response = await empRegister(data,headerConfig)
            console.log(response);
            // navigate to home page
            navigate('/')
        }

    }


    return (
        <div>

            <div className="container my-5">
                <h1 className="text-center">Employee Register Details</h1>
                <Card className="shadow rounded bg-dark">
                    <div className="text-center mx-5 mt-5">
                        <img className='rounded-circle border border-black bg-light' width="180px" src={preview ? preview : "https://cdn0.iconfinder.com/data/icons/management-1/100/business-05-512.png"} alt="" />
                    </div>

                    <Form className="m-3 text-light">
                        <Row>

                            <Form.Group className="col-lg-6 my-2">
                                <Form.Label className="ms-3">First Name</Form.Label>
                                <Form.Control className="rounded" required type="text" placeholder="Enter First Name" name='fname' onChange={userDetails} />
                            </Form.Group>

                            <Form.Group className="col-lg-6 my-2">
                                <Form.Label className="ms-3">Last Name</Form.Label>
                                <Form.Control className="rounded" required type="text" placeholder="Enter Last Name" name='lname' onChange={userDetails} />
                            </Form.Group>

                            <Form.Group className="col-lg-6 my-2">
                                <Form.Label className="ms-3">Email</Form.Label>
                                <Form.Control className="rounded" required type="text" placeholder="Enter Email" name='email' onChange={userDetails} />
                            </Form.Group>

                            <Form.Group className="col-lg-6 my-2">
                                <Form.Label className="ms-3">Phone Number</Form.Label>
                                <Form.Control className="rounded" required type="text" placeholder="Enter Phone Number" name='mobile' onChange={userDetails} />
                            </Form.Group>

                            {/* Gender */}
                            <Form.Group className="col-lg-6 my-2 d-flex align-items-center">
                                <Form.Label className="px-3">Gender:</Form.Label>
                                <Form.Check className="px-3" required type={'radio'} label={'Male'} name='gender' value={'Male'} onChange={userDetails} />
                                <Form.Check className="px-3" required type={'radio'} label={'Female'} name='gender' value={'Female'} onChange={userDetails} />
                            </Form.Group>

                            {/* select  */}
                            <Form.Group className="col-lg-6 my-2">
                                <Form.Label className="ms-1">Select Employee Status</Form.Label>
                                <Select className="text-dark" options={options} onChange={updateStatus} defaultInputValue={status} />
                            </Form.Group>

                            {/* upload photo */}

                            <Form.Group className="col-lg-6 my-2">
                                <Form.Label className="ms-1">Choose a Profile Photo</Form.Label>
                                <Form.Control className="rounded" name="profile" type='file' required onChange={setProfile} />
                            </Form.Group>

                            {/* Location */}
                            <Form.Group className="col-lg-6 my-2">
                                <Form.Label className="ms-3">Enter Your Location</Form.Label>
                                <Form.Control className="rounded" required type="text" placeholder="Employee Location" name='location' onChange={userDetails} />
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

export default Register