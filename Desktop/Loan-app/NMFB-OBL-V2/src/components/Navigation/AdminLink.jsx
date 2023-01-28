import React, { Fragment, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./styles.module.css";
import { adminLinks } from "./links";
import { FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../../context";

const AdminLink = ({ name, roles }) => {
  const [newItems, setNewItems] = useState({});
  const navigate = useNavigate();

  const toggleHandler = (id) => {
    setNewItems((txt) => ({ ...txt, [id]: !txt[id] }));
  };

  const hasPermission = (roles, allowed) => {
    var registered = false;
    for (var i = 0; i < roles?.length; i++) {
      for (var x = 0; x < allowed?.length; x++) {
        if (roles[i].name === allowed[x]) {
          registered = true;
          break;
        }
      }
    }
    return registered;
  };

  const authCtx = useContext(AuthContext);

  const logout = () => {
    authCtx.logout();
    navigate("/");
  };

  return (
    <>
      <div className={styles.links}>
        <ul>
          {adminLinks.map(
            (item, i) =>
              hasPermission(roles, item?.allowed) && (
                <Fragment key={i}>
                  {item?.children ? (
                    <div className={styles.childContainer}>
                      <li
                        className={
                          name === item?.name ? styles.active : undefined
                        }
                        onClick={() => toggleHandler(i)}
                      >
                        <span to={item.route}>
                          <item.Icon />
                          {item.name}
                        </span>
                      </li>

                      {newItems[i] && (
                        <div className={styles.child}>
                          <ul>
                            {item?.children?.map((child, x) => (
                              <li key={x}>
                                <Link to={child.route}>
                                  <child.Icon />
                                  {child.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    hasPermission(roles, item?.allowed) && (
                      <li
                        key={i}
                        className={
                          name === item?.name ? styles.active : undefined
                        }
                      >
                        <Link to={item.route}>
                          <item.Icon />
                          {item.name}
                        </Link>
                      </li>
                    )
                  )}
                </Fragment>
              )
          )}
          <li>
            <span onClick={logout}>
              <FaSignOutAlt />
              Logout
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminLink;
