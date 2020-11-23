import React from 'react';
import OrderTable from '../OrderTable/OrderTable'


export default function MyProfile({id}) { 
  return(
    <OrderTable userId={id}/>
    )
  
};