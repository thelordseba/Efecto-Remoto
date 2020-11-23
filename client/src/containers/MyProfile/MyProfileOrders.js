import React from 'react';
import OrderTable from '../OrderTable/OrderTable'

export default function MyProfileOrders({id}) { 
    return (<OrderTable userId={id}/>)
    
};