import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { sp } from "@pnp/sp";
import * as React from "react";
import { Policy } from "../../../../employee/components/PolicyLandingComponent";

type Props = {
  section: Policy;
  onUpdate: React.Dispatch<Policy>;
  label?: string;
  readOnly?: boolean;
};

export const CreateSection: React.FC<Props> = ({
  onUpdate,
  section,
  label = "Create Section",
}) => {
  const [sectionsNew, setSections] = React.useState<Policy[]>([]);

  React.useEffect(() => {
    (async () => {
      const res = await sp.web.lists
        .getByTitle("PolicyConfiguration")
        .items.getAll();
      setSections(res);
    })();
  }, []);

  return (
    <Autocomplete
      id="type"
      freeSolo={false}
      options={sectionsNew}
      fullWidth
      value={section}
      getOptionLabel={(option) => option?.PolicyTitle}
      getOptionSelected={(option, value) => option?.Id === value?.Id}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          margin="normal"
          variant="outlined"
        />
      )}
      onChange={(e, newvalue) => onUpdate(newvalue)}
    />
  );
};
export const PostCreateSection: React.FC<{
  onUpdate: React.Dispatch<PostOptionsInterfacce>;
  section: PostOptionsInterfacce;
  label: string;
}> = ({ onUpdate, section, label = "Create Section" }) => {
  return (
    <Autocomplete
      id="type"
      freeSolo={false}
      options={PostOptions}
      fullWidth
      value={section}
      getOptionLabel={(option) => option?.label}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          margin="normal"
          variant="outlined"
        />
      )}
      onChange={(e, newvalue) => onUpdate(newvalue)}
    />
  );
};
export enum PostSection {
  Did_You_Know = "DYK",
  Eyes_Wide_Open = "EYO",
  Others = "Others",
}
export const PostOptions = [
  {
    label: "Did you know",
    value: PostSection.Did_You_Know,
  },
  {
    label: "Eyes Wide Open",
    value: PostSection.Eyes_Wide_Open,
  },
  {
    label: "Others",
    value: PostSection.Others,
  },
];
export interface PostOptionsInterfacce {
  label: string;
  value: PostSection;
}
