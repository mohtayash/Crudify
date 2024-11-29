
import './App.css';
import { EmployeData } from './EmployeData';
import { useEffect, useState } from 'react';

function App() {

  const [data,setData]=useState([]);
  const[Name,setName]=useState('');
  const[email,setEmail]=useState('');
  const[age,setAge]=useState('');
  const[id,setID]=useState(0);
  const[isUpdate,setIsUpdate]=useState(false);

  useEffect(()=>{
    setData(EmployeData)
  },[]);

  const handleEdit=(id)=>{
    const dt=data.filter(item=>item.id==id)
    if(dt!==undefined)
    {
      setIsUpdate(true);
      setID(id);
      setName(dt[0].Name);
      setEmail(dt[0].email);
      setAge(dt[0].age);
    }
  }
  const handleDelete=(id)=>{
   if(id>0)
   {
    if(window.confirm("Are you sure you want to delete the item?")){
    const dt=data.filter(item=>item.id!==id);
    setData(dt);
    }
   }
  }

  const handleSave=(e)=>{
    let error='';
    if(Name==='')
      error+=' name is required , ';
    if(email==='')
      error+='email is required , ';
    if(age==='')
      error+='age is required';

    if(error==''){
      e.preventDefault();
        const dt=[...data]
        const newObject={
          id:EmployeData.length+1,
          Name:Name,
          email:email,
          age:age
        }
        dt.push(newObject);
        setData(dt);
  }
  else{
        alert(error)
      }
  }

  const handleUpdate=()=>{
    const index=data.map((item)=>{
      return item.id
    }).indexOf(id);
    const dt=[...data];
    dt[index].Name=Name;
    dt[index].email=email;
    dt[index].age=age;
    setData(dt);
    handleClear();
  }

  const handleClear=()=>{
    setID(0);
      setName('');
      setEmail('');
      setAge('');
      setIsUpdate(false);
  }
  return (
    <div className="App" style={{margin:'100px'}}>
      <div style={{display:'flex',justifyContent:"space-around",margin:'50px'}}>
      <div>
        <label>Name:
          <input type='text' placeholder='Enter  name' onChange={(e)=>setName(e.target.value)} value={Name}/>
        </label>
      </div>
      <div>
        <label>email:
          <input type='text' placeholder='Enter Email'onChange={(e)=>setEmail(e.target.value)} value={email}/>
        </label>
      </div>
      <div>
        <label>age:
          <input type='number' placeholder='Enter age'onChange={(e)=>setAge(e.target.value)} value={age}/>
        </label>
      </div>
      <div>
        {
          !isUpdate ?
          <button className='btn btn-primary'onClick={(e)=>handleSave(e)}>Save</button>
          :
          <button className='btn btn-primary'onClick={()=>handleUpdate()}>Update</button>
        }
      <button className='btn btn-danger'onClick={()=>handleClear()}>Clear</button>
      </div>
      </div>
    <table className='table table hover' style={{border:'1px solid black'}}>
      <thead>
        <tr>
          <td>Sr no.</td>
          <td>id</td>
          <td>Name</td>
          <td>email</td>
          <td>age</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {
          data.map((item,index)=>{
            return(
              <tr key={index}>
              <td>{index+1}</td>
              <td>{item.id}</td>
              <td>{item.Name}</td>
              <td>{item.email}</td>
              <td>{item.age}</td>
              <td>
                <button className='btn btn-primary'onClick={()=>handleEdit(item.id)}>Edit</button>&nbsp;
                <button className='btn btn-danger'onClick={()=>handleDelete(item.id)}>Delete</button>
              </td>

              </tr>
            )
          })
        }
      </tbody>
    </table>
    </div>
  );
}

export default App;
