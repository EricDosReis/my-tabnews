function status(request, response) {
  response.status(200).json({ message: "Everything is OK" });
}

export default status;
