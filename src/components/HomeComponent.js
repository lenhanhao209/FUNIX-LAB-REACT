import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchDishes, fetchPromos } from "../redux/ActionCreators";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

const RenderCard = ({ item }) => {
  console.log(item);
  return (
    <Card>
      <CardImg src={baseUrl + item.image} alt={baseUrl + item.name} />
      <CardBody>
        <CardTitle>{item.name}</CardTitle>
        {item.designation ? (
          <CardSubtitle>{item.designation}</CardSubtitle>
        ) : null}
        <CardText>{item.description}</CardText>
      </CardBody>
    </Card>
  );
};

const Home = (props) => {
  const dishes = useSelector((state) => state.dishes);
  const promotions = useSelector((state) => state.promotions);
  console.log(promotions);
  const leaders = useSelector((state) => state.leaders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDishes());
    dispatch(fetchPromos());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          {dishes.isLoading ? (
            <Loading />
          ) : dishes.errMess ? (
            <div>{dishes.errMess} </div>
          ) : (
            <RenderCard item={dishes.dishes[0]} />
          )}
        </div>
        <div className="col-12 col-md m-1">
          {promotions.isLoading ? (
            <Loading />
          ) : promotions.errMess ? (
            <div>{promotions.errMess} </div>
          ) : (
            <RenderCard item={promotions.promotions[0]} />
          )}
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard item={leaders[0]} />
        </div>
      </div>
    </div>
  );
};

export default Home;
