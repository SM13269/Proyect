import { config } from 'dotenv'
config()

export const BD_HOST = process.env.BD_HOST || "btk8de7pxk98orbqfjrh-mysql.services.clever-cloud.com";
export const BD_DATABASE = process.env.BD_DATABASE || "b967al7qwdboag6auetk";
export const DB_USER = process.env.DB_USER || "ubomz9onehnbqisq";
export const DB_PASSWORD = process.env.DB_PASSWORD || "c0LbIFHw5EHWYP3gK2ry";
export const DB_PORT = process.env.DB_PORT || 3306;
export const PORT = process.env.PORT || 3000;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "Api_20242";
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || "853357716749581";
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || "eFwU8D93mcMIC2xmyTLnih_GH8s";