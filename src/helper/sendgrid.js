export const validateInputs = (data) => {
  const errors = [];

  if (!data.name) {
    errors.push({ name: "Name", message: "Name is required." });
  } else if (data.name.length > 30) {
    errors.push({
      name: "Name",
      message: "Name should be maximum 30 characters.",
    });
  }

  if (!data.email) {
    errors.push({ name: "Email", message: "Email is required." });
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push({ name: "Email", message: "Invalid email address." });
    }
  }

  if (!data.subject) {
    errors.push({ name: "Subject", message: "Subject is required." });
  } else if (data.subject.length > 110) {
    errors.push({
      name: "Subject",
      message: "Subject should be maximum 110 characters.",
    });
  }

  if (!data.message) {
    errors.push({ name: "Message", message: "Message is required." });
  } else if (data.message.length > 600) {
    errors.push({
      name: "Message",
      message: "Name should be maximum 600 characters.",
    });
  }

  return errors;
};

export const htmlCode = (name, email, message) => {
  return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Message from user</title>
        <meta name="description" content="The HTML5 Herald">
        <meta name="author" content="SitePoint">
        <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      </head>

      <body>
        <div style="display: flex;justify-content: center;
        align-items: center;border-radius: 5px;overflow: hidden;
        font-family: 'helvetica', 'ui-sans',serif;">
            <div style="margin-left: 20px;margin-right: 20px;">
                <h3>A new mail from <span style="color: dodgerblue">
                    ${name}
                </span>,
                their email is: ✉️${email} </h3>
                <div style="margin-top: -10px; font-size: 16px;">
                    <h4>Message:</h4>
                    <p style="border: 1px solid darkred; border-radius: 6px;
                    margin-top: -10px; padding: 10px; text-align: center">
                        ${message}
                    </p>
                </div>
            </div>
        </div>
      </body>
      </html>\``;
};
