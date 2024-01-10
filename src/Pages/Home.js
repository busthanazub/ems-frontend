
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import HomeTable from '../Components/HomeTable'
import { useNavigate } from 'react-router-dom'
import { getEmployees } from '../services/allApis';
import { removeEmployee } from '../services/allApis';

function Home() {

  // state to hold search data
  const [searchKey, setSearchKey] = useState("")
  console.log(searchKey);

  // define a getallemployee api

  // state for holding all employees details
  const [allEmployees, setAllEmployees] = useState([])

  //  define a function to call get all employees api
  const getEmployeesDetails = async () => {
    const serverResponse = await getEmployees(searchKey)
    console.log(serverResponse.data);
    setAllEmployees(serverResponse.data)
  }

  console.log(allEmployees); //array of employee
  useEffect(() => {
    getEmployeesDetails()

  }, [searchKey])
  const navigate = useNavigate()


  const addUser = () => {
    // navigated to register
    navigate('/register')
  }
  const deleteEmployee = async(id)=>{
    console.log("inside deleteEmployee Function");
    // api calling delete employee
    const res = await removeEmployee(id)
    console.log(res);
    if(res.status === 200){
      // data successfully deleted
      getEmployeesDetails()
      alert("employee deleted successfully")
    }
    else{
      console.log("error");
    }
  }
  return (
    <div style={{
      minHeight: '600px'
    }}>
      <div className='one'>
        <div className='search_add d-flex justify-content-between'>
          {/* search */}
          <div className='search'>
            <Form className='d-flex my-3'>
              <Form.Control
                required
                type='text' placeholder='Search Employee'
                onChange={e => setSearchKey(e.target.value)}
              />
            </Form>
          </div>
          <div className='add m-5'>
            <Button onClick={addUser}>Add</Button>
          </div>
        </div>

      </div>
      <div className='two'>
        <HomeTable displayData={allEmployees} 
        handleDelete={deleteEmployee}
        />
      </div>
    </div>
  )
}

export default Home