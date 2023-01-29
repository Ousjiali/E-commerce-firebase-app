import React, { useState } from "react";
import "./Categories.scss";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";

const Categories = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalNew, setOpenModalNew] = useState(false);

  return (
    <div className="categories">
      <div className="col">
        <div className="row">
          <img
            src="https://images.pexels.com/photos/818992/pexels-photo-818992.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
          <button>
            <Link className="link" to="/products">
              Sales
            </Link>
          </button>
        </div>
        <div className="row">
          <img
            src="https://images.pexels.com/photos/2036646/pexels-photo-2036646.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
          <button>
            <Link to="/product/women" className="link">
              Women
            </Link>
          </button>
        </div>
      </div>
      <div className="col">
        <div className="row">
          {" "}
          <img
            src="https://images.pexels.com/photos/1813947/pexels-photo-1813947.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
          <button
            onClick={() => {
              setOpenModalNew(true);
            }}
          >
            {/* <Link to="/products/1" className="link"> */}
            New Season
            {/* </Link> */}
          </button>
        </div>
        {openModalNew && (
          <Modal
            onClose={() => setOpenModalNew(false)}
            isVisible={true}
            size="md"
            content={
              <div style={{ marginBottom: "70px" }}>
                <h3>Product</h3>
                <h3>Coming Soon!!!</h3>
              </div>
            }
          />
        )}
      </div>
      <div className="col col-l">
        <div className="row">
          <div className="col">
            <div className="row">
              <img
                src="https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <button>
                <Link to="/product/men" className="link">
                  Men
                </Link>
              </button>
            </div>
          </div>
          <div className="col">
            <div className="row">
              {" "}
              <img
                src="https://images.pexels.com/photos/2703202/pexels-photo-2703202.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <button>
                <Link to="/product/kids" className="link">
                  Kids
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <img
            src="https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
          <button
            onClick={() => {
              setOpenModal(true);
            }}
          >
            {/* <Link to="/products/1" className="link"> */}
            Shoes
            {/* </Link> */}
          </button>
        </div>
        {openModal && (
          <Modal
            onClose={() => setOpenModal(false)}
            isVisible={true}
            size="md"
            content={
              <div style={{ marginBottom: "70px" }}>
                <h3>Product</h3>
                <h3>Coming Soon!!!</h3>
              </div>
            }
          />
        )}
      </div>
    </div>
  );
};

export default Categories;
