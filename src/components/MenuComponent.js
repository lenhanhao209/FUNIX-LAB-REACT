import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchDishes } from "../redux/ActionCreators";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import useFetch from "./useFetch";

const RenderMenuItem = ({ dish }) => {
  return (
    <Card>
      <Link to={`/menu/${dish.id}`}>
        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
        <CardImgOverlay>
          <CardTitle>{dish.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
};

const Menu = () => {
  const dishes = useSelector((state) => state.dishes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const menu = dishes.dishes.map((item) => {
    return (
      <div key={item.id} className="col-12 col-md-5 m-1">
        <Link to={`/menu/${item.id}`}>
          <Card>
            <CardImg src={baseUrl + item.image} alt={item.name} />
            <CardImgOverlay>
              <CardTitle>{item.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </Link>
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Menu</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>Menu</h3>
          <hr />
        </div>
      </div>
      {dishes.isLoading ? <Loading /> : <div className="row">{menu}</div>}
    </div>
  );
};

export default Menu;
