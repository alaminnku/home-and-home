import axios from "axios";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { baseUrl } from "@utils/index";

export default withApiAuthRequired(async function handler(req, res) {
  // Check if the request method is POST
  if (req.method === "POST") {
    const { accessToken } = await getAccessToken(req, res);

    // Order data
    const data = JSON.stringify({
      data: {
        order: req.body.order,
      },
    });

    // User ID
    const userId = req.body.userId;

    try {
      // Post the data to backend
      const response = await axios.post(`${baseUrl}/api/order`, data, {
        headers: {
          userId,
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Return the status and response
      res.status(200).json(response.data.data);
    } catch (err) {
      console.log(err);
    }
  } else {
    // If the request is not a POST request
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} isn't allowed` });
  }
});
