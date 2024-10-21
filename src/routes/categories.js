const express = require("express");
const router = express.Router();
const supabase = require("../services/supabaseClient");

// Helper function to handle responses
const handleResponse = (res, data, error, errorMsg) => {
  if (error) {
    console.error("ERROR", error);
    return res.status(500).json({ error: errorMsg });
  }
  return res.status(200).json(data);
};

// Get all categories
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("Category").select("id, name");

    handleResponse(res, data, error, "Error fetching categories");
  } catch (err) {
    console.error("Exception", err);
    res.status(500).json({ error: "Unexpected error" });
  }
});

module.exports = router;
