import React from "react";
import { WriteUpLandingComponent } from "../../components/WriteUpLandingComponent";
import { useParams } from "react-router-dom";

export const WriteUpPage = () => {
  const { sectionId } = useParams();
  return <WriteUpLandingComponent sectionId={sectionId} />;
};
