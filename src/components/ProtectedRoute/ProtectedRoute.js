import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || !token) navigate("/landing");
    else navigate("/");
  }, []);
  return <Component />;
};

export default ProtectedRoute;
