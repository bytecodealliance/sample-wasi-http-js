export { upload };

// Endpoint to handle file uploads using FormData and Blob
const upload = async (req) => {
  try {
    const blob = await req.blob();

    if (!blob || !(blob instanceof Blob)) {
      return new Response("File not found in form data.", { status: 400 });
    }

    const text = await blob.text();

    return new Response(text, {
      headers: {
        "Content-Type": blob.type || "application/octet-stream",
      },
    });
  } catch (error) {
    return new Response(`Error processing form data: ${error}`, {
      status: 500,
    });
  }
};
