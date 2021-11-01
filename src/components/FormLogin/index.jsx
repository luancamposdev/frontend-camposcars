import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Offcanvas, Form } from "react-bootstrap";
import { api } from "../../service/api";
import Swal from "sweetalert2";
import { authContext } from "../../pages/_app";

export default function OffCanvasLogin({ name, ...props }) {
  const { camposcar, setCamposCar } = useContext(authContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/sessions", data);
      const userData = response.data;

      localStorage.setItem("camposcar", JSON.stringify(userData));

      setCamposCar(userData);
    } catch (error) {
      if (error.response) {
        Swal.fire("Erro ao Logar no sistema", error.response.error, "error");
      }
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2">
        {name}
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Faça Login no Sistema</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Digite seu E-mail</Form.Label>
              <Form.Control
                defaultValue=""
                {...register("email")}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Digite sua Senha</Form.Label>
              <Form.Control
                defaultValue=""
                {...register("password")}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Entrar
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
