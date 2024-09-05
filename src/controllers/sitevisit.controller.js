import prisma from "../DB/db.config.js";
import { formatDate } from "../utils/DateFormate.js";

const createSiteVisit = async (req, res) => {
  const { name, villageCity, mobileNumber, district, pspclAccountNumber } =
    req.body;
  try {
    // Check if Quotation already exists for this mobileNumber
    // const existingPayment = await prisma.payment.findFirst({
    //   where: { mobileNumber },
    // });
    // await prisma.quotation.update({
    //   where: {
    //     mobileNumber,
    //   },
    //   data: {
    //     paymentDone: true,
    //   },
    // });
    const createdSiteVisit = await prisma.siteVisit.create({
      data: {
        name,
        villageCity,
        mobileNumber,
        district,
        pspclAccountNumber,
      },
    });

    if (!createdSiteVisit) {
      return res.status(500).json({
        message: "Server Error 500 !!",
        status: false,
      });
    }

    return res.status(201).json({
      data: createdSiteVisit,
      message: "SiteVisit Created Successfully !!",
      status: true,
    });
    // }
  } catch (error) {
    console.error("Error in createing a SiteVisit:", error);
    return res.status(500).json({
      error: error.message,
      message: "Error while creating SiteVisit !!",
      status: false,
    });
  }
};

const getAllSiteVisit = async (req, res) => {
  try {
    const siteVisit = await prisma.siteVisit.findMany();
    // const filterQuotation = payments.filter((pay) => pay.paymentDone === true);
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

const updateSiteVisit = async (req, res) => {
  const {
    id,
    mobileNumber,
    name,
    district,
    villageCity,
    pspclAccountNumber,
    subDivision,
    dateOfVisit,
    siteLocation,
    pic1,
    pic2,
    pic3,
    pic4,
    pic5,
  } = req.body;

  try {
    const updatedPayment = await prisma.siteVisit.update({
      where: { id },
      data: {
        mobileNumber,
        name,
        district,
        villageCity,
        pspclAccountNumber,
        subDivision,
        dateOfVisit,
        siteLocation,
        pic1,
        pic2,
        pic3,
        pic4,
        pic5,
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

export { createSiteVisit, getAllSiteVisit, updateSiteVisit };
