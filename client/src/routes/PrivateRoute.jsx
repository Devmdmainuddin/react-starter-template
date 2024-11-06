import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const PrivateRoute = ({children}) => {
   const {user,loading}=useAuth()
   const location = useLocation()
   
   if(loading) return <LoadingSpinner />
   if(user) return children
   
    return <Navigate to='/login' state={location.state} replace='true'/>
};

PrivateRoute.propTypes = {
    children: PropTypes.node,
  }
export default PrivateRoute;