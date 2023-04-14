import Place from "../../../../db/models/Place";
import dbConnect from "../../../../db/connect";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  if (request.method === "GET") {
    const places = await Place.findById(id);

    return response.status(200).json(places);
  }
  if (request.method === "POST") {
    try {
      const placeData = request.body;
      await Place.create(placeData);

      response.status(201).json({ status: "Place created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
