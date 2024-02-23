import SchemaBuilder from "schema-crafterjs";
const schema = new SchemaBuilder();

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
export async function submit_form(payload) {
   await schema.validate(payload);
}