import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function products(req, res) {
  const { firstName, lastName } = req.body;
  const { accessToken } = await getAccessToken(req, res);

  const response = await fetch(
    "https://api.example.com/products",
    {
      firstName,
      lastName,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = response.json();

  res.status(200).json(data);
});
