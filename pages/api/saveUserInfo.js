import {
  getAccessToken,
  withApiAuthRequired,
  useUser,
} from "@auth0/nextjs-auth0";
import { baseUrl } from "@utils/index";

export default withApiAuthRequired(async function products(req, res) {
  const { firstName, lastName } = req.body;
  const { accessToken } = await getAccessToken(req, res);

  // @Alamin help? Uncommenting below line gives: TypeError: Cannot read property 'useContext' of null
  // const { user } = useUser();
  // const user_id = user.sub;
  // const user_email = user.email

  const user_id = "hardcoded-user.sub";
  const user_email = "hardcoded-user.email";

  // console.log(user);
  const response = await fetch(`${baseUrl}/api/user`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      data: {
        user: {
          id: user_id,
          first_name: firstName,
          last_name: lastName,
          email: user_email,
          phone: "",
        },
      },
    }),
  });

  // @Alamin help? How can I return the response?
  // const data = await response.json();
  // res.status(200).json(data);
  res.status(200).json({ data: "OK" });
});
