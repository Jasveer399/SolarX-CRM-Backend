import prisma from "../DB/db.config.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { formatDate } from "../utils/DateFormate.js";
import fs from "fs";

const createQuotation = async (req, res) => {
  console.log("Req.Body =>", req.body);
  const {
    mobileNumber,
    name,
    villageCity,
    district,
    assignedTo,
    phase,
    pspdlSection,
    solarConnectionDemand,
    pspclAccountNo,
    proposedSolarLoad,
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
            villageCity,
            district,
            assignedTo,
            phase,
            pspdlSection,
            solarConnectionDemand,
            pspclAccountNo,
            proposedSolarLoad,
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
    const quotations = await prisma.quotation.findMany({
      where: {
        AND: [{ consumer: false }, { isQuotation: true }],
      },
      orderBy: [{ createdAt: "desc" }, { name: "asc" }],
    });
    return res.status(200).json({
      data: quotations,
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
    solarConnectionDemand,
    district,
    villageCity,
    assignedTo,
    pspdlSection,
    sanLoad,
    proposedSolarLoad,
    subsidy,
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
        solarConnectionDemand,
        district,
        villageCity,
        assignedTo,
        pspdlSection,
        sanLoad,
        proposedSolarLoad,
        subsidy,
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

const upLoadSiteViewImage = async (req, res) => {
  console.log("UpLoadSiteViewImage Req.Body =>", req.body);
  try {
    const { id, picField } = req.body;
    const siteVisitImageLocalPath = req.file?.path;

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

    const updatedSiteVisitData = await prisma.quotation.update({
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
  createQuotation,
  getAllQuotations,
  updateQuotation,
  upLoadSiteViewImage,
};
