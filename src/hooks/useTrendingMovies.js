import { useEffect, useState } from "react";
import { appsApi } from "@/utils/api";

const useTrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const body = {
          accountType: "Adult",
          type: "like",
        };
        console.log("body", JSON.stringify(body));
        const response = await appsApi.get(
          `video/get-upcoming-toprated-videos/${body.accountType}`,
        );
        const filteredMovies = response.data.results
          .filter((item) => item.data.some((dataItem) => dataItem.videoId))
          .map((item) => ({
            category: item.category,
            videoIds: item.data
              .filter((dataItem) => dataItem.videoId)
              .map((dataItem) => dataItem.videoId),
          }));
        setTrendingMovies(filteredMovies);
        console.log("Trending movies:", filteredMovies);
      } catch (error) {
        console.error("Error fetching trending movies", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return trendingMovies;
};

export default useTrendingMovies;
