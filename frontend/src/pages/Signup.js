import React, { useState, useContext, useEffect, useRef } from "react";
import { Button, Card, Form, Nav, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import UseModal from "../components/UseModal";
import { UserContext } from "../UserContext";

const Signup = () => {
  const [user, setUser] = useContext(UserContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if (user.isLoggedin) {
      navigate("/dashboard");
    }
    return () => {};
  }, [user]);

  const handleSignup = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log(event.target);
    try {
      let newUser = {
        name: event.target[0].value,
        email: event.target[1].value,
        phone: event.target[2].value,
        account: event.target[3].checked === true ? "company" : "investor",
        password: event.target[5].value,
      };
      console.log(newUser);

      let response = await fetch(
        `http://localhost:5000/api/signup/${newUser.account}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        }
      ).then((res) => res.json());
      console.log(response);
      if (!!response.message) {
        throw new Error(response.message);
      } else {
        setUser({
          ...response,
          isLoggedin: true,
        });
      }
    } catch (error) {
      console.log(error);
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
            <h2 className="text-center">Signup</h2>
            <Form className="m-3" onSubmit={handleSignup}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" required></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" required></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" required></Form.Control>
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
                <Form.Control type="password" required></Form.Control>
              </Form.Group>
              <Button variant="success" type="submit">
                Signup
              </Button>
            </Form>
          </Card>
        </>
      )}
    </>
  );
};

export default Signup;
