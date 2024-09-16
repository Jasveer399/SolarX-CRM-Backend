import prisma from "../DB/db.config.js";
import { formatDate } from "../utils/DateFormate.js";

const createPayment = async (req, res) => {
  const {
    name,
    mobileNumber,
    villageCity,
    district,
    phase,
    subsidy,
    pspclAccountNo,
    pspdlSection,
    solarConnectionDemand,
  } = req.body;
  try {
    const createdPayment = await prisma.payment.create({
      data: {
        name,
        mobileNumber,
        villageCity,
        district,
        phase,
        subsidy,
        pspclAccountNo,
        pspdlSection,
        solarConnectionDemand,
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
      include: {
        paymentReceived: true,
      },
    });
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
    district,
    villageCity,
    totalProjectCost,
    totalAmountReceived,
    pendingAmount,
    paymentReceived,
  } = req.body;
  console.log("Update Payment ::::::::::::::=>", req.body);
  try {
    let paymentReceivedUpdate = {};

    if (paymentReceived && paymentReceived.length > 0) {
      paymentReceivedUpdate = {
        deleteMany: {},
        create: paymentReceived.map((payment) => ({
          amount: parseFloat(payment.amount),
          date: payment.date,
        })),
      };
    } else {
      // If paymentReceived is empty, we'll just delete existing entries
      paymentReceivedUpdate = {
        deleteMany: {},
      };
    }

    const updatedPayment = await prisma.payment.update({
      where: { id },
      data: {
        mobileNumber,
        name,
        district,
        villageCity,
        totalProjectCost: parseFloat(totalProjectCost),
        totalAmountReceived: parseFloat(totalAmountReceived),
        pendingAmount: parseFloat(pendingAmount),
        paymentReceived: paymentReceivedUpdate,
      },
      include: {
        paymentReceived: true,
      },
    });

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
    console.error("Error while updating Payment:", error);
    return res.status(500).json({
      error: error.message,
      message: "Error while updating Payment!!",
      status: false,
    });
  }
};

const changePaymentStatus = async (req, res) => {
  const { id, paymentStatus } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "missing id",
      status: false,
    });
  }

  if (!paymentStatus) {
    return res.status(400).json({
      message: "missing paymentStatus value",
      status: false,
    });
  }

  try {
    const updatedPayment = await prisma.payment.update({
      where: {
        id,
      },
      data: {
        paymentStatus: paymentStatus,
      },
    });
    if (!updatedPayment) {
      return res.status(404).json({
        message: "Prospect not found",
        status: false,
      });
    }

    return res.status(200).json({
      message: `Payment Status updated successfully TO ${paymentStatus}`,
      status: true,
      updatedPayment: updatedPayment,
    });
  } catch (error) {
    console.error("Error updating Payment Status:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Lead not found",
        status: false,
      });
    }

    return res.status(500).json({
      message: "Error while updating Payment Status",
      status: false,
      error: error.message,
    });
  }
};

export { createPayment, getAllPayments, updatePayment, changePaymentStatus };
