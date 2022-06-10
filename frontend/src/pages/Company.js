import React, { useState, useEffect, useContext } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

import { FaBuilding, FaUser } from "react-icons/fa";

const Company = () => {
  const [user, setUser] = useContext(UserContext);
  const [company, setCompany] = useState({ name: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      let response;
      try {
        response = await fetch(`http://localhost:5000/api/company`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: id }),
        }).then((res) => res.json());
        console.log(response);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      } finally {
        setCompany(response);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  const handleInvest = async (event) => {
    event.preventDefault();
    if (!user.isLoggedin) {
      navigate("/Login");
    }
    setIsLoading(true);
    let response;
    const tempUser = user;

    tempUser.investedIn.push({
      name: company.name,
      amount: event.target[0].value,
    });
    try {
      response = await fetch(`http://localhost:5000/api/updateuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tempUser),
      }).then((res) => res.json());
    } catch (err) {
      setIsLoading(false);
      console.log(error);
    } finally {
      setUser(response);
      setIsLoading(false);
      navigate("/dashboard");
    }
  };
  return (
    <>
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
        <div className="bg-white">
          <div className="container">
            <div className="p-4"></div>
            <h1 className="text-center">{company.name}</h1>
            <div className="row">
              <div className="col-lg-4">
                <div className="p-5 text-center bg-info h-100">
                  <FaBuilding size={120} />
                  <div className="py-5">
                    <h2 className="p-2">{company.name}</h2>
                    <p>{company.email}</p>
                    <p>+91 {company.phone}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 text-white row bg-secondary">
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="d-flex justify-content-between">
                      <h2 className="text-info">Invest Now</h2>
                    </div>

                    <div>
                      <div className="py-3">
                        <h3>{company.name}</h3>
                        <p>{company.tagline}</p>
                      </div>
                      <div className="py-3">
                        <h5>About Us</h5>
                        <p>{company.description}</p>
                      </div>
                      <div className="py-3">
                        <h6>Min investment</h6>
                        <p>{company.mininvest}$</p>
                        <h6>Target amount</h6>
                        <p> {company.target}$</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 my-auto">
                  <div className="p-5 h-100">
                    <Form onSubmit={handleInvest}>
                      <Form.Group>
                        <Form.Label>Enter Amount</Form.Label>
                        <Form.Control />
                      </Form.Group>
                      <Button className="btn btn-success my-3" type="submit">
                        Invest
                      </Button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Company;
