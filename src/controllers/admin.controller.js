import prisma from "../DB/db.config.js";
import {
  decryptPassword,
  encryptPassword,
} from "../utils/passwordEncryptDecrypt.js";
import { generateAccessToken } from "../utils/generateAccessToken.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

const accessTokenGenerator = async (adminId) => {
  try {
    const admin = await prisma.admin.findFirstOrThrow({
      where: {
        id: adminId,
      },
    });
    const accessToken = await generateAccessToken(
      admin.id,
      admin.email,
      admin.adminType
    );

    return { accessToken };
  } catch (error) {
    return res.status(400).json({
      error: error.messaage,
      messaage: "Something went wrong while creating access token !!",
      success: false,
    });
  }
};

const createAdmin = async (req, res) => {
  const { name, email, password, adminType, imageUrl } = req.body;

  try {
    if (!name && !email && !password && !adminType) {
      return res.status(400).json({
        message: "All Field's are required !!",
        status: false,
      });
    }

    const userExist = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (userExist) {
      return res.status(500).json({
        message: "Email Already Exists !!",
        status: false,
      });
    }

    const encryptedPassword = await encryptPassword(password);

    if (!encryptedPassword) {
      return res.status(500).json({
        message: "Error while password encryption. Try Later !!",
        status: false,
      });
    }

    const createdUser = await prisma.admin.create({
      data: {
        name,
        email,
        password: encryptedPassword,
        adminType,
        imageUrl: imageUrl ? imageUrl : "",
      },
    });

    if (!createdUser) {
      return res.status(500).json({
        message: "Server Error 500 !!",
        status: false,
      });
    }

    return res.status(200).json({
      data: createdUser,
      message: "Admin created !!",
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Error while creating admin !!",
      status: false,
    });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email && !password) {
      return res.status(400).json({
        error: error.message,
        message: "All field's are required !!",
        status: false,
      });
    }

    const admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (!admin) {
      return res.status(500).json({
        error: error.message,
        message: "Admin not found. Check your email correctly !!",
        status: false,
      });
    }

    const isPasswordCorrect = await decryptPassword(password, admin.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        error: error.message,
        message: "Wrong Password !!",
        status: false,
      });
    }

    const { accessToken } = await accessTokenGenerator();

    const options = {
      httpOnly: false,
      secure: false,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json({
        data: {
          name: admin.name,
          id: admin.id,
          adminType: admin.adminType,
          email: admin.email,
          imageUrl: admin.imageUrl,
        },
        message: "Logged In Successfully !!",
        status: true,
      });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Admin not found. Check your email correctly !!",
      status: false,
    });
  }
};

const logoutAdmin = async (req, res) => {
  try {
    await prisma.admin.findFirstOrThrow({
      where: {
        id: req.user?.id,
      },
    });

    const options = {
      httpOnly: false,
      secure: false,
    };

    res.clearCookie("accessToken", options);
    return res.status(200).json({
      message: "Logged out Successfully !!",
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Error while logging out admin !!",
      status: false,
    });
  }
};

const updateImage = async (req, res) => {
  console.log(req.file);
  try {
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
      return res.status(400).json({
        message: "Image not found !!",
        status: false,
      });
    }
    console.log(avatarLocalPath);
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar) {
      return res.status(500).json({
        message:
          "Error while uploading image on cloudinary. Try Again Later !!",
        status: false,
      });
    }

    await prisma.admin.update({
      where: {
        id: req.user?.id,
      },
      data: {
        imageUrl: avatar,
      },
    });

    fs.unlinkSync(avatarLocalPath);

    return res.status(200).json({
      data: avatar,
      message: "Avatar Updated Successfully !!",
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Error while updating image !!",
      status: false,
    });
  }
};

export { createAdmin, loginAdmin, logoutAdmin, updateImage };
