import React from "react";
import styles from "./styles.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { FaChevronCircleLeft } from "react-icons/fa";
const Header = ({ name = "" }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.header}>
      {/* Page Title */}

      <div className={styles.pageTitle}>
        <FaChevronCircleLeft onClick={() => navigate(-1)} />
        {name}
      </div>
      {/* Search Container */}
      <div className={styles.search}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search"
            // value={search}
            // onChange={handleChange}
            // onClick={onClick}
            size="large"
          />
          {/* {renderAutocomplete()} */}
        </div>
        <AiOutlineSearch />
      </div>
    </div>
  );
};

export default Header;
