import prisma from "../DB/db.config.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { formatDate } from "../utils/DateFormate.js";
import fs from "fs";
const createSiteVisit = async (req, res) => {
  const {
    name,
    villageCity,
    mobileNumber,
    district,
    pspclAccountNumber,
    assignedTo,
    subsidy,
  } = req.body;
  try {
    await prisma.quotation.update({
      where: {
        mobileNumber,
      },
      data: {
        sitevist: true,
      },
    });
    const createdSiteVisit = await prisma.siteVisit.create({
      data: {
        name,
        villageCity,
        mobileNumber,
        district,
        pspclAccountNumber,
        assignedTo,
        subsidy,
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
    const siteVisit = await prisma.siteVisit.findMany({
      where: {
        AND: [{ sitevist: true }, { paymentDone: false }],
      },
      orderBy: { createdAt: "desc" },
    });
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
  console.log("updateSiteVisit =>", req.body);
  const {
    id,
    mobileNumber,
    name,
    district,
    villageCity,
    assignedTo,
    pspclAccountNumber,
    subDivision,
    dateOfVisit,
    siteLocation,
  } = req.body;

  try {
    const updatedPayment = await prisma.siteVisit.update({
      where: { id },
      data: {
        mobileNumber,
        name,
        district,
        villageCity,
        assignedTo,
        pspclAccountNumber,
        subDivision,
        dateOfVisit,
        siteLocation,
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
const updateSiteViewImage = async (req, res) => {
  try {
    const { id, picField } = req.body;
    const siteVisitImageLocalPath = req.file?.path;

    console.log("Request Body =>", req.body);
    console.log("siteVisitImageLocalPath =>", siteVisitImageLocalPath);

    if (!siteVisitImageLocalPath) {
      return res.status(400).json({
        message: "Image not found !!",
        status: false,
      });
    }

    if (!["pic1", "pic2", "pic3", "pic4", "pic5"].includes(picField)) {
      return res.status(400).json({
        message: "Invalid picture field specified",
        status: false,
      });
    }

    const siteImage = await uploadOnCloudinary(siteVisitImageLocalPath);

    if (!siteImage) {
      return res.status(500).json({
        message:
          "Error while uploading image on cloudinary. Try Again Later !!",
        status: false,
      });
    }

    const updatedSiteVisitData = await prisma.siteVisit.update({
      where: {
        id: id,
      },
      data: {
        [picField]: siteImage,
      },
    });

    fs.unlinkSync(siteVisitImageLocalPath);

    return res.status(200).json({
      data: {
        [picField]: siteImage,
      },
      message: "Site Visit Image Updated Successfully !!",
      status: true,
    });
  } catch (error) {
    console.error("Error in updateSiteViewImage:", error);
    return res.status(500).json({
      error: error.message,
      message: "Error while updating image !!",
      status: false,
    });
  }
};

export {
  createSiteVisit,
  getAllSiteVisit,
  updateSiteVisit,
  updateSiteViewImage,
};
