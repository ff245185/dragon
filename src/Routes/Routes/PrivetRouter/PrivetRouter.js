import React from 'react';
import { useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const PrivetRouter = ({children}) => {
   const {user, loder} = useContext(AuthContext);
   const location = useLocation()
if (loder) {
    return  <Spinner animation="border" variant="primary" />
}
   if (!user) {
    return <Navigate to="/login" state={{from : location}} replace></Navigate>
   }
   return children;
};

export default PrivetRouter;