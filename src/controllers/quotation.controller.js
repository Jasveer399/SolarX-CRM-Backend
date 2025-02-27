import prisma from "../DB/db.config.js";
import { uploadLocal, uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

const createQuotation = async (req, res) => {
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
    projectId,
  } = req.body;
  try {
    const existingQuotation = await prisma.quotation.findFirst({
      where: { mobileNumber },
    });
    const project = await prisma.project.update({
      where: {
        id: projectId,
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
            projectId: projectId,
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
    pspclAccountNo,
    sanLoad,
    proposedSolarLoad,
    subsidy,
    baseAmount,
    gst,
    gstAmount,
    totalPrice,
    noteforQuotation,
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
        pspclAccountNo,
        noteforQuotation,
        subsidy,
        baseAmount,
        gst,
        gstAmount,
        totalPrice,
      },
    });

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

    const imageUrl = await uploadLocal(req.file, "site-visits");

    console.log("imageUrl =>", imageUrl);

    if (!imageUrl) {
      return res.status(500).json({
        message: "Error while uploading image. Try Again Later !!",
        status: false,
      });
    }

    const updatedSiteVisitData = await prisma.quotation.update({
      where: {
        id: id,
      },
      data: {
        [picField]: imageUrl,
      },
    });

    return res.status(200).json({
      data: {
        [picField]: imageUrl,
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
const deleteQuotation = async (req, res) => {
  const { quotationId } = req.params;
  try {
    const deletedPayment = await prisma.quotation.delete({
      where: {
        id: quotationId,
      },
    });
    return res.status(200).json({
      data: deletedPayment,
      message: "Quotation Deleted Successfully !!",
      status: true,
    });
  } catch (error) {
    console.error("Error while deleting Lead:", error);
    return res.status(500).json({
      error: error.message,
      message: "Error while deleting Lead!!",
      status: false,
    });
  }
};

const backToLead = async (req, res) => {
  try {
    const { projectId, quotationId, mobileNumber } = req.body;
    const result = await prisma.$transaction(async (prisma) => {
      // First, find the lead
      const existingLead = await prisma.leads.findFirst({
        where: {
          OR: [
            {
              project: {
                id: projectId,
              },
            },
            {
              mobileNumber: mobileNumber,
            },
          ],
        },
      });

      if (!existingLead) {
        throw new Error("Lead not found");
      }

      // Update the lead using its ID
      const lead = await prisma.leads.update({
        where: {
          id: existingLead.id,
        },
        data: {
          isConvertToProject: false,
          finalStatus: "InProgress",
        },
      });

      // Update the quotation
      const quotation = await prisma.quotation.update({
        where: {
          id: quotationId,
        },
        data: {
          isQuotation: false,
        },
      });

      console.log("Leads ===>", lead);
      console.log("quotation ==>", quotation);

      return { lead, quotation };
    });

    res.status(200).json({
      lead: result.lead,
      quotation: result.quotation,
      message: "Quotation Successfully Back To Lead",
      status: false,
    });
  } catch (error) {
    console.error("Error in backToLead:", error);
    return res.status(500).json({
      error: error.message,
      message: "Error while backToLead!!",
      status: false,
    });
  }
};

export {
  createQuotation,
  getAllQuotations,
  updateQuotation,
  upLoadSiteViewImage,
  deleteQuotation,
  backToLead,
};
