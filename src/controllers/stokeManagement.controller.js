import prisma from "../DB/db.config.js";

const createStockManagement = async (req, res) => {
  try {
    const { dateOfPurchase, companyName, gstNumber, products } = req.body;

    const stockManagement = await prisma.stockManagement.create({
      data: {
        dateOfPurchase,
        companyName,
        gstNumber,
        products: {
          create: products.map((product) => ({
            productName: product.productName,
            hsnNo: product.hsnNo,
            qty: product.qty,
            unit: product.unit,
            rate: product.rate,
            amount: product.amount,
            sgstPercentage: product.sgstPercentage,
            sgstAmount: product.sgstAmount,
            cgstPercentage: product.cgstPercentage,
            cgstAmount: product.cgstAmount,
            totalAmount: product.totalAmount,
          })),
        },
      },
      include: {
        products: true,
      },
    });

    res.status(201).json({
      message: "Stock management created successfully",
      data: stockManagement,
      status: true,
    });
  } catch (error) {
    console.error("Error creating stock management:", error);
    res.status(500).json({ error: "Failed to create stock management" });
  }
};

const getAllStockManagement = async (req, res) => {
  try {
    const stockManagements = await prisma.stockManagement.findMany({
      include: {
        products: true,
      },
    });

    res.status(200).json({
      message: "Stock management fetched successfully",
      data: stockManagements,
      status: true,
    });
  } catch (error) {
    console.error("Error fetching stock management data:", error);
    res.status(500).json({ error: "Failed to fetch stock management data" });
  }
};

const addProduct = async (req, res) => {
  const {
    stockManagementId,
    productName,
    hsnNo,
    qty,
    unit,
    rate,
    amount,
    sgstPercentage,
    sgstAmount,
    cgstPercentage,
    cgstAmount,
    totalAmount,
  } = req.body;

  try {
    // Check if the StockManagement entry exists
    const stockManagement = await prisma.stockManagement.findUnique({
      where: { id: stockManagementId },
    });

    if (!stockManagement) {
      return res.status(404).json({ message: "StockManagement not found" });
    }

    // Create the new product
    const newProduct = await prisma.product.create({
      data: {
        productName,
        hsnNo,
        qty: parseFloat(qty),
        unit,
        rate: parseFloat(rate),
        amount: parseFloat(amount),
        sgstPercentage: parseFloat(sgstPercentage),
        sgstAmount: parseFloat(sgstAmount),
        cgstPercentage: parseFloat(cgstPercentage),
        cgstAmount: parseFloat(cgstAmount),
        totalAmount: parseFloat(totalAmount),
        stockManagement: {
          connect: { id: stockManagementId },
        },
      },
    });

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
      status: true,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res
      .status(500)
      .json({
        message: "An error occurred while adding the product",
        status: false,
      });
  }
};

export { createStockManagement, getAllStockManagement, addProduct };
