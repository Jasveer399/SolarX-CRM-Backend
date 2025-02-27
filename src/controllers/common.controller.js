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
    phase,
    subsidy,
    pspclAccountNo,
    pspdlSection,
    solarConnectionDemand,
  } = req.body;

  console.log("Req Body =========>", req.body);
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
          subsidy,
          pspclAccountNo,
          pspdlSection,
          solarConnectionDemand,
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
