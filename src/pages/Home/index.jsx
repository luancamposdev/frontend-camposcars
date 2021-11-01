import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Container,
  Navbar,
  Nav,
  Image,
  Dropdown,
} from "react-bootstrap";

import useRouter from "next/router";

import OffCanvasLogin from "../../components/FormLogin";
import { authContext } from "../../pages/_app";
import Main from "../../components/Main";

const Home = () => {
  const [userData, setUserData] = useState();
  const { camposcar, setCamposCar } = useContext(authContext);

  useEffect(() => {
    setUserData(camposcar);
    if (localStorage.getItem("camposcar") !== null) {
      setUserData(JSON.parse(localStorage.getItem("camposcar")));
    }
  }, [camposcar]);

  const route = useRouter;

  function handleClick() {
    route.push("/admin");
  }

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
            {userData !== undefined ? (
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-button-dark-example1"
                  variant="secondary"
                >
                  {userData.user.name}
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dark">
                  <Dropdown.Item active onClick={handleClick}>
                    Administração
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Navbar.Text>
                <OffCanvasLogin placement="end" name="Entrar" />
              </Navbar.Text>
            )}
          </Navbar.Collapse>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        </Container>
      </Navbar>

      <Main />
    </>
  );
};

export default Home;
