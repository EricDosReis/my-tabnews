import database from "../../../../infra/database";

async function status(request, response) {
  const result = await database.query("Select 1 + 1 as sum");

  console.log(result);

  response.status(200).json({ message: "Everything is OK" });
}

export default status;
