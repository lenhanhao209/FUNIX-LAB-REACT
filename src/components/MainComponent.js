/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import DishDetail from "./DishDetailComponent";
import Menu from "./MenuComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "bootstrap/dist/css/bootstrap.min.css";

const Main = () => {
  const dishes = useSelector((state) => state.dishes);
  const comments = useSelector((state) => state.comments);
  const leaders = useSelector((state) => state.leaders);
  const location = useLocation();
  return (
    <div>
      <Header />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="page" timeout={300}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route exact path="/menu" element={<Menu />} />
            <Route
              exact
              path="/menu/:id"
              element={<DishDetail dishes={dishes} comments={comments} />}
            />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/about" element={<About leaders={leaders} />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </div>
  );
};
export default Main;
