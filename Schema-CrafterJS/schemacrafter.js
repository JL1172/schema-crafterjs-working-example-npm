
  //Build Method Use Case
  //you can pre-define schema like so:

  import SchemaBuilder from "schemacrafterjs";
  const schema = new SchemaBuilder();

  const FORM_SCHEMA = {
    fullName: {
      string: [true, "Full Name Must Be A Valid String"],
      matches: [
        true,
        new RegExp(/^[A-Za-z ]*$/),
        "Full Name Must Only Be Letters.",
      ],
      min: [5, "Full Name Must Not Be Less Than 5 Characters."],
      required: [true, "Full Name Required."],
    },
    email: {
      email: [true, "Must Be A Valid Email."],
      required: [true, "Email Required."],
    },
    password: {
      password: [
        true,
        "Must Be A Strong Password: containing uppercase, number, and lowercase.",
      ],
      min: [8, "Password Must Be Longer Than 8."],
      required: [true, "Password Required."],
    },
    age: {
      number: [true, "Age Must Be A Number."],
      min: [18, "Must Be Older Than 18"],
      max: [120, ""],
      required: [true, "Age Required."],
    },
    created_at: {
      date: [true, "Must Be A Valid Date."],
      required: [true, "Timestamp Required"],
    },
    username: {
      string: [true, "Username Must Be A String."],
      min: [5, "Username Must Be Longer Than 5 Characters."],
      required: [true, "Username Required."],
      matches: [
        true,
        new RegExp(/^^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]+$/),
        "Username Must Contain A Number, A Lowercase or Uppercase Letter.",
      ],
    },
  };

  //Then insert it into schema builder function
  async function schemaBuilder(form_schema) {
    try {
      const result = await schema.build(form_schema);
      console.log(result); //on success the outcome will be undefined;
    } catch (err) {
      console.log(err);
      //if there are any issues in the build process, an error will be thrown either
      //as an Error or TypeError
    }
  }
  schemaBuilder();
  //Note you do not have to do it like this, this above method makes error handling graceful in the development process

  //Validate Method Use Case
  const payload = {
    fullName: "Jacob Lang",
    email: "jacob@gmail.com",
    password: "helloWorld11",
    age: 18,
    created_at: new Date(),
    username: "jacoblang11",
  };
  async function submitPayload(userPayload) {
    try {
      const result = await schema.validate(userPayload); //will return undefined if successful;
    } catch (err) {
      console.log(err); //will return an array of objects with errors with fieldnames to make error messaging graceful.
    }
  }
  submitPayload(payload);

  //Other Methods:
  peekError(); //this is helpful for the development process to see error body
  peek(); //this is helpful for the development process to see the schema

  //schema options:
  /**
   * required: defaults to true, type expected: [boolean, string];
   * min: type expected: [number, string];
   * max: type expected: [number, string];
   * matches: type expected [boolean, new RegExp(""), string];
   * string: type expected [boolean, string];
   * number: type expected [boolean, string];
   * boolean: type expected [boolean, string];
   * date: type expected [boolean, string];
   * email: type expected [boolean, string];
   * password: type expected [boolean, string];
   */
