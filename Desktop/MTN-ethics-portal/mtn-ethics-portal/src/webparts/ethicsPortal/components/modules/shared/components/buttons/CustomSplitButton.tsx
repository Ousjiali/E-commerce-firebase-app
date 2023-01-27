import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { useHistory } from "react-router-dom";
import { PolicyDetail } from "../../../admin/pages/ethics-policies-management/components/PolicyDetailWrapper";
import { ArrowDropUp } from "@material-ui/icons";

export const CustomSplitButton: React.FC<{
  options: PolicyDetail[];
}> = ({ options }) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const history = useHistory();

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    if (options[index].link) {
      history.push(options[index].link);
    } else {
      options[index].click();
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <ButtonGroup variant="contained" color="secondary" ref={anchorRef}>
          <Button
            onClick={handleToggle}
            endIcon={open ? <ArrowDropUp /> : <ArrowDropDownIcon />}
          >
            {options[selectedIndex].text}
          </Button>
        </ButtonGroup>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          style={{
            position: "absolute",
            zIndex: 999,
          }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    id="split-button-menu"
                    style={{
                      width: "100%",
                    }}
                  >
                    {options.map((option, index) => (
                      <MenuItem
                        key={index}
                        selected={index === selectedIndex}
                        onClick={(event) => {
                          handleMenuItemClick(event, index);
                        }}
                      >
                        {option.text}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
};
