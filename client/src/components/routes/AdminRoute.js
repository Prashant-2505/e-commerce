import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth(); // No need to set auth here, as it's only used for reading

  useEffect(() => {
    const authCheck = async () => {
      try {
        console.log(auth.token)
        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/auth/admin-auth`,
          {
           
            headers: {
              "Authorization": auth?.token || "", // Provide an empty string as the default value to avoid sending 'undefined' to the server
            },
          }
        );
        setOk(res.data.ok); // Simplified the if-else logic
      } catch (error) {
        setOk(false); // Set 'ok' to false in case of any error
      }
    };

    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
