import jwt from "jsonwebtoken"
import prisma from "../DB/db.config.js"

export const verifyJWT = () => async (req, res, next) => {
    console.log("headers token: ", req.header('Authorization'))
    console.log("cookies token", req.cookies?.accessToken)

    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized request !!",
                success: false,
            })
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const admin = await prisma.admin.findFirstOrThrow({
            where: {
                id: decodedToken?.id
            }
        })

        if (!admin) {
            return res.status(401).json({
                message: "Access token not found !!",
                success: false,
            })
        }
        req.user = admin
        next()

    } catch (error) {
        return res.status(401).json({
            message: "Invalid access token",
            success: false,
        })
    }
}