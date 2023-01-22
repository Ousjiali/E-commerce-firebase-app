// const errorCheck = (error) => {
//  if (error.response && error.response.data) {
//   const errorcode =  error.response.data.details

//  } else{
//    error.response.data.message;
//  }
  
  
// };

// const payloadError = {
//   message: "Bad request syntax or unsupported method",
//   details: { student_id: ["This field may not be blank."] },
// };

// console.log(errorCheck(payloadError));


/**
 * summary: always return the relevant error message
 * check if there is an error.response.data
 * check if details are in error.response.data
 * if details not in error.response.data, return error.response.data.message
 * if details in error.response.data iterate through key, values in details
 * return structured key, values
 */

