import React, { useState, useEffect, useContext } from "react";
import { Card, Spinner, Button, Carousel, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Home = () => {
  const [user, setUser] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let response = await fetch("http://localhost:5000/api/companies").then(
        (res) => res.json()
      );
      console.log(response);
      setCompanies(response);
      setIsLoading(false);
    };
    fetchData();

    return () => {};
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col my-auto">
              <div className="p-5 text-white">
                <h1>Invest in founders building the future</h1>
                <p>
                  Invest as little as $100 in the startups and small businesses
                  you believe in.
                </p>
                <button
                  className="btn btn-warning"
                  onClick={() => navigate("/login")}
                >
                  JOIN WEFUNDER
                </button>
              </div>
            </div>
            <div className="">{}</div>
          </div>
        </div>
        <div className="">
          <div className="bg-light row p-5">
            <h2>Invest Now</h2>
            {companies.map((el) => {
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
                      <Card.Title className="text-limit">TagLine</Card.Title>
                      <Card.Text>Description</Card.Text>
                    </Card.Body>

                    <Button
                      className="btn btn-light mx-2"
                      onClick={() => navigate(`company/${el.email}`)}
                    >
                      Invest
                    </Button>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
