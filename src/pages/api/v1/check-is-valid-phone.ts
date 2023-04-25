import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result?: string;
  error?: string;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { areaCode, phoneNumber } = req.body;

  try {
    if (areaCode && phoneNumber) {
      return res.status(200).json({ result: "Valid" });
    } else {
      return res.status(500).json({ error: `Failed to verify phone number` });
    }
  } catch (err) {
    res.status(500).json({ error: `${err}: Failed to verify phone number` });
  }
};
