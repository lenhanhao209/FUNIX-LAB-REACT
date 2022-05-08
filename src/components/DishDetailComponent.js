import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Label,
  Input,
} from "reactstrap";
import { Control, Errors, LocalForm } from "react-redux-form";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

const DishDetail = ({ dishes, comments }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggle = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleSubmit = () => {
    if (name === "" || commentsVal === "") {
      alert("Please import infor");
      return;
    } else toggle();
  };

  const [name, setName] = useState("");
  const [commentsVal, setCommentsVal] = useState("");

  const { id } = useParams();

  let dish = dishes.find((dish) => dish.id == id);

  comments = comments.filter((comment) => comment.dishId == id);

  const renderDish = (dish) => {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100%" src={"/" + dish.image} value={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  };

  const renderComments = (comments) => {
    if (comments != null) {
      return (
        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
          <ul className="list-unstyled">
            {comments.map((comment) => {
              return (
                <li key={comment.id}>
                  <p>{comment.comment}</p>
                  <p>
                    -- {comment.author},{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(new Date(Date.parse(comment.date)))}
                  </p>
                </li>
              );
            })}
          </ul>
          <Button color="secondary" onClick={toggle}>
            <i className="fa fa-pencil"></i>Submit Comment{" "}
          </Button>
          <Modal isOpen={isModalOpen}>
            <ModalHeader onClick={toggle}>
              <h3>Submit Comment</h3>
            </ModalHeader>
            <ModalBody>
              <LocalForm onsubmit={handleSubmit}>
                <Row className="form-group">
                  <Label className="mt-3" htmlFor="select" md={2}>
                    Rating
                  </Label>
                  <Col md={10}>
                    <Input className="mt-3" type="select" name="select">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Input>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="name" md={2}>
                    Name
                  </Label>
                  <Col md={10}>
                    <Control.text
                      model=".name"
                      id="name"
                      name="name"
                      placeholder=""
                      className="form-control"
                      validators={{
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(15),
                      }}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Errors
                      className="text-danger"
                      model=".name"
                      show="touched"
                      messages={{
                        required: "Required",
                        minLength: "Must be greater than 2 characters",
                        maxLength: "Must be 15 characters or less",
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label className="mt-3" htmlFor="comment">
                    Comment
                  </Label>
                  <Col md={12}>
                    <Input
                      className="mt-3"
                      type="textarea"
                      name="comment"
                      onChange={(e) => setCommentsVal(e.target.value)}
                    />
                  </Col>
                </Row>
                <Button
                  onClick={handleSubmit}
                  color="primary"
                  className="mt-3 mb-3"
                >
                  Submit
                </Button>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  return dish ? (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
        </Breadcrumb>
        {renderDish(dish)}
        {renderComments(dish.comments)}
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default DishDetail;
