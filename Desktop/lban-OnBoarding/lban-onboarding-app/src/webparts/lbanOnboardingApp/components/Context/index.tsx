import * as React from "react";
import { createContext, useContext, useState } from "react";

interface FormContextType {
  userData: any;
  bioData: any;
  profilePhoto: any;
  setProfilePhoto: any;
  employeeName: any;
  setEmployeeName: any;
  employeeEmail: any;
  setEmployeeEmail: any;
  bankData: any;
  setBankData: any;
  emergencyData: any;
  setEmergencyData: any;
  confidentialityData: any;
  setConfidentialityData: any;
  guarantorData: any;
  setGuarantorData: any;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
  setBioData: React.Dispatch<React.SetStateAction<any>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  nextPage: () => void;
  prevPage: () => void;
}

const FormContext = createContext<FormContextType | null>(null);

export function UseFormContextProvider({ children }) {
  const [userData, setUserData] = useState<any>();
  const [bioData, setBioData] = useState<any>();
  const [employeeName, setEmployeeName] = useState<any>();
  const [employeeEmail, setEmployeeEmail] = useState<any>();
  const [bankData, setBankData] = useState<any>();
  const [profilePhoto, setProfilePhoto] = useState<any>();
  const [emergencyData, setEmergencyData] = useState<any>();
  const [confidentialityData, setConfidentialityData] = useState<any>();
  const [guarantorData, setGuarantorData] = useState<any>();
  const [page, setPage] = useState(0);

  const nextPage = () => {
    if (page === 5) return;
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setPage((prev) => prev - 1);
  };
  return (
    <FormContext.Provider
      value={{
        employeeEmail,
        setEmployeeEmail,
        employeeName,
        setEmployeeName,
        profilePhoto,
        setProfilePhoto,
        userData,
        setUserData,
        setBioData,
        setPage,
        page,
        nextPage,
        prevPage,
        bioData,
        bankData,
        setBankData,
        emergencyData,
        setEmergencyData,
        confidentialityData,
        setConfidentialityData,
        guarantorData,
        setGuarantorData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContextData() {
  const data = useContext(FormContext);
  return { ...data };
}
