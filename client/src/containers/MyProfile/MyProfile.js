import React from 'react';
import OrderTable from '../OrderTable/OrderTable'
import "./MyProfile.css";


export default function MyProfile({id}) { 
  return(
    <OrderTable userId={id}/>
    )
  
};