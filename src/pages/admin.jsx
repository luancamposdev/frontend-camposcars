import React, { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Image,
  Nav,
  Table,
  Button,
  Modal,
  Form,
  ProgressBar,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

import { api } from "../service/api";
import { useRouter } from "next/router";

export default function Administration() {
  const [cars, setCars] = useState([]);
  const fileInput = React.createRef();
  const [fullscreen, setFullscreen] = useState(true);
  const [progress, setProgress] = useState(true);
  const [show, setShow] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const { register, handleSubmit, setValue, getValues } = useForm();

  const route = useRouter();
  async function fetchData() {
    const data = JSON.parse(localStorage.getItem("camposcar"));
    if (data === null) return route.push("/");
    const response = await api.get("/cars", {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });

    if (response.status !== 200) return route.push("/");

    setCars(response.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Deseja excluir esse carro?",
        text: "Esta ação não pode ser desfeita",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          (async () => {
            await api.delete(`/cars/${id}`);

            swalWithBootstrapButtons.fire(
              "Excluído",
              "Carro excluído com sucesso",
              "success"
            );

            fetchData();
          })();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
        }
      });
  };

  const handleShow = (breakpoint) => {
    setValue("id", "");
    setValue("name", "");
    setValue("brand", "");
    setValue("model", "");
    setValue("price", "");

    setFullscreen(breakpoint);
    setShow(true);
  };

  const handleEdit = (car) => {
    handleShow("xxl-down");
    // setSelectedCar(car)
    setValue("id", car.id);
    setValue("name", car.name);
    setValue("brand", car.brand);
    setValue("model", car.model);
    setValue("price", car.price);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    for (var key in data) {
      formData.append(key, data[key]);
    }

    if (fileInput.current.files[0] !== undefined) {
      formData.append(
        "avatar",
        fileInput.current.files[0],
        fileInput.current.files[0].name
      );
    }

    setProgress(0);
    setShowProgress(true);

    const id = getValues("id");

    if (id) {
      await api.put(`/cars/${id}`, formData, {
        onUploadProgress: (ProgressEvent) => {
          const progress = Math.round(
            (ProgressEvent.loaded / ProgressEvent.total) * 100
          );
          setProgress(progress);

          if (progress === 100) {
            setShowProgress(false);
            setShow(false);
          }

          fetchData();
        },
      });
    } else {
      await api.post("/cars", formData, {
        onUploadProgress: (ProgressEvent) => {
          const progress = Math.round(
            (ProgressEvent.loaded / ProgressEvent.total) * 100
          );
          setProgress(progress);

          if (progress === 100) {
            setShowProgress(false);
            setShow(false);
          }

          fetchData();
        },
      });
    }
  };

  return (
    <React.Fragment>
      <Navbar bg="dark" collapseOnSelect expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <Image src="/images/logocamposcar.svg" alt="Logo" fluid />
          </Navbar.Brand>
          <div className="ms-auto">
            <Button className="me-2" onClick={() => handleShow("xxl-down")}>
              Adicionar Carro
            </Button>
            <Navbar.Brand>Área Administrativa</Navbar.Brand>
          </div>
        </Container>
      </Navbar>

      <Table responsive striped bordered hover size="md">
        <thead>
          <tr>
            <th></th>
            <th>Nome</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Preço</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td className="text-center">
                <img src={car.avatar} alt={car.name} width="80" height="80" />
              </td>
              <td>{car.name}</td>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.price}</td>

              <td>
                <div className="d-flex align-items-center justify-content-center">
                  <Button
                    variant="outline-primary"
                    onClick={() => handleEdit(car)}
                  >
                    {<FaPencilAlt />}
                  </Button>{" "}
                  <Button
                    variant="outline-primary"
                    onClick={() => handleDelete(car.id)}
                  >
                    {<FaTrash />}
                  </Button>{" "}
                </div>
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
          {showProgress && <ProgressBar now={progress} />}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("id")} />
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Digite o nome do Carro</Form.Label>
              <Form.Control
                {...register("name")}
                type="text"
                placeholder="Digite o Nome do Carro"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Digite a marca do carro</Form.Label>
              <Form.Control
                {...register("brand")}
                type="text"
                placeholder="Marca do Carro"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Digite a modelo do carro</Form.Label>
              <Form.Control
                {...register("model")}
                type="text"
                placeholder="Modelo do Carro"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Digite a Preço do carro</Form.Label>
              <Form.Control
                {...register("price")}
                type="number"
                placeholder="Preço do Carro"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Carregue aqui a foto do carro</Form.Label>
              <Form.Control
                ref={fileInput}
                type="file"
                placeholder="Foto do seu Carro"
                multiple
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {getValues("id") ? "Alterar" : "Cadastrar"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
