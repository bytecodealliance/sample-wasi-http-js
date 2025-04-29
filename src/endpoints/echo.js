export { echo, echoHeaders };

// Echo the body of the request in the response
const echo = async (req) => {
  const bodyText = req.body ? await req.text() : "No body to echo";

  return new Response(bodyText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
};

// Echo all headers from the request in JSON format
const echoHeaders = (req) => {
  const headersObj = Object.fromEntries(req.headers.entries());
  return new Response(JSON.stringify(headersObj, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
