import React from "react";

const Article = ({ articleData }) => {
  return (
    <div className="w-full p-4 border-b border-gray-300 flex flex-col md:flex-row items-start">
      <div className="md:w-1/4 w-full mb-4 md:mb-0">
        <img 
          src={articleData.imgSrc} 
          alt={articleData.title} 
          className="w-full h-auto object-cover rounded-lg shadow-lg" 
        />
      </div>
      <div className="md:w-3/4 w-full md:pl-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{articleData.title}</h2>
        <p className="text-gray-700 mb-4">{articleData.description}</p>
        <a 
          href={articleData.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default Article;
