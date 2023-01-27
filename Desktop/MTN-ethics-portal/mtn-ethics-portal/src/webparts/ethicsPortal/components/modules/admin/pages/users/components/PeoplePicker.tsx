import { TextField } from "@material-ui/core";
import { PrincipalSource, PrincipalType, sp } from "@pnp/sp";
import { Autocomplete } from "@material-ui/lab";
import * as React from "react";

type Props = {
  staff: StaffData;
  onUpdate: React.Dispatch<StaffData>;
  label: string;
  style?: React.CSSProperties;
};

export const PeoplePicker: React.FC<Props> = ({
  staff,
  onUpdate,
  label,
  style,
}) => {
  const [users, setUsers] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    sp.utility
      .searchPrincipals(
        search,
        PrincipalType.User,
        PrincipalSource.All,
        "",
        100
      )
      .then((principal) => {
        setLoading(false);
        setUsers(principal);
      });
  }, [search]);

  return (
    <Autocomplete
      id="type"
      freeSolo={false}
      options={users?.map((user: StaffData) => {
        return {
          ...user,
        };
      })}
      fullWidth
      value={staff}
      getOptionLabel={(option) => option?.DisplayName}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          margin="normal"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="medium"
          style={style}
        />
      )}
      onChange={(e, newvalue) => onUpdate(newvalue)}
    />
  );
};

export interface StaffData {
  Email: string;
  Department?: string;
  DisplayName: string;
}
