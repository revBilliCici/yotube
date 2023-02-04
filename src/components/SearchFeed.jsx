import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Videos from "./Videos";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const SearchFeed = () => {
  const { searchTerm } = useParams();
  const [data, setData] = useState({});
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [prevPageToken, setPrevPageToken] = useState("");
  const [isdisabled, setIsdisabled] = useState(false);
  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) => {
      setData(data);
      setVideos(data.items);
      setNextPageToken(data.nextPageToken);
      setIsdisabled(true);
    });
  }, [searchTerm]);

  const handlePrev = (e) => {
    fetchFromAPI(
      `search?part=snippet&q=${searchTerm}&pageToken=${prevPageToken}`
    ).then((data) => {
      setVideos(data.items);
      setNextPageToken(data.nextPageToken);
      if (data.prevPageToken) {
        setPrevPageToken(data.prevPageToken);
        setIsdisabled(false);
      } else {
        setIsdisabled(true);
        setPrevPageToken("");
      }
    });
  };

  const handleNext = (e) => {
    fetchFromAPI(
      `search?part=snippet&q=${searchTerm}&pageToken=${nextPageToken}`
    ).then((data) => {
      setVideos(data.items);
      setNextPageToken(data.nextPageToken);
      setPrevPageToken(data.prevPageToken);
      setIsdisabled(false);
    });
  };

  if (!data)
    return (
      <Typography variant="h2" color={"white"}>
        ...Loading
      </Typography>
    );

  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Typography
        variant="h4"
        fontWeight={"bold"}
        mb={2}
        sx={{ color: "white" }}
      >
        Search Results for:{" "}
        <span style={{ color: "#FC1503" }}>{searchTerm}</span> Videos
      </Typography>
      <Videos videos={videos} />
      <Box justifyContent={"center"} display={"flex"} p={4}>
        {!isdisabled ? (
          <Button variant="text" onClick={handlePrev}>
            {console.log(data)}
            Previous
          </Button>
        ) : (
          <Button variant="text" onClick={handlePrev} disabled>
            Previous
          </Button>
        )}
        <Button variant="text" onClick={handleNext}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default SearchFeed;
