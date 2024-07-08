const BASE_URL = "http://localhost:3000/";

export async function getReview() {
  // Fetch uses an options object as a second arg to make requests
  // other than basic GET requests, include data, headers, etc.
  // const searchParams = new URLSearchParams({ email: email });
  // const getLoginDetailsURL = BASE_URL + "/login?" + searchParams;
  // console.log(getLoginDetailsURL);

  // const res = await fetch(BASE_URL + "reviews", {
  //   method: "GET",
  //   headers: { "Content-Type": "application/json" },
  //   // Fetch requires data payloads to be stringified
  //   // and assigned to a body property on the options object
  // });

  // const res = await fetch(BASE_URL + "dishes", {
  //   method: "GET",
  //   headers: { "Content-Type": "application/json" },
  //   // Fetch requires data payloads to be stringified
  //   // and assigned to a body property on the options object
  // });

  const res = await fetch(BASE_URL + "places", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    // Fetch requires data payloads to be stringified
    // and assigned to a body property on the options object
  });
  // Check if request was successful
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Review");
  }
}
