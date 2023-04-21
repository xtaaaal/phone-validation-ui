import jwt_decode from "jwt-decode";

export const getEndpoint = () => {
  const currentEnv = process.env.NEXT_PUBLIC_CURRENT_ENV;
  return currentEnv === "production"
    ? process.env.PROD_CMS_API_ENDPOINT
    : process.env.CMS_API_ENDPOINT;
};

export const checkValidFields = (input, requiredFields) => {
  const missingFields = requiredFields.filter(
    (field) =>
      input[field] === null || input[field] === undefined || input[field] === ""
  );

  if (missingFields.length > 0) {
    console.log("missing", missingFields);
    throw new Error(`missing fields: ${missingFields.join(", ")}`);
  }
};

export const checkTokenExpiration = (token) => {
  const decoded = jwt_decode(token);
  const exp = decoded.exp;
  //check if token is expired, return status valid or expired
  if (exp < Date.now() / 1000) {
    return "expired";
  }
  return "valid";
};
