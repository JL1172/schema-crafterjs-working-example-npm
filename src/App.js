import { useEffect, useState } from "react";
import { build_schema, submit_form } from "./schema/schema";
// import SchemaBuilder from "schema-crafterjs";

const initialState = {
  username: "",
  email: "",
  password: "",
};
const initialErrState = {
  username: [],
  email: [],
  password: [],
};
function App() {
  // const schema = new SchemaBuilder();
  useEffect(() => {
    /*
    CAN DO IT LIKE THIS OR
    schema.build({
      username: {
        required: ["", "Username Required."],
        string: [true, "Must Be A String."],
        matches: [
          true,
          new RegExp(/^[A-Za-z0-9]+$/),
          "Username Must Consists Of Only Numbers And Letters.",
        ],
        min: [5, "Username Must Be Longer Than 5 Characters."],
      },
      email: {
        required: [true, "Email Is Required."],
        email: [true, "Must Be A Valid Email."],
      },
      password: {
        required: [true, "Password Is Required."],
        password: [
          true,
          "Must Contain A Number, Uppercase Letter, and Lowercase Letter.",
        ],
      },
    });
    YOU CAN DO IT LIKE THIS 
    */
    build_schema();
  }, []);
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(initialErrState);
  const changeHandler = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  const submitHandler = async (e) => {
    setError(initialErrState);
    try {
      e.preventDefault();
      await submit_form(formData);
      setFormData(initialState);
    } catch (err) {
      for (const e of err) {
        if (e.field in error) {
          setError((error) => ({
            ...error,
            [e.field]: [...error[e.field], Object.values(e).slice(1)],
          }));
        }
      }
    }
  };
  return (
    <div className="app">
      <form id="form" onSubmit={(e) => submitHandler(e)}>
        <h1>Login</h1>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="username"
            name="username"
            value={formData.username}
            onChange={(e) => changeHandler(e.target.name, e.target.value)}
          />
          <div
            style={{ width: "15rem", display: "flex", flexDirection: "column" }}
          >
            {error["username"].map((n, i) => {
              return (
                <span
                  style={{ display: "flex", flexDirection: "column" }}
                  key={i}
                >
                  {n}
                </span>
              );
            })}
          </div>
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="email"
            name="email"
            value={formData.email}
            onChange={(e) => changeHandler(e.target.name, e.target.value)}
          />
          <div
            style={{ width: "15rem", display: "flex", flexDirection: "column" }}
          >
            {error["email"].map((n, i) => {
              return (
                <span
                  style={{ display: "flex", flexDirection: "column" }}
                  key={i}
                >
                  {n}
                </span>
              );
            })}
          </div>
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={(e) => changeHandler(e.target.name, e.target.value)}
          />
          <div
            style={{ width: "15rem", display: "flex", flexDirection: "column" }}
          >
            {error["password"].map((n, i) => {
              return (
                <span
                  style={{ display: "flex", flexDirection: "column" }}
                  key={i}
                >
                  {n}
                </span>
              );
            })}
          </div>
        </div>
        <input type="submit" style={{ margin: "2rem" }} />
      </form>
    </div>
  );
}

export default App;
