import React, { useState } from "react";
import { Tab, Tabs, Typography, Box } from "@mui/material";
import ProductsListForm from "../components/ProductsListForm";
import ProductsListAPI from "../components/ProductsListAPI";

export default function ProductsPage() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ marginTop: "20px" }}
      >
        Products Page
      </Typography>
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label="Form List" />
        <Tab label="API List" />
      </Tabs>
      <TabPanel value={selectedTab} index={0}>
        <ProductsListForm />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <ProductsListAPI />
      </TabPanel>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
