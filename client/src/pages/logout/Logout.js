import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
export default function Logout() {
      const {user} = useContext(AuthContext);
      user.authenticated=false;
      window.location.href = "/login";
}