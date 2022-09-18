import React,{useContext} from 'react';
import { UserContext } from '../../UserContext';
import {Link} from 'react-router-dom';

const Home = () => {
    const {user, setUser} = useContext(UserContext);
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
        <h1>Home {JSON.stringify(user)}</h1>
        <button onClick={setAsJohn}>Set as John</button>
        <button onClick={setAsTom}>Set as Tom</button>
        <Link to={'/chat'}>
        <button>Go to Chat</button>
        </Link>
        

    </div>
  )
}

export default Home