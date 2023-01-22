// import { Redirect, Route } from "react-router-dom";
// import React, { useState, useEffect } from 'react'
// import { useSelector, useDispatch } from "react-redux";
// function ProtectedRoute({ child, ...rest}) {
//     const [isAuthenticated,setIsAuthenticated] = useState(false)

//     const dispatch = useDispatch();

//     const userLogin = useSelector((state) => state.userLogin);
//     const { userInfo } = userLogin;

//   useEffect(() => {
//     if (userInfo) {
//       setIsAuthenticated(true)
//     }
//   }, [userInfo, dispatch]);



//     console.log(isAuthenticated);
  
//     return (
//       <Route
//         {...rest}
//         render={({ location }) => {
//             return isAuthenticated ? child : <Redirect to={{
//                 pathname: '/login',
//                 state: { from: location }
//               }} />
//           }} 
//       />
//     );
//   }
  
//   export default ProtectedRoute;