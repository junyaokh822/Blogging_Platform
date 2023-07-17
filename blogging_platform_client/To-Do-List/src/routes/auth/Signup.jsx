// src/routes/auth/Signup.jsx
import { Form, redirect } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();

  const response = await fetch("/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    return null;
  }

  return redirect("/");
}

function Signup() {
  return (
    <Form method="post" className="selection:bg-blue-200 flex flex-col gap-2">
      <h1 className="text-white">Signup</h1>

      <fieldset className="flex flex-col">
        <label htmlFor="title">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          className="border-4 focus:outline-none p-2"
        />
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="company">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="border-4 focus:outline-none p-2"
        />
      </fieldset>
      <input
        className="bg-blue-500 hover:bg-blue-600 text-white transition mt-4 py-2 cursor-pointer"
        type="submit"
      ></input>
    </Form>
  );
}

export default Signup;