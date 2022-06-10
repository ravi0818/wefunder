import { useContext, useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const UpdateCompany = () => {
  const [user, setUser] = useContext(UserContext);
  const [company, setCompany] = useState({ name: "" });
  const [isLoading, setIsLoading] = useState(false);
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
    fetchData();
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (!user.isLoggedin) {
      navigate("/Login");
    }
    setIsLoading(true);
    let response;
    const tempCompany = company;

    tempCompany.tagline = event.target[0].value;
    tempCompany.description = event.target[1].value;
    tempCompany.target = event.target[2].value;
    tempCompany.mininvest = event.target[3].value;
    tempCompany.fundraise = event.target[4].checked ? true : false;
    try {
      response = await fetch(`http://localhost:5000/api/updatecompany`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tempCompany),
      }).then((res) => res.json());
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    } finally {
      setCompany(response);
      setIsLoading(false);
      navigate("/dashboard");
    }
  };
  return (
    <>
      <Card className="mx-auto my-5 py-3" style={{ width: "40rem" }}>
        <h2 className="text-center">{company.name}</h2>
        <Form className="m-3" onSubmit={handleUpdate}>
          <Form.Group className="mb-3">
            <Form.Label>Tag Line</Form.Label>
            <Form.Control type="text" placeholder={company.tagline} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>About</Form.Label>
            <Form.Control
              type="text"
              placeholder={company.description}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Target Amount</Form.Label>
            <Form.Control type="text" placeholder={company.target} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Min Invest</Form.Label>
            <Form.Control
              type="text"
              placeholder={company.mininvest}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Raise Fund</Form.Label>
            <Form.Check label={"Check to enable"}></Form.Check>
          </Form.Group>
          <Button variant="success" type="submit">
            Update
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default UpdateCompany;
