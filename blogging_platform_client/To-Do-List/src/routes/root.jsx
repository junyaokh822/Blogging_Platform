import { useEffect, useContext } from "react";
import { Link, Outlet, useNavigation, useLoaderData } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

export async function loader({ request }) {
    const response = await fetch("http://localhost:4000/api/auth/current_user");
    if (response.ok) {
      const { user } = await response.json();
      return { currentUser: user };
    }
    return { currentUser: null };
  }
  
  function Root() {
    const { currentUser } = useLoaderData();
    const { setCurrentUser } = useContext(AuthContext);

    useEffect(() => {
      setCurrentUser(currentUser);
    }, [currentUser]);

  }

  export default Root;