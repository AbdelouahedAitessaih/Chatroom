import React,{useContext, useState, useEffect} from 'react';
import { UserContext } from '../../UserContext';
import {Link} from 'react-router-dom';
import RoomList from './RoomList';
import io from 'socket.io-client';
let socket;
const Home = () => {
    const ENDPOINT = 'localhost:5000';
    useEffect(() => {
       socket = io(ENDPOINT);
       return () => {
            socket.emit('disconnect');
            socket.off();
       }
    },[ENDPOINT]);
    const {user, setUser} = useContext(UserContext);
    const [room, setRoom] = useState('');
    const handleSubmit = e => {
        e.preventDefault();
        socket.emit('create-room', room);
        console.log(room);
        setRoom('');
    }
    const rooms = [
      {
        name: "room1",
        _id: "jdejir343",
      },
      {
        name: "room2",
        _id: "jdejiSKD2EKE23",
      },
    ];
    const setAsJohn = ()=>{
        const john = {
            name:'Jhon',
            email: 'Jhom@gmail.com',
            password: '123',
            id: '1'
        }
        setUser(john);
    }

    const setAsTom = ()=>{
        const tom = {
            name:'Tom',
            email: 'Tom@gmail.com',
            password: '456',
            id:'2'
        }
        setUser(tom);
    }
  return (
    <div>
          <div className="row">
              <div className="col s12 m6">
                  <div className="card blue-grey darken-1">
                      <div className="card-content white-text">
                          <span className="card-title">Welcome {user ? user.name: ''}</span>
                          <form onSubmit={handleSubmit}>
                              <div className="row">
                                  <div className="input-field col s12">
                                      <input placeholder="Enter a room name" id="room" type="text" className="validate" value={room} onChange={e => setRoom(e.target.value)} />
                                      <label htmlFor="room">Room</label>
                                  </div>
                              </div>
                              <button className="btn" >Create Room</button>
                          </form>
                      </div>
                      <div className="card-action">
                          <a href="#" onClick={setAsJohn}>Set as John</a>
                          <a href="#"n onClick={setAsTom}>Set as Tom</a>
                      </div>
                  </div>
              </div>
              <div className='col s6 m5 offset-1'>
                <RoomList rooms={rooms} />
              </div>
          </div>
        <Link to={'/chat'}>
        <button>Go to Chat</button>
        </Link>
        

    </div>
  )
}

export default Home