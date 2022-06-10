import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UseModal from "../components/UseModal";
import { UserContext } from "../UserContext";

const Logout = () => {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.isLoggedin) {
      navigate("/");
    }
    return () => {};
  }, [user]);
  const handleLogout = () => {
    setUser({ isLoggedin: false, name: "", email: "" });
  };
  const handleShow = () => {
    navigate(-1);
    return () => {};
  };
  return (
    <>
      <UseModal
        show={user.isLoggedin}
        handleShow={handleShow}
        title="Alert"
        body="Do you want to logout!"
        buttonName="Logout"
        buttonHandle={handleLogout}
      />
    </>
  );
};

export default Logout;
