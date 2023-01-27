import React from "react";
import { ReadOnlyURLSearchParams } from "../../admin/pages/policies/ManagePoliciesPage";
import { useLocation } from "react-router-dom";
import { ResourcesDisplayComponent } from "./resources/ResourcesDisplayComponent";
import { TrainingCategoryEnum } from "../../admin/pages/training/enums/TrainingCategoryEnum";
import { sp } from "@pnp/sp";
import { Policy } from "./PolicyLandingComponent";

export const EthicsResourceDisplayPage = ({ match }) => {
  const { search } = useLocation();
  const searchParams = React.useMemo(
    () => new URLSearchParams(search) as ReadOnlyURLSearchParams,
    [search]
  );

  const [filter, setFilter] = React.useState("");
  const [policy, setPolicy] = React.useState<Policy>();

  React.useEffect(() => {
    setFilter(searchParams.get("section"));
  }, [searchParams.get("section")]);

  React.useEffect(() => {
    sp.web.lists
      .getByTitle("PolicyConfiguration")
      .items.getById(match.params.id)
      .get()
      .then((item) => {
        setPolicy(item);
      });
  }, [match.params.id]);

  return (
    <ResourcesDisplayComponent
      filter={filter as TrainingCategoryEnum}
      backgroundImage={policy?.ImageUrl}
      pageTitle={`${filter} Resources `}
    />
  );
};
