export { sleep };

// Async sleep function that returns a response after waiting
const sleep = async (ms) => {
  const msNum = parseInt(ms, 10);
  await new Promise((resolve) => setTimeout(resolve, msNum));

  return new Response(`Sleeping for ${ms}ms...`, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
