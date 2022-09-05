export default async function handler(req, res) {
  // Check for the request method
  if (req.method !== "POST") {
    return res.status(400).json({
      message: "Invalid HTTP method. Only POST requests are allowed.",
    });
  }

  // Check for secret to confirm this is a valid request
  if (req.body.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Check for the body data
  if (!req.body) {
    return res.status(422).json({ message: "Invalid request body" });
  }

  try {
    await res.revalidate(`/${req.body.restaurantSlug}`);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
