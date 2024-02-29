import React, { useState, useEffect } from "react";
import axios from "axios";
import Blog from "./Blog";

const API_KEY_NEWSAPI = "b5003c1e18164070af7066173e25a17b";
const options = {
  method: "GET",
  url: "https://news-api14.p.rapidapi.com/top-headlines",
  params: {
    country: "us",
    language: "en",
    pageSize: "10",
    category: "sports",
  },
  headers: {
    "X-RapidAPI-Key": "1ff2c0fba6msh26d96c326b1339dp10eba2jsn61f1aa23d078",
    "X-RapidAPI-Host": "news-api14.p.rapidapi.com",
  },
};
const options2 = {
  method: "GET",
  url: "https://news-api14.p.rapidapi.com/search",
  params: {
    q: "computer",
    country: "us",
    language: "en",
    pageSize: "10",
    publisher: "cnn.com,bbc.com",
  },
  headers: {
    "X-RapidAPI-Key": "1ff2c0fba6msh26d96c326b1339dp10eba2jsn61f1aa23d078",
    "X-RapidAPI-Host": "news-api14.p.rapidapi.com",
  },
};

const API_KEY_OPENNEWS = "YOUR_OPENNEWS_KEY";
const API_KEY_GUARDIAN = "YOUR_GUARDIAN_KEY";

export default function Article() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [headlines, setHeadLines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    const fetchNewsArticles = async () => {
      try {
        // Fetch news articles from NewsAPI
        const responseNewsAPI = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY_NEWSAPI}`
        );

        // Fetch news articles from OpenNews
        const responseOpenNews = await axios.request(options);
        console.log(responseOpenNews.data.articles, "log");
        setHeadLines(responseOpenNews.data.articles);
        const response = await axios.request(options2);
        console.log(response.data.articles, "search");
        setSearch(response.data.articles);
        const guardion = await axios.get('https://content.guardianapis.com/search', {
          params: {
            q: '', // Specify your search query here
            api_key: 'fd26fc8c-8e13-49ac-afc0-1f4f4122f077', // Replace with your API key
          },})

          console.log(guardion, "gurdion ");
        // Fetch news articles from The Guardian
        // const responseGuardian = await axios.get('https://content.guardianapis.com/search', {
        //   params: {
        //     'api-key': API_KEY_GUARDIAN,
        //     section: 'world', // Example: Fetch articles from the world section
        //   },
        // });

        // Combine and set articles from all sources
        setArticles([
          ...responseNewsAPI.data.articles,

          // ...responseGuardian.data.response.results,
        ]);
        setLoading(false); // Set loading to false once data is fetched
        console.log(articles, "article");
      } catch (error) {
        console.error("Error fetching news articles second:", error);
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchNewsArticles();
  }, []);
  return (
    <div>
      <div className="container mt-4 ">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <Blog articles={articles} headlines={headlines} search={search}/>
        )}
      </div>
    </div>
  );
}
