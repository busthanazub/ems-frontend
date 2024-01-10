

import React from 'react'
import { Card, Dropdown, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../services/base_url'
function HomeTable({displayData,handleDelete}) {
    console.log(displayData);
  return (
    <div className='container mt-2'>
        <Row>
            <div className='col'>
                <Card className='align-items-center shadow mb-5'>
                    <Table className=''>
                        <thead>
                        <tr>
                            <th>Reg.No</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Status</th>
                            <th>Profile</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            { displayData.length >= 0? displayData.map((item,index)=>(
                                <tr>
                                <td>{index+1}</td>
                                <td>{item.fname} {item.lname}</td>
                                <td>{item.email}</td>
                                <td>{item.mobile}</td>
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle variant={item.status==="Active"?"success":"danger"} id='dropdown-status'>
                                           {item.status}
                                        </Dropdown.Toggle>
                                    </Dropdown>
                                </td>
                                <td>
                                    <img className='rounded-circle'
                                    style={{width:'100%',
                                height:'70px'}}
                                    src={`${BASE_URL}/uploads/${item.profile}`}/>
                                </td>
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle>
                                            <i className='fa-solid fa-ellipsis-vertical'></i>
                                        </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item>
                                                    <Link to={`view-profile/${item._id}`} style={{
                                                        textDecoration:'none'
                                                    }}>
                                                    <i className='text-success fa-solid fa-eye me-2'></i>
                                                    <span className='text-success fw-bolder'>View</span> 
                                                    </Link>
                                                    
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                    <Link to={`/edit/${item._id}`} 
                                                    style={{
                                                        textDecoration:'none'
                                                    }}>
                                                    <i className=' text-primary fa-solid fa-edit me-2'></i>
                                                    <span className='text-primary fw-bolder'>Edit</span>
                                                    </Link>
                                                    
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={()=>handleDelete(item._id)}>
                                                    <i className= 'text-danger fa-solid fa-trash me-2'></i>
                                                    <span className='text-danger fw-bolder'>Delete</span>
                                                   
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                            )):
                            <tr>Sorry Nothing to Display</tr>
                                
                            }
                        </tbody>
                    </Table>
                </Card>
            </div>
        </Row>
    </div>
  )
}

export default HomeTable