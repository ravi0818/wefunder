import React, { useState, useEffect, useContext } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

import { FaEdit, FaUser } from "react-icons/fa";

const Dashboard = () => {
  const [user, setUser] = useContext(UserContext);
  const [company, setCompany] = useState({ name: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const run = () => {
      console.log(user);
      if (!user.isLoggedin) {
        navigate("/");
      }
    };
    run();
    setIsLoading(true);
    const fetchData = async () => {
      let response;
      try {
        response = await fetch(`http://localhost:5000/api/company`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
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
    if (user.account === "company") fetchData();
    else {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      <div className="bg-white">
        <div className="container">
          <h2 className="text-center p-3">Welcome, {user.name}!</h2>
          <div className="row text-white">
            <div className="col-lg-4">
              <div className="p-5 text-center bg-info rounded-3 h-100">
                <FaUser size={120} />
                <div className="py-5">
                  <h2 className="p-2">{user.name}</h2>
                  <p>{user.email}</p>
                  <p>+91 {user.phone}</p>
                </div>
              </div>
            </div>
            {user.account === "investor" && (
              <div className="col-lg-8">
                <div className="p-4 text-center bg-secondary rounded-3  h-100">
                  <h2>Invested in</h2>
                  <div className="row text-dark ">
                    {user.investedIn.map((el) => {
                      return (
                        <div className="col-lg-3">
                          <Card
                            bg="white"
                            // text="primary"
                            className="mx-auto text-left my-3 p-3"
                            // style={{ backgroundColor: "#fefae0" }}
                          >
                            <Card.Header>
                              <div className="d-flex justify-content-between">
                                {el.name}
                              </div>
                            </Card.Header>
                            <Card.Body>
                              <Card.Title className="text-limit">
                                Amount: {el.amount}
                              </Card.Title>
                              <Card.Text></Card.Text>
                            </Card.Body>

                            <Button
                              className="btn btn-light mx-2"
                              onClick={() => navigate(`company/${el.email}`)}
                            >
                              Invest More
                            </Button>
                          </Card>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {user.account === "company" && (
              <div className="col-lg-8">
                <div className="p-5 bg-secondary rounded-3">
                  <div className="d-flex justify-content-between">
                    <h2 className="text-info">Raise Fund</h2>
                    <button
                      className="btn btn-lg text-warning"
                      onClick={() => navigate("/update")}
                    >
                      <FaEdit />
                    </button>
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
                    <div className="">
                      <h6>Fund raise</h6>
                      <p>
                        {company.fundraise === false ? "Disabled" : "Enabled"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="p-4"></div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
