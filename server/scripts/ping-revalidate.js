// server/scripts/ping-revalidate.js
import axios from "axios";

const ENDPOINT =
  process.env.REVALIDATE_ENDPOINT || "http://localhost:3000/api/revalidate";
const TOKEN =
  process.env.REVALIDATE_TOKEN || process.env.PUBLIC_REVALIDATE_TOKEN;

export async function revalidate(paths) {
  if (!paths) return null;
  // normalize
  const body = { paths };

  try {
    const res = await axios.post(ENDPOINT, body, {
      headers: {
        "Content-Type": "application/json",
        "x-revalidate-token": TOKEN,
      },
      timeout: 15000,
    });
    console.log("Revalidate response:", res.data);
    return res.data;
  } catch (err) {
    console.error(
      "Revalidate error:",
      err?.response?.data || err.message || err
    );
    throw err;
  }
}
