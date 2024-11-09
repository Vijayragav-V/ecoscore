import React, { useState, useEffect } from "react";
import { getArticles } from "../services/api";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticles()
      .then((data) => {
        console.log(data);
        if (data.length === 0) {
          setError("No articles found.");
        } else {
          setArticles(data);
        }
      })
      .catch(() => setError("An error occurred while fetching articles."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-300 to-blue-300 pt-20 pb-5">
      <div className="container mx-auto p-8 shadow-lg rounded-lg bg-white">
        {error && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full flex flex-col items-center">
              <p className="text-red-500 font-semibold mb-4 text-center">
                {error}
              </p>
            </div>
          </div>
        )}

        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Articles
        </h1>

        {loading && (
          <p className="text-center text-gray-600">Loading articles...</p>
        )}

        <section className="articles-list mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            See the latest articles on environmental news
          </h2>
          <div className="flex flex-wrap -mx-2 justify-start">
            {articles.map((article, index) => (
              <div key={index} className="w-full sm:w-1/3 px-2 mb-4">
                <div className="border p-4 rounded-lg shadow-sm bg-gray-50 flex flex-col justify-between h-full">
                  <img
                    src={article.imgSrc}
                    alt={article.title}
                    className="mb-4 rounded-lg w-full h-60 object-cover"
                  />
                  <h3 className="font-semibold text-green-600">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-2 text-ellipsis flex-grow">
                    {article.description}
                  </p>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 px-4 py-2 w-full rounded bg-green-500 text-white hover:bg-green-600 text-center"
                  >
                    Read Full Article
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Articles;
