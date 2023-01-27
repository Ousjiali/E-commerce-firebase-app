import { Box } from "@material-ui/core";
import * as React from "react";
import { AdminWrapper } from "../../../../shared/components/app-wrapper/admin/AdminWrapper";
import { PolicyDetailWrapper } from "../components/PolicyDetailWrapper";
import { useParams } from "react-router-dom";
import { sp } from "@pnp/sp";
import { Policy } from "../../../../employee/components/PolicyLandingComponent";
import { useQuery } from "@tanstack/react-query";
import { ReadOnlyURLSearchParams } from "../../policies/ManagePoliciesPage";
import { useLocation } from "react-router-dom";
import { WebContext } from "../../../../../EthicsPortal";
import { LandingPage } from "../modals/LandingPageModal";
import { UpdatePolicyContentPage } from "../../policies/UpdatePolicyPage";
import { CreatePolicy } from "../../policies/CreatePolicy";
import { PolicyTrainingPage } from "../../training/PolicyTrainingPage";
import { CreatePostInPolicy } from "../../posts/CreatePostInPolicy";

export const PolicyDetailPage = () => {
  const { context } = React.useContext(WebContext);
  const { search } = useLocation();
  const searchParams = React.useMemo(
    () => new URLSearchParams(search) as ReadOnlyURLSearchParams,
    [search]
  );
  const { policyId } = useParams();
  const [policyTitle, setPolicyTitle] = React.useState<Policy>();
  const [posts, setPosts] = React.useState([]);
  const [policies, setPolicies] = React.useState([]);
  const [trainings, setTrainings] = React.useState([]);
  const [content, setContent] = React.useState<any>();
  const { isLoading } = useQuery(
    ["policyWriteUps", policyId, searchParams.get("section")],
    async () =>
      await sp.web.lists
        .getByTitle("Post")
        .items.select(
          "PostTitle, Created, FileUrl, Id, ID, SectionId/ID, SectionId/PolicyTitle"
        )
        .expand("SectionId")
        .filter(`SectionId eq '${policyId}'`)
        .getAll(),
    {
      onSuccess(data) {
        setPosts(data);
      },
      onError(err) {
        console.log(err);
      },
    }
  );
  const policyQueries = useQuery(
    ["policyPage", policyId, searchParams.get("section")],
    async () =>
      await sp.web.lists
        .getByTitle("Policies")
        .items.select(
          "PolicyTitle, Created, Id, content, ID, SectionId/ID, SectionId/PolicyTitle, FileUrl"
        )
        .expand("SectionId")
        .filter(`SectionId eq '${policyId}'`)
        .getAll(),

    {
      onSuccess(data) {
        setPolicies(data);
      },
      onError(err) {
        console.log(err);
      },
    }
  );
  const trainingQueries = useQuery(
    [
      "trainings-policies",
      policyId,
      searchParams.get("section"),
      searchParams.get("filter"),
    ],
    async () =>
      await sp.web.lists
        .getByTitle("Training")
        .items.filter(`Category eq '${searchParams.get("filter")}'`)
        .getAll(),
    {
      onSuccess(data) {
        setTrainings(data);
      },
      onError(err) {
        console.log(err);
      },
    }
  );

  React.useEffect(() => {
    if (!policyId) return;
    (async () => {
      const res: Policy = await sp.web.lists
        .getByTitle("PolicyConfiguration")
        .items.getById(policyId)
        .get();
      if (res.Content) {
        let con = JSON.parse(res.Content);
        con = con?.data;
        setContent(con);
      }
      setPolicyTitle(res);
    })();
  }, [policyId]);

  return (
    <AdminWrapper>
      <PolicyDetailWrapper
        policy={policyTitle}
        id={policyId}
        content={content}
        setContent={setContent}
      >
        <Box>
          {(() => {
            if (searchParams.get("section") === "policyPage") {
              if (policyQueries.isLoading) return <></>;

              if (policies[policies.length - 1]?.ID) {
                return (
                  <UpdatePolicyContentPage
                    context={context}
                    sectionId={policyId}
                    policyId={policies[policies.length - 1]?.ID}
                  />
                );
              }
              return (
                <Box>
                  <CreatePolicy context={context} />
                </Box>
              );
            }
            if (searchParams.get("section") === "landingPage") {
              return (
                <LandingPage
                  policy={policyTitle}
                  content={content}
                  setContent={setContent}
                />
              );
            }
            if (searchParams.get("section") === "trainingPage") {
              return (
                <PolicyTrainingPage
                  isLoading={trainingQueries.isLoading}
                  trainings={trainings}
                />
              );
            }
            return (
              <CreatePostInPolicy
                isLoading={isLoading}
                posts={posts}
                policyId={policyId}
              />
            );
          })()}
        </Box>
      </PolicyDetailWrapper>
    </AdminWrapper>
  );
};
