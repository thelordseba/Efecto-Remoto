import React from 'react';
import './Home.css';
import {useHistory} from 'react-router-dom';


function Home(){

    const history = useHistory();

    const handleOnClickUser = () => { 
        history.push(`/products`) 
    }

    const handleOnClickAdmin = () => {
        history.push(`/admin`) 
    }

    return (
    <div>
        
        <div>
            <button className="buttonUser" onClick={handleOnClickUser}>Usuario</button>
            <button className="buttonAdmin" onClick={handleOnClickAdmin}>Administrador</button>
        </div>

    </div>
    
    
    
    )
}
export default Home;