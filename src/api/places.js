const BASE_URL = "http://localhost:3000/";

export async function getReview() {
  const res = await fetch(BASE_URL + "places", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Review");
  }
}
