import prisma from "../DB/db.config.js";
import { formatDate } from "../utils/DateFormate.js";

const createQuotation = async (req, res) => {
  console.log("Req.Body =>", req.body);
  const {
    mobileNumber,
    name,
    district,
    villageCity,
    solarType,
    pspclAccountNumber,
    sanLoad,
    monthlyBill,
    monthlyConsumption,
    proposedSolarLoad,
    subsidy,
    solarPanels,
    inverter,
    baseAmount,
    gst,
    totalPrice,
  } = req.body;
  try {
    // Check if Quotation already exists for this mobileNumber
    const existingQuotation = await prisma.quotation.findFirst({
      where: { mobileNumber },
    });
    const project = await prisma.project.update({
      where: {
        mobileNumber,
      },
      data: {
        isQuotation: true,
      },
    });

    if (project) {
      if (existingQuotation) {
        const updateQuotation = await prisma.quotation.update({
          where: {
            mobileNumber,
          },
          data: {
            isQuotation: true,
          },
        });

        if (!updateQuotation) {
          return res.status(500).json({
            message: "Server Error 500 !!",
            status: false,
          });
        }

        return res.status(201).json({
          data: updateQuotation,
          message: "Quotation Change to Prospact Successfully !!",
          status: true,
        });
      } else {
        const createdQuotation = await prisma.quotation.create({
          data: {
            mobileNumber,
            name,
            district,
            villageCity,
            solarType,
            pspclAccountNumber,
            sanLoad,
            monthlyBill,
            monthlyConsumption,
            proposedSolarLoad,
            subsidy,
            solarPanels,
            inverter,
            baseAmount,
            gst,
            totalPrice,
          },
        });

        if (!createdQuotation) {
          return res.status(500).json({
            message: "Server Error 500 !!",
            status: false,
          });
        }

        return res.status(201).json({
          data: createdQuotation,
          message: "Quotation Created Successfully !!",
          status: true,
        });
      }
    }
  } catch (error) {
    console.error("Error in createQuotation:", error);
    return res.status(500).json({
      error: error.message,
      message: "Error while creating or updating quotation !!",
      status: false,
    });
  }
};

const getAllQuotations = async (req, res) => {
  try {
    const quotations = await prisma.quotation.findMany();
    const filterQuotation = quotations.filter(
      (quo) => quo.isQuotation === true && quo.paymentDone === false
    );
    return res.status(200).json({
      data: filterQuotation,
      message: "All Quotations fetched Successfully!!",
      status: true,
    });
  } catch (error) {
    console.error("Error in getAllQuotations:", error);
    return res.status(500).json({
      error: error.message,
      message: "Error while fetching all quotations!!",
      status: false,
    });
  }
};

const updateQuotation = async (req, res) => {
  const {
    quotationId,
    mobileNumber,
    name,
    solarType,
    district,
    villageCity,
    pspclAccountNumber,
    sanLoad,
    monthlyBill,
    monthlyConsumption,
    proposedSolarLoad,
    subsidy,
    solarPanels,
    inverter,
    baseAmount,
    gst,
    totalPrice,
  } = req.body;

  try {
    const updatedQuotation = await prisma.quotation.update({
      where: { id: quotationId },
      data: {
        mobileNumber,
        name,
        solarType,
        district,
        villageCity,
        pspclAccountNumber,
        sanLoad,
        monthlyBill,
        monthlyConsumption,
        proposedSolarLoad,
        subsidy,
        solarPanels,
        inverter,
        baseAmount,
        gst,
        totalPrice,
      },
    });

    console.log("updatedQuotation =>", updatedQuotation);

    if (!updatedQuotation) {
      return res.status(404).json({
        message: "Quotation not found",
        status: false,
      });
    }
    return res.status(200).json({
      data: updatedQuotation,
      message: "Quotation Updated Successfully!!",
      status: true,
    });
  } catch (error) {
    console.error("Error in updateQuotation:", error);
    return res.status(500).json({
      error: error.message,
      message: "Error while updating quotation!!",
      status: false,
    });
  }
};

export { createQuotation, getAllQuotations, updateQuotation };
