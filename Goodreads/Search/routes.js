import axios from "axios";

export default function SearchRoutes(app) {
  const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes";

  const searchBooks = async (req, res) => {
    let {query, startIndex = 0, maxResults = 10} = req.query;
    query = (query || "").trim();
    if (!query) {
        res.sendStatus(400);
        return;
    }

    try {
      const response = await axios.get(GOOGLE_BOOKS_API, {
        params: {q: query, startIndex: Number(startIndex), maxResults: Number(maxResults)},
      });
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  };

  const getBookById = async (req, res) => {
      const { id } = req.params;
      if (!id) {
          res.sendStatus(400);
          return;
      }

      try {
          const response = await axios.get(`${GOOGLE_BOOKS_API}/${id}`);
          res.json(response.data);
      } catch (error) {
          console.error(error);
          res.sendStatus(500);
      }
  };

  // for testing use http://localhost:4000/api/books/search?query=harry+potter
  app.get("/api/books/search", searchBooks);
  app.get("/api/books/:id", getBookById);

}