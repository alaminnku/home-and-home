import axios from "axios";
import { baseUrl } from "@utils/index";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function products(req, res) {
  // Check if the request method is POST
  if (req.method === "POST") {
    const { firstName, lastName, userId, userEmail, userPhone } = req.body;
    const { accessToken } = await getAccessToken(req, res);

    // Stringify the data
    const data = JSON.stringify({
      data: {
        user: {
          id: userId,
          first_name: firstName,
          last_name: lastName,
          email: userEmail,
          phone: userPhone,
        },
      },
    });

    try {
      // Post the data to backend
      const response = await axios.post(`${baseUrl}/api/user`, data, {
        headers: {
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
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
});
