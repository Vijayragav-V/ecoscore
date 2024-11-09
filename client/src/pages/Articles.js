import React, { useState, useEffect } from "react";
import { fetchArticles } from "../services/newsScraper";
import Article from "../components/Article";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles()
      .then((data) => {
        if (data.length === 0) {
          setError("No articles found.");
        } else {
          setArticles(data);
        }
      })
      .catch((err) => setError("An error occurred while fetching articles."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Articles</h1>
      {loading && <p>Loading articles...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        {articles.map((article, index) => (
          <Article key={index} articleData={article} />
        ))}
      </div>
    </div>
  );
};

export default Articles;
