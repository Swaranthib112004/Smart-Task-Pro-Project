import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../utils/cookie";

export default function ProtectedRoute() {
  const ok = Boolean(getCookie("session"));
  console.log("ProtectedRoute: session cookie present?", ok);
  return ok ? <Outlet /> : <Navigate to="/login" replace />;
}
