export default () => ({
  port: parseInt(process.env.PORT as string) || 3000,
  database: { url: process.env.DB_URL },
  mail: {
    user: process.env.USER_EMAIL,
    password: process.env.USER_PASS,
  },
  jwt: {
    accessSecret: process.env.ACCESS_TOKEN_SECRET
  },
  s3: {
    region: process.env.S3_REGION,
    bucketName: process.env.S3_BUCKET_NAME,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    expiresIn: parseInt(process.env.S3_EXPIRES_IN as string) || 1800,
  },
});
