import React from "react";
import {
  Container,
  Carousel,
  Card,
  Row,
  Col,
  Image,
  Badge,
} from "react-bootstrap";

import { api } from "../../service/api";

const Main = () => {
  const [cars, setCars] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const response = await api.get("/cars");

      setCars(response.data);
    }
    fetchData();
  }, []);

  return (
    <>
      <Carousel>
        <Carousel.Item>
          <Image
            style={{ marginTop: "-30px" }}
            className="d-block w-100"
            src="/images/strada.svg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Strada</h3>
            <p>Strada Fiat Touro</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            style={{ marginTop: "-30px" }}
            className="d-block w-100"
            src="/images/civictouring.svg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Honda Civic</h3>
            <p>Civic Touring 2021</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            style={{ marginTop: "-30px" }}
            className="d-block w-100"
            src="/images/city.svg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Honda City</h3>
            <p>City 2022 Touring</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container>
        <Row xs={1} md={3} className="g-4">
          {cars.map((car) => (
            <Col key={car.id}>
              <Card>
                <Card.Img variant="top" src={car.avatar} />
                <Card.Body>
                  <Card.Title>
                    {car.brand} - {car.name}
                  </Card.Title>
                  <Card.Text>
                    {car.model} <Badge bg="secondary">Novo</Badge>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    {car.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </small>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Main;
