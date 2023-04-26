import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result?: { label: string; value: string };
  error?: string;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    return res.status(200).json({ result: { label: "+852", value: "+852" } });
  } catch (err) {
    res.status(500).json({ error: `${err}: Failed to get area code` });
  }
};
