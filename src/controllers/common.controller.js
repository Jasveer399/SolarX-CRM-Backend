import prisma from "../DB/db.config.js";

const createConsumerAndPayment = async (req, res) => {
  const {
    // Consumer data
    quotationId,
    name,
    villageCity,
    mobileNumber,
    district,
    gst,
    gstAmount,
    totalPrice,
    // Payment specific data
    proposedSolarLoad,
    phase,
    subsidy,
    pspclAccountNo,
    pspdlSection,
    solarConnectionDemand,
  } = req.body;

  try {
    const result = await prisma.$transaction(async (prismaClient) => {
      // Update quotation
      await prismaClient.quotation.update({
        where: {
          id: quotationId,
        },
        data: {
          consumer: true,
        },
      });

      // Create consumer
      const consumer = await prismaClient.comsumer.create({
        data: {
          name,
          villageCity,
          mobileNumber,
          district,
          gst,
          gstAmount,
          totalPrice,
          pspclAccountNo,
          pspdlSection,
        },
      });

      // Create payment
      const payment = await prismaClient.payment.create({
        data: {
          name,
          mobileNumber,
          villageCity,
          district,
          phase: phase || "",
          totalProjectCost: parseFloat(totalPrice),
          subsidy,
          pspclAccountNo,
          pspdlSection,
          solarConnectionDemand,
        },
      });

      // create Final Submission
      await prismaClient.finalSubmissions.create({
        data: {
          consumerName: name,
          accountNo: pspclAccountNo,
          sanLoad: parseFloat(pspdlSection),
          solarLoad: parseFloat(proposedSolarLoad),
        },
      });

      return { consumer, payment };
    });

    return res.status(201).json({
      data: result,
      message: "Consumer and Payment Created Successfully!",
      status: true,
    });
  } catch (error) {
    console.error("Error in creating Consumer and Payment:", error);
    return res.status(500).json({
      error: error.message,
      message: "Error while creating Consumer and Payment!",
      status: false,
    });
  }
};

export { createConsumerAndPayment };
