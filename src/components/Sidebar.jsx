import React from "react";
import { Stack } from "@mui/system";
import { categories } from "../utils/constants";
import { Button } from "@mui/material";

const Sidebar = ({ selectedCategory, setselectedCategory }) => {
  return (
    <Stack
      direction={"row"}
      sx={{
        overflowY: "auto",
        height: { sx: "auto", md: "95%" },
        flexDirection: { md: "column" },
      }}
    >
      {categories.map((category) => (
        <Button
          className="category-btn"
          onClick={() => setselectedCategory(category.name)}
          sx={{
            background: category.name === selectedCategory && "#FC1503",
            color: "white",
          }}
          key={category.name}
        >
          <span
            style={{
              color: category.name === selectedCategory ? "white" : "red",
              paddingRight: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            {category.icon}
          </span>
          <span
            style={{
              opacity: category.name === selectedCategory ? "1" : "0.8",
            }}
          >
            {category.name}
          </span>
        </Button>
      ))}
    </Stack>
  );
};

export default Sidebar;
