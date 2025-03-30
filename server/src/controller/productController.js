import express from "express";
import prisma from "../db/index.js";
import { getAllProducts, getProductsById } from "../services/productService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  return res.json(products);
});

router.post("/", async (req, res) => {
  const { name, description, price, image } = req.body;
  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      image,
    },
  });
  return res.status(200).send({
    data: product,
    message: "Product created successfully",
  });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.delete({
    where: {
      id: id,
    },
  });
  if (product) {
    return res.status(200).send({
      data: product,
      message: "Product deleted successfully",
    });
  } else {
    return res.status(404).send({
      message: "Product not found",
    });
  }
});

router.get("/:id", async (req, res) => {
  const result = await getProductsById(req.params.id);
  if (!result.success) {
    return res.status(result.status).send({
      message: result.error,
    });
  }
  return res.status(200).send({
    data: result.data,
  });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image } = req.body;

  const product = await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      name,
      description,
      price,
      image,
    },
  });
  if (product) {
    return res.status(200).send({
      data: product,
      message: "Product updated successfully",
    });
  } else {
    return res.status(404).send({
      message: "Product not found",
    });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image } = req.body;
  const product = await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      name,
      description,
      price,
      image,
    },
  });
  if (product) {
    return res.status(200).send({
      data: product,
      message: "Product updated successfully",
    });
  } else {
    return res.status(404).send({
      message: "Product not found",
    });
  }
});

export default router;
