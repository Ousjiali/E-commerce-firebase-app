import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { LandingPage } from "./screens/Home/LandingPage";
import { CreateAccount } from "./screens/Home/CreateAccount";
import { PostAd } from "./screens/PostAd";
import { DetalisPostAd } from "./screens/DetailsPostAd";
import React, { useContext, useReducer } from "react";
import { AuthContext } from "./context/AuthContext";
import { UseContextProvider } from "./context/PostAdContext";
import GetSellerDetails from "./screens/BuyerPage.js/GetSellersDetails";
import ViewSellerPage from "./screens/BuyerPage.js/ViewSellerPage";
import ProductById from "./screens/BuyerPage.js/ViewSellerPage/ProductById";
import HomePage from "./screens/Home/HomePage/HomePage";
import Products from "./screens/Products/Products";
import Product from "./screens/Product/Product";
import { WomenCategory } from "./screens/WomenCategory/WomenCategory";
import { MenCategory } from "./screens/MenCategory/MenCategory";
import { KidsCategory } from "./screens/KidsCategory/KidsCategory";
import { Provider } from "./context/StateContext";
import { cartSlice, initialState } from "../src/redux/cartReducer";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";

function App() {
  const { currentUser } = useContext(AuthContext);

  // const RequireAuth = ({ children }) => {
  //   return currentUser ? children : <Navigate to="/" />;
  // };

  console.log(currentUser);

  // const dispatch = useDispatch()

  React.useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
      } else {
      }
    });
  }, []);

  const stateWithDispatch = useReducer(cartSlice, initialState);
  const [, dispatch] = stateWithDispatch;

  return (
    <UseContextProvider>
      <Provider value={stateWithDispatch}>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" exact element={<HomePage />} />
              {/* <Route path="/" exact element={<ViewSellerPage />} /> */}
              <Route path="/login" exact element={<LandingPage />} />
              <Route path="/products" exact element={<Products />} />
              <Route path="/create/account" exact element={<CreateAccount />} />
              <Route
                path="/create/postad"
                exact
                element={
                  // <RequireAuth>
                  <PostAd />
                  // </RequireAuth>
                }
              />
              <Route path="/details/postad" exact element={<DetalisPostAd />} />

              {/* buyer details */}
              <Route
                path="/buyer/register/page/:id"
                exact
                element={<GetSellerDetails />}
              />

              <Route
                path="/view/product/details/:id"
                exact
                element={<Product />}
              />

              <Route
                path="/view/product/details"
                exact
                element={<ProductById />}
              />

              <Route path="/product/women" exact element={<WomenCategory />} />
              <Route path="/product/men" exact element={<MenCategory />} />
              <Route path="/product/kids" exact element={<KidsCategory />} />
            </Routes>
          </Router>
        </div>
      </Provider>
    </UseContextProvider>
  );
}

export default App;
