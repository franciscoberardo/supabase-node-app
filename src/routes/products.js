const express = require("express");
const router = express.Router();
const supabase = require("../services/supabaseClient");

// Helper function to handle errors and responses
const handleResponse = (res, data, error, errorMsg) => {
  if (error) {
    console.error("ERROR", error);
    return res.status(500).json({ error: errorMsg });
  }
  return res.status(200).json(data);
};

// Get the top 12 most expensive products
router.get("/top-expensive", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("Product")
      .select("id, name, image, price, sale_price, tag")
      .order("price", { ascending: false })
      .limit(12);

    handleResponse(res, data, error, "Error fetching top expensive products");
  } catch (err) {
    console.error("Exception", err);
    res.status(500).json({ error: "Unexpected error" });
  }
});

// Get products by category
router.get("/:category_id", async (req, res) => {
  const categoryId = req.params.category_id;

  if (!categoryId || isNaN(categoryId)) {
    return res.status(400).json({ error: "Invalid category ID" });
  }

  try {
    const { data, error } = await supabase
      .from("Product")
      .select("id, name, image, price, sale_price, category_id, tag")
      .eq("category_id", categoryId);

    handleResponse(res, data, error, "Error fetching products by category ID");
  } catch (err) {
    console.error("Exception", err);
    res.status(500).json({ error: "Unexpected error" });
  }
});

// Get products with optional filtering by tag
router.get("/", async (req, res) => {
  const { tag } = req.query;

  try {
    let query = supabase.from("Product").select("id, name, image, price, sale_price, tag");

    if (tag) {
      query = query.eq("tag", tag);
    }

    const { data, error } = await query;

    handleResponse(res, data, error, "Error fetching products");
  } catch (err) {
    console.error("Exception", err);
    res.status(500).json({ error: "Unexpected error" });
  }
});

module.exports = router;
