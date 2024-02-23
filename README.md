# Schema-CrafterJS Example

This repository serves as a working example of the Schema-CrafterJS npm package in action.

## Overview

This example demonstrates the usage of Schema-CrafterJS by employing two different approaches:

- The schema definition can be found in `src/schema/schema.js`.
- A simple form utilizing the schema is implemented in `App.js`.

Upon rendering the page, the function `build_schema()` is called to initialize the schema building process.

```javascript
// src/schema/schema.js
export async function build_schema() {
  try {
    await schema.build({
      username: {
        required: [true, "Username Required."],
        string: [true, "Must Be A String."],
        matches: [
          true,
          new RegExp(/^[A-Za-z0-9]+$/),
          "Username Must Consists Of Only Numbers And Letters.",
        ],
        min: [5, "Username Must Be Longer Than 5 Characters."]
      },
      email: {required: [true, "Email Is Required."], email: [true, "Must Be A Valid Email."]},
      password: {required: [true, "Password Is Required."], password: [true, "Must Contain A Number, Uppercase Letter, and Lowercase Letter."]},
    });
  } catch (err) {
    console.error(err);
  }
}
```

## Usage

To use Schema-CrafterJS in your application:

1. Define your schema in `src/schema/schema.js`.
2. Call the `build_schema()` function to initialize the schema on page render.

```javascript
// src/App.js
useEffect(() => {
  build_schema();
}, []);
```
Alternatively, you can directly call schema.build() in the useEffect() hook, but errors won't be gracefully caught.

```
// src/App.js
useEffect(() => {
  schema.build(whateverschemayouchoose);
}, []);
```

## Validation

To validate form data based on the schema:

1. Define a function in `src/schema/schema.js` to submit the form and validate the payload.

```javascript
// src/schema/schema.js
export async function submit_form(payload) {
   await schema.validate(payload);
}
```
```
// src/App.js
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
```