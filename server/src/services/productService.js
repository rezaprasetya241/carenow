import prismaClient from "../db/index.js";

export const getAllProducts = async () => {
  try {
    const products = await prismaClient.product.findMany();
    return {
      data: products,
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: "Error fetching products",
      status: 500,
    };
  }
};

export const getProductsById = async (id) => {
  try {
    const product = await prismaClient.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      return {
        success: false,
        error: "Product not found",
        status: 404,
      };
    }
    return {
      data: product,
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: "Error fetching product",
      status: 500,
    };
  }
};
