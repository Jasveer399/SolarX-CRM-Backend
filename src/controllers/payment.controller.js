import prisma from "../DB/db.config.js";
import { formatDate } from "../utils/DateFormate.js";

const createPayment = async (req, res) => {
  const {
    subsidy,
    name,
    villageCity,
    mobileNumber,
    district,
    pspdlSection,
    paymentDone,
  } = req.body;
  try {
    // Check if Quotation already exists for this mobileNumber
    // const existingPayment = await prisma.payment.findFirst({
    //   where: { mobileNumber },
    // });
   const siteVisitUpdated = await prisma.siteVisit.update({
      where: {
        mobileNumber,
      },
      data: {
        paymentDone: true,
      },
    });
    if (siteVisitUpdated) {
      const createdPayment = await prisma.payment.create({
        data: {
          subsidy,
          name,
          villageCity,
          mobileNumber,
          district,
          pspdlSection,
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
    }
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
    const payments = await prisma.payment.findMany({
      where: {
        AND: [{ paymentDone: true }],
      },
      orderBy: [{ createdAt: "desc" }, { name: "asc" }],
    });
    // const filterQuotation = payments.filter((pay) => pay.paymentDone === true);

    return res.status(200).json({
      data: payments,
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
    pspdlSection,
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
        pspdlSection,
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

    console.log("updated Payment =>", updatedPayment);

    if (!updatedPayment) {
      return res.status(404).json({
        message: "Payment not found",
        status: false,
      });
    }
    return res.status(200).json({
      data: updatedPayment,
      message: "Payment Updated Successfully!!",
      status: true,
    });
  } catch (error) {
    console.error("Error while updating Payment!:", error);
    return res.status(500).json({
      error: error.message,
      message: "Error while updating Payment!!",
      status: false,
    });
  }
};

export { createPayment, getAllPayments, updatePayment };
