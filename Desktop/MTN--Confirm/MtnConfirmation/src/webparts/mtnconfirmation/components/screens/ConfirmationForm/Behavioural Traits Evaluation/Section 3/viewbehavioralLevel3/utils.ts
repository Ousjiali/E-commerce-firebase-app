export const getColor = (status:string) =>{
    if (status === "Confirm") return "green"
    if (status === "Do not Confirm") return "blue"
    if (status === "Defer") return "red"
} 

