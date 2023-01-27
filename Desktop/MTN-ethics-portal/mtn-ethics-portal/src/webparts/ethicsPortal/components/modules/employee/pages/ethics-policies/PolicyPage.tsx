import * as React from "react";
import { useParams } from "react-router-dom";
import { PolicyComponent } from "../../components/PolicyComponent";

type Props = {};

export const PolicyPage = (props: Props) => {
  const { sectionId } = useParams();

  if (!sectionId) {
    return <></>;
  }

  return <PolicyComponent sectionId={sectionId} />;
};
