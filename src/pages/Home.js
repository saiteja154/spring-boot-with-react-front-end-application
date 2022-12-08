import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [users,setUsers]=useState([]);

    useEffect(()=>{
        loadUser();
       
            console.log("hii");
    },[])

   const loadUser=async()=>{
    const result=await axios.get("http://localhost:8080/users");
    console.log(result.data);
    setUsers(result.data);
   }
   const deleteUser= async(id)=>{
    await axios.delete(`http://localhost:8080/users/${id}`)
    loadUser();

   }

  return (
    <div className="container">

        <div className='py-4'>

<table class="table border shadow table-striped">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Username</th>
      <th scope="col">Email</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
{
        users.map( (user,index) => (

                <tr>
                <th scope="row" key={index} >{index+1}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                    <Link className="btn btn-primary mx-2" to={`/viewuser/${user.id}`}> View </Link>
                    <Link className="btn btn-outline-primary mx-2"    
                    to={`/edituser/${user.id}`} 
                    > Edit </Link>

                    <button className="btn btn-danger mx-2" onClick={ () => {deleteUser(user.id)}}> Delete </button>

                </td>
                </tr>
        ))

    }
  </tbody>
</table>

        </div>
    </div>
  )
}

export default Home;