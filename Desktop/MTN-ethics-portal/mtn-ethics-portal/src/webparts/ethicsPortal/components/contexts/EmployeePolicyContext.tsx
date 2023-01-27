import { sp } from "@pnp/sp";
import * as React from "react";
import { Policy } from "../modules/employee/components/PolicyLandingComponent";

interface PolicyContextType {
  policies: Policy[];
}

const PolicyContext = React.createContext<PolicyContextType | null>(null);

export const PolicyContextProvider = ({ children }) => {
  const [policies, setPolicies] = React.useState<Policy[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const res = await sp.web.lists
          .getByTitle("PolicyConfiguration")
          .items.getAll();
        setPolicies(res);
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, []);

  return (
    <PolicyContext.Provider
      value={{
        policies,
      }}
    >
      {children}
    </PolicyContext.Provider>
  );
};

export const policyContextData = () => {
  const data = React.useContext(PolicyContext);
  return {
    ...data,
  };
};
