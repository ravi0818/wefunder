import React, { useState, useContext, useEffect } from "react";
import { Button, Card, Form, Nav, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import UseModal from "../components/UseModal";
import { UserContext } from "../UserContext";

const Login = () => {
  const [user, setUser] = useContext(UserContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loginMode, setLoginMode] = useState(true);
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if (user.isLoggedin) {
      navigate("/dashboard");
    }
    return () => {};
  }, [user]);
  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const account = event.target[1].checked ? "company" : "investor";
      let newStudent = {
        email: event.target[0].value,
        password: event.target[3].value,
      };
      // console.log(newStudent);
      let response = await fetch(`http://localhost:5000/api/login/${account}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      }).then((res) => res.json());
      console.log(response);
      if (!!response.message) {
        console.log(response);
        throw new Error(response.message);
      } else {
        console.log("setIsLoading");
        setIsLoading(false);
        console.log("setUser");
        setUser({
          ...response,
          isLoggedin: true,
        });
      }
    } catch (error) {
      console.log("setIsLoading");
      setIsLoading(false);
      setError(error);
    }
  };

  const handleShow = () => {
    setError((prev) => !prev);
  };
  return (
    <>
      {!!error && (
        <UseModal
          show={!!error}
          handleShow={handleShow}
          title="Alert"
          body={error.message}
          buttonName="Understood"
          buttonHandle={handleShow}
        />
      )}
      {isLoading ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <Card className="mx-auto my-5 py-3" style={{ width: "40rem" }}>
            <h2 className="text-center">Login</h2>
            <Form className="m-3" onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text"></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Account type</Form.Label>
                <br></br>
                <Form.Check
                  inline
                  name="accountType"
                  type="Radio"
                  label="Company"
                  required
                ></Form.Check>
                <Form.Check
                  inline
                  name="accountType"
                  type="Radio"
                  label="Investor"
                  required
                ></Form.Check>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"></Form.Control>
              </Form.Group>
              <Button variant="success" type="submit">
                Login
              </Button>
            </Form>
          </Card>
        </>
      )}
    </>
  );
};

export default Login;
