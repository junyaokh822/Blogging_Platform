import { useEffect, useContext } from "react";
import { Link, Outlet, useNavigation, useLoaderData } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export async function loader({ request }) {
  const response = await fetch("/api/auth/current_user");
  if (response.ok) {
    const { user } = await response.json();
    return { currentUser: user };
  }
  return { currentUser: null };
}



export async function action({ request }) {
  const response = await fetch("/api/auth/logout", {
    method: "DELETE"
  });
  return null;
}
  
function Root() {
  const { currentUser } = useLoaderData();
  const { setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    setCurrentUser(currentUser);
  }, [currentUser]);

    return (
      <div>
        <nav className="bg-blue-900 h-14 flex justify-items-center justify-between">
          <h2 className="flex items-center">
            <Link className="text-2xl flex items-center gap-1 px-2" to="/">
              To-Do-List
            </Link>
          </h2>
          <div className="flex items-center pr-2">
            <Form method="post">
              <button type="submit">Logout</button>
            </Form>
          </div>
        </nav>
        <div className={outletClasses}>
          <Outlet />
        </div>
      </div>
    );
}

  export default Root;