import prisma from "../DB/db.config.js";

const createPSPCL = async (req, res) => {
  const {
    mobileNumber,
    name,
    villageCity,
    district,
    subsidy,
    phase,
    pspdlSection,
    solarConnectionDemand,
  } = req.body;

  try {
    const existpspcl = await prisma.pspcl.findFirst({
      where: {
        mobileNumber,
      },
    });
    if (existpspcl) {
      return res.status(400).json({
        message: "PSPCL Already Exists !!",
        status: false,
      });
    }
    const createdPSPCL = await prisma.pspcl.create({
      data: {
        mobileNumber,
        name,
        villageCity,
        district,
        subsidy,
        phase,
        pspdlSection, // This is pspclSanLoad
        solarConnectionDemand,
      },
    });

    if (!createdPSPCL) {
      return res.status(500).json({
        message: "Server Error 500 !!",
        status: false,
      });
    }

    return res.status(201).json({
      data: createdPSPCL,
      message: "PSPCL Record Created Successfully !!",
      status: true,
    });
  } catch (error) {
    console.error("Error in creating Stock Management record:", error);
    return res.status(500).json({
      error: error.message,
      message: "Error while creating Stock Management record !!",
      status: false,
    });
  }
};

const getAllPSPCL = async (req, res) => {
  try {
    const allPspcl = await prisma.pspcl.findMany();
    if (!allPspcl) {
      return res.status(404).json({
        message: "PSPCL not found",
        status: false,
      });
    } else {
      return res.status(200).json({
        data: allPspcl,
        message: "PSPCL fetched successfully",
        status: true,
      });
    }
  } catch (error) {
    console.error("Error in getAllPSPCL:", error);
    return res.status(500).json({
      error: error.message,
      message: "Error while fetching PSPCL !!",
      status: false,
    });
  }
};

const updatePspcl = async (req, res) => {
  const {
    id,
    mobileNumber,
    name,
    villageCity,
    district,
    subsidy,
    phase,
    pspdlSection,
    solarConnectionDemand,
    dateApplied,
    daysElapsed,
    email,
    password,
    pspclAccountNumber,
    newAccountNumberNonSap,
    fileSubmittedInOffice,
    processingFeePaid,
    processingFeeAmount,
    dateOfPayment,
    feasibilityCleared,
    estimatePass,
    estimateFeeDeposit,
    estimateAmount,
    meterDrawn,
    meterInstalled,
    installationDate,
    consumerPictureUploaded,
    panelInverterUploaded,
    pspclInspectionClear,
    chequeUploaded,
    subsidyReleased,
    subsidyReleaseDate,
    pspclDivision,
    subDivisionName,
    raMobileNumber,
    jeMobileNumber,
    sdoMobileNumber,
  } = req.body;

  console.log("Update PSPCL Data ::::::::::::::=>", req.body);

  try {
    const updatedPspcl = await prisma.pspcl.update({
      where: { id },
      data: {
        mobileNumber,
        name,
        villageCity,
        district,
        subsidy,
        phase,
        pspdlSection,
        solarConnectionDemand,
        dateApplied,
        daysElapsed,
        email,
        password,
        pspclAccountNumber,
        newAccountNumberNonSap,
        fileSubmittedInOffice,
        processingFeePaid,
        processingFeeAmount: processingFeeAmount
          ? parseFloat(processingFeeAmount)
          : null,
        dateOfPayment,
        feasibilityCleared,
        estimatePass,
        estimateFeeDeposit,
        estimateAmount: estimateAmount ? parseFloat(estimateAmount) : null,
        meterDrawn,
        meterInstalled,
        installationDate,
        consumerPictureUploaded,
        panelInverterUploaded,
        pspclInspectionClear,
        chequeUploaded,
        subsidyReleased,
        subsidyReleaseDate,
        pspclDivision,
        subDivisionName,
        raMobileNumber,
        jeMobileNumber,
        sdoMobileNumber,
      },
    });

    if (!updatedPspcl) {
      return res.status(404).json({
        message: "PSPCL data not found",
        status: false,
      });
    }

    return res.status(200).json({
      data: updatedPspcl,
      message: "PSPCL Data Updated Successfully!!",
      status: true,
    });
  } catch (error) {
    console.error("Error while updating PSPCL data:", error);
    return res.status(500).json({
      error: error.message,
      message: "Error while updating PSPCL data!!",
      status: false,
    });
  }
};

export { createPSPCL, getAllPSPCL, updatePspcl };
