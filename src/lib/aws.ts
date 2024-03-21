import { S3Client } from "@aws-sdk/client-s3"

export const s3 = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.ACCESS!,
    secretAccessKey: process.env.SECRET!,
  },
})
