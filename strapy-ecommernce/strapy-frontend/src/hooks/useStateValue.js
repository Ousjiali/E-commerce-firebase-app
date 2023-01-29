import { useContext } from "react";
import StateContext from "../context/StateContext";

const useStateValue = () => useContext(StateContext);

export default useStateValue;
