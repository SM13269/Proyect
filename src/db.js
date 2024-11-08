import { createPool } from "mysql2/promise";
import {BD_HOST, DB_USER, DB_PASSWORD, BD_DATABASE, DB_PORT, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET} from './config.js'
export const conmysql=createPool({
    host: BD_HOST,
    database: BD_DATABASE,
    user: DB_USER,
    password:DB_PASSWORD,
    port:DB_PORT,
    cloudinary_cloud_name:CLOUDINARY_CLOUD_NAME,
    cloudinary_cloud_name_apy_key:CLOUDINARY_API_KEY,
    cloudinary_api_secret:CLOUDINARY_API_SECRET
})