import React,{useState,useEffect} from 'react';
import { db } from '../firebase';

function Home() {
  const [userData, setUserData] = useState({
    device:'',temperature:'',email:'',user:''
  })
  const [userValue,setUserValue] = useState([])

const postUserData = (e) => {
 var name = e.target.name;
 var value = e.target.value;
setUserData({...userData, [name]:value})
}
  const AddDetails = async (e) => {

    db.ref().child("userdetails").push(userData)

  }
  useEffect(()=> {
    db.ref().child("userdetails").on('value',data=> {
        const getData=Object.values(data.val( ))
        setUserValue(getData)
    })
  },[])

  console.log(userValue)
  
//   const rows = props.userValue.map((row, index) => {
//     return (
//       <tr key={index}>
//         <td>{row.battery}</td>
//         <td>{row.temperature}</td>
//       </tr>
//     );
//   });

  
  return (
    <div className="center container" style={{maxWidth:'500px'}}>
     <h3>Add details</h3>
     <div className='input fields'>
      <input type='text' name='user' value={userData.user} placeholder='user' onChange={postUserData}/>
      <input type='text' name='email' value={userData.email} placeholder='email' onChange={postUserData}/>
      <input type='text' name='device' value={userData.device} placeholder='device' onChange={postUserData}/>
      <input type='text'name='temperature'  value={userData.temperature} placeholder='temperature' onChange={postUserData}/>
     </div>
     <button className='btn blue' onClick={AddDetails}>Add</button>
     {/* <div>
        {userValue.map((valData,i)=>
        <p key={i}>{valData}</p>
        )}
     </div> */}

     
     
     <ul className="collection">
        <table>
        <thead>
          <tr>
              <th>User</th>
              <th>Email</th>
              <th>Device</th>
              <th>Temperature</th>
          </tr>
        </thead>
        <tbody>
        {userValue.map((valData,i)=>
      <tr className="collection-item" key={i}>
        <td>{valData.user}</td>
        <td>{valData.email}</td>
        <td>{valData.device}</td>
        <td>{valData.temperature}</td>
        
        </tr>

         )}
        </tbody>
        </table>
       
     
    </ul>
    {/* <table>
      <tbody>{rows}</tbody>
    </table> */}
    </div>
  );
}

export default Home;
