import { Tooltip } from "@material-ui/core";
import { sp } from "@pnp/sp";
import * as React from "react";
import { BsCheck, BsFileEarmarkCheck } from "react-icons/bs";
import swal from "sweetalert";
import "./nomineecard.scss";

const NomineeCard = ({
  checked,
  image,
  name,
  lastName,
  onClick,
  disabled,
  setTest,
  test,
  index,
  voteCount,
  selectedNominees,
  setSelectedNominees,
  id,
  EmployeeID,
}) => {
  const [change, setChange] = React.useState(
    test[index] && test[index].checked
  );
  const voteNow = () => {
    onClick();
    setChange(!change);

    if (change) {
      setSelectedNominees((prev) => {
        return prev.filter((item) => item.id !== id);
      });
      setTest((prev) => {
        prev[index].checked = false;
        return prev;
      });
    } else {
      selectedNominees.push({id,name});
      setTest((prev) => {
        prev[index].checked = true;
        return prev;
      });
    }
  };

  React.useEffect(() => {
    if (voteCount && selectedNominees.length === voteCount) {
      swal("", `You can only select ${voteCount} Nominees`, "error");
    }
  }, [selectedNominees.length, voteCount]);

  return (
    <div className="nomineeCardContainer">
      <div className="cardImage">
        <img src={image} alt="nominee" />
      </div>
      <div className="cardContent">
        <div className="cardContentText">
          <p>{lastName}</p>
          <h1>{name}</h1>
        </div>
        <div className="cardContentButton">
          {change ? (
            <div className="btnSelected" onClick={voteNow}>
              <span>Selected</span>
              <BsCheck />
            </div>
          ) : disabled ? (
            <div className="btnDisabled">Vote</div>
          ) : !voteCount ? (
            <div className="btnDisabled">Vote</div>
          ) : voteCount === selectedNominees.length ? (
            <div className="btnDisabled">Vote</div>
          ) : (
            <div className="btnUnSelected" onClick={voteNow}>
              Vote
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NomineeCard;
