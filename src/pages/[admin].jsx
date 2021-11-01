import { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Image,
  Nav,
  Table,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { api } from "../service/api";

import { FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa";

function Administration() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get("/cars");

      setCars(response.data);
    }
    fetchData();
  }, []);

  const values = ["xxl-down"];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, brand, model, price, avatar } = data;

    await api.post("/cars", { name, brand, model, price, avatar });
  };
  return (
    <>
      <Navbar bg="dark" collapseOnSelect expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <Image src="/images/logocamposcar.svg" alt="Logo" fluid />
          </Navbar.Brand>

          <Navbar.Collapse
            className="justify-content-end"
            id="responsive-navbar-nav"
          >
            <Navbar color="dark" variant="dark">
              <Nav className="me-auto ml-sm"></Nav>
            </Navbar>
          </Navbar.Collapse>
          <Button className="me-2" onClick={() => handleShow("xxl-down")}>
            Adicionar Carro
          </Button>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Brand>Área Administrativa</Navbar.Brand>
        </Container>
      </Navbar>

      <Table striped bordered hover size="md">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Preço</th>
            <th>Foto</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.name}</td>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.price}</td>
              <td>{car.avatar}</td>
              <td>
                <Button variant="outline-primary">{<FaPencilAlt />}</Button>{" "}
                <Button variant="outline-primary">{<FaTrash />}</Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionanr Carros</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Digite o nome do Carro</Form.Label>
              <Form.Control
                defaultValue=""
                {...register("name")}
                type="text"
                placeholder="Digite o Nome do Carro"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Digite a marca do carro</Form.Label>
              <Form.Control
                defaultValue=""
                {...register("brand")}
                type="text"
                placeholder="Marca do Carro"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Digite a modelo do carro</Form.Label>
              <Form.Control
                defaultValue=""
                {...register("model")}
                type="text"
                placeholder="Modelo do Carro"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Digite a Preço do carro</Form.Label>
              <Form.Control
                defaultValue=""
                {...register("price")}
                type="text"
                placeholder="Preço do Carro"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Carregue aqui a foto do carro</Form.Label>
              <Form.Control
                defaultValue=""
                {...register("avatar")}
                type="file"
                placeholder="Foto do seu Carro"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Cadastrar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Administration;
