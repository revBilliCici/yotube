import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import {
  ChannelDetail,
  Feed,
  Navbar,
  SearchFeed,
  VideoDetail,
} from "./components";

const App = () => (
  <BrowserRouter>
    <Box sx={{ background: "#000" }}>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Feed />} />
        <Route path="/video/:id" element={<VideoDetail />} />
        <Route path="/channel/:id" element={<ChannelDetail />} />
        <Route path="/search/:searchTerm" element={<SearchFeed />} />
        <Route path="/*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Box>
  </BrowserRouter>
);

export default App;
