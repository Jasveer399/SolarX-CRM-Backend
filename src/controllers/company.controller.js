import prisma from "../DB/db.config.js";

const createCompany = async (req, res) => {
  try {
    const companies = Array.isArray(req.body) ? req.body : [req.body];

    if (companies.length === 0) {
      return res.status(400).json({
        message: "No company data provided",
        status: false,
      });
    }

    const createdCompanies = await prisma.companyDetail.createMany({
      data: companies.map((company) => ({
        companyName: company.companyName,
        companyGST: company.companyGST,
      })),
      skipDuplicates: true,
    });

    let responseMessage =
      companies.length === 1
        ? "Company created successfully"
        : `${createdCompanies.count} companies created successfully`;
    res.status(201).json({
      message: responseMessage,
      count: createdCompanies.count,
      status: true,
    });
  } catch (error) {
    console.error("Error creating company:", error);
    res.status(500).json({
      message: "Failed to create company",
      error: error.message,
      status: false,
    });
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const companies = await prisma.companyDetail.findMany();

    console.log("Companies", companies);
    res.status(200).json({
      message: "Companies fetched successfully",
      data: companies,
      status: true,
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({
      message: "Failed to fetch companies",
      error: error.message,
      status: false,
    });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCompany = await prisma.companyDetail.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      message: "Company deleted successfully",
      data: deletedCompany,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete company",
      error: error.message,
      status: false,
    });
  }
};

const editCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { companyGST, companyName } = req.body;
    const updatedCompany = await prisma.companyDetail.update({
      where: {
        id: id,
      },
      data: {
        companyGST,
        companyName,
      },
    });
    res.status(200).json({
      message: "Company updated successfully",
      data: updatedCompany,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update company",
      error: error.message,
      status: false,
    });
  }
};

export { createCompany, getAllCompanies, deleteCompany, editCompany };
