import {
  Button,
  createStyles,
  FormControl,
  InputAdornment,
  makeStyles,
  OutlinedInput,
  Theme,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import * as React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { height: "30px" },
    input: {
      backgroundColor: theme.palette.common.white,
      borderRadius: "10px",
      border: "none",
      outline: "none",
      padding: "10px 15px",
      boxSizing: "border-box",
      "&:hover": {
        border: "none",
        outline: "none",
      },
    },
  })
);

export const NavigationSearch: React.FC<{
  query?: string;
  setQuery?: (q: string) => void;
}> = ({ query, setQuery }) => {
  const classes = useStyles();
  return (
    <FormControl
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "0.5rem",
      }}
      className={classes.root}
    >
      <OutlinedInput
        defaultValue={query}
        placeholder="search..."
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <Button>Search</Button>
          </InputAdornment>
        }
        onChange={(e) => {
          e.preventDefault();
          setQuery(e.target.value);
        }}
        className={classes.input}
      />
    </FormControl>
  );
};
