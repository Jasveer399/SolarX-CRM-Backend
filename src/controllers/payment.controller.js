import prisma from "../DB/db.config.js";
import { formatDate } from "../utils/DateFormate.js";

const createPayment = async (req, res) => {
  const {
    subsidy,
    name,
    villageCity,
    mobileNumber,
    district,
    pspclAccountNumber,
    paymentDone,
  } = req.body;
  try {
    // Check if Quotation already exists for this mobileNumber
    const existingPayment = await prisma.payment.findFirst({
      where: { mobileNumber },
    });
    await prisma.quotation.update({
      where: {
        mobileNumber,
      },
      data: {
        paymentDone: true,
      },
    });

    // if (existingPayment) {
    //   const updatePayment = await prisma.payment.update({
    //     where: {
    //       mobileNumber,
    //     },
    //     data: {
    //       isQuotation: true,
    //     },
    //   });

    //   if (!updateQuotation) {
    //     return res.status(500).json({
    //       message: "Server Error 500 !!",
    //       status: false,
    //     });
    //   }

    //   return res.status(201).json({
    //     data: updateQuotation,
    //     message: "Quotation Change to Prospact Successfully !!",
    //     status: true,
    //   });
    // } else {
    const createdPayment = await prisma.payment.create({
      data: {
        subsidy,
        name,
        villageCity,
        mobileNumber,
        district,
        pspclAccountNumber,
        paymentDone,
      },
    });

    if (!createdPayment) {
      return res.status(500).json({
        message: "Server Error 500 !!",
        status: false,
      });
    }

    return res.status(201).json({
      data: createdPayment,
      message: "Payment Created Successfully !!",
      status: true,
    });
    // }
  } catch (error) {
    console.error("Error in createing a Payment:", error);
    return res.status(500).json({
      error: error.message,
      message: "Error while creating payment !!",
      status: false,
    });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany();
    const filterQuotation = payments.filter((pay) => pay.paymentDone === true);
    return res.status(200).json({
      data: filterQuotation,
      message: "All payment fetched Successfully!!",
      status: true,
    });
  } catch (error) {
    console.error("Error While fetching all Payments:", error);
    return res.status(500).json({
      error: error.message,
      message: "Error while fetching all Payments!!",
      status: false,
    });
  }
};

const updatePayment = async (req, res) => {
  const {
    id,
    mobileNumber,
    name,
    email,
    district,
    villageCity,
    subsidy,
    pspclAccountNumber,
    subsidyAmount,
    netAmount,
    advancePayment,
    advancePaymentDate,
    payment1,
    payment1Date,
    payment2,
    payment2Date,
    payment3,
    payment3Date,
    totalProjectCost,
    totalAmountReceived,
    subsidyAmountReceived,
  } = req.body;

  try {
    const updatedPayment = await prisma.payment.update({
      where: { id },
      data: {
        mobileNumber,
        name,
        email,
        district,
        villageCity,
        subsidy,
        pspclAccountNumber,
        subsidyAmount,
        netAmount,
        advancePayment,
        advancePaymentDate,
        payment1,
        payment1Date,
        payment2,
        payment2Date,
        payment3,
        payment3Date,
        totalProjectCost,
        totalAmountReceived,
        subsidyAmountReceived,
      },
    });

    console.log("updatedQuotation =>", updatedQuotation);

    if (!updatedPayment) {
      return res.status(404).json({
        message: "Quotation not found",
        status: false,
      });
    }
    return res.status(200).json({
      data: updatedPayment,
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

export { createPayment, getAllPayments, updatePayment };
