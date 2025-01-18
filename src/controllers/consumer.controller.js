import prisma from "../DB/db.config.js";
const createConsumer = async (req, res) => {
  const { quotationId, name, villageCity, mobileNumber, district } = req.body;

  // console.log("Req Body =========>", req.body);

  try {
    await prisma.quotation.update({
      where: {
        id: quotationId,
      },
      data: {
        consumer: true,
      },
    });
    const createdConsumer = await prisma.comsumer.create({
      data: {
        name,
        villageCity,
        mobileNumber,
        district,
      },
    });
    // console.log("createdConsumer ==>", createdConsumer);

    if (!createdConsumer) {
      return res.status(500).json({
        message: "Server Error 500 !!",
        status: false,
      });
    }

    return res.status(201).json({
      data: createdConsumer,
      message: "Consumer Created Successfully !!",
      status: true,
    });
    // }
  } catch (error) {
    console.error("Error in createing a Consumer:", error);
    return res.status(500).json({
      error: error.message,
      message: "Error while creating Consumer !!",
      status: false,
    });
  }
};

const getAllConsumer = async (req, res) => {
  try {
    const siteVisit = await prisma.comsumer.findMany({
      where: {
        AND: [{ consumer: true }],
      },
      orderBy: [{ createdAt: "desc" }, { name: "asc" }],
    });
    return res.status(200).json({
      data: siteVisit,
      message: "All SiteVisit fetched Successfully!!",
      status: true,
    });
  } catch (error) {
    console.error("Error While fetching all siteVisit:", error);
    return res.status(500).json({
      error: error.message,
      message: "Error while fetching all siteVisit!!",
      status: false,
    });
  }
};

const getAllConsumerDetails = async (req, res) => {
  const { mobileNumber } = req.query;
  try {
    const leadsData = await prisma.leads.findUnique({
      where: {
        mobileNumber,
      },
      select: {
        sourceOfLead: true,
        currentSOL: true,
        callerName: true,
        assignedTo: true,
        noteForLead: true,
      },
    });
    const prospectData = await prisma.project.findUnique({
      where: {
        mobileNumber,
      },
      select: {
        pspclAccountNo: true,
        dscsSpInds: true,
        pspdlSection: true,
        solarConnectionDemand: true,
        phase: true,
        proposedSolarLoad: true,
        positiveNegative: true,
        successRate: true,
        visitStatus: true,
        noteForLead: true,
      },
    });
    const quotationData = await prisma.quotation.findUnique({
      where: {
        mobileNumber,
      },
      select: {
        subsidy: true,
        baseAmount: true,
        gst: true,
        totalPrice: true,
      },
    });

    return res.status(200).json({
      leadsData,
      prospectData,
      quotationData,
      message: "All Consumer Data fetched Successfully!!",
      status: true,
    });
  } catch (error) {
    console.error("Error While fetching all Consumer Data:", error);
    return res.status(500).json({
      error: error.message,
      message: "Error while fetching all Consumer Data!!",
      status: false,
    });
  }
};

export { createConsumer, getAllConsumer, getAllConsumerDetails };
