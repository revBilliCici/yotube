import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Videos from "./Videos";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const SearchFeed = () => {
  const { searchTerm } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) => {
      setData(data);
    });
  }, [searchTerm]);

  const handlePrev = (e) => {
    fetchFromAPI(
      `search?part=snippet&q=${searchTerm}&pageToken=${data?.prevPageToken}`
    ).then((data) => {
      setData(data);
    });
  };

  const handleNext = (e) => {
    fetchFromAPI(
      `search?part=snippet&q=${searchTerm}&pageToken=${data?.nextPageToken}`
    ).then((data) => {
      setData(data)
    });
  };

  if (Object.keys(data).length === 0)
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
      <Videos videos={data?.items} />
      <Box justifyContent={"center"} display={"flex"} p={4}>
        {data?.prevPageToken ? (
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
