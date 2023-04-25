import axios from "axios";

//wrapper function for using axios to call nextjs api endpoint
const sendRequest = async (options) => {
  const { endpoint, data, ...rest } = options;
  try {
    const response = await axios({
      method: "post",
      url: endpoint,
      data: data,
      ...rest,
    });
    const result = response.data;
    return { status: "success", result: result };
  } catch (error) {
    // console.log("error", error);
    return { status: "error", error: error };
  }
};

export async function handleIsValidPhone({ areaCode, phoneNumber }) {
  const result = await sendRequest({
    endpoint: "/api/v1/check-is-valid-phone",
    data: {
      areaCode: areaCode,
      phoneNumber: phoneNumber,
    },
  });
  return result;
}
