import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Component/Header'
import { useLocation } from 'react-router-dom';

function Edit() {

    const [title,setTitle]=useState("")
    const [dep,setDep]=useState("")
    const [record,setRecord]=useState([])

    let location=useLocation()

    useEffect(()=>{
        setTitle(location.state.title);
        setDep(location.state.dep)
    },[location])

    

    useEffect(()=>{
        let data=JSON.parse(localStorage.getItem('course')) || [];
        setRecord(data);
    },[])

    const hanlde = (e) =>{
        e.preventDefault()

        if(!title || !dep){
            toast.error("all fields is required...")
            return false;
        }

        let up=record.map((val)=>{
            if(val.id == location.state.id){
                val.title=title,
                val.dep=dep;
            }
            return val
        })
        localStorage.setItem('course',JSON.stringify(up));
        setRecord(up);
        toast.success("Your Data is Successfully Updated...");
        setTitle("");
        setDep("");
    }
    return (
        <div>
            <Header />

            <div className="container" style={{margin:"80px 55px",color:"white"}}>
                <div className="row">
                    <div className="col-lg-6 mx-auto">

                        <form onSubmit={hanlde} className=' p-5 shadow' style={{border:"1px solid black"}}>
                            <div className="mb-3">
                                <label  className="form-label" style={{fontSize:"20px"}}>First Name</label>
                                <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} value={title}  />
                              
                            </div>
                            <div className="mb-3 mt-5">
                                <label  className="form-label" style={{fontSize:"20px"}}>Last Name </label>
                                <input type="text" className="form-control" onChange={(e) => setDep(e.target.value)} value={dep}  />
                            </div>
                        
                            <button type="submit" className="btn mx-auto d-block btn-dark mt-5">Update</button>
                        </form>

                    </div>
                </div>
            </div>
            <ToastContainer
position="top-right"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition: Bounce
/>
        </div>
    )
}

export default Edit
