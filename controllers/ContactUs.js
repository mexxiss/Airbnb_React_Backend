import { ContactUsModel } from "../models/ContactUs.js";
import SendQuery from "../models/SendContactQuery.js";
import { mailSender } from "../utils/mailSender.js";
import { sendAcknowledgmentEmail } from "../utils/sendAcknowledgmentEmail.js";
import sendQueryContactEmail from "../utils/sendQueryContactEmail.js";

export const createContactus = async (req, res) => {
  try {
    const contact = new ContactUsModel(req.body);
    const savedContact = await contact.save();
    res.status(201).json({
      success: true,
      data: savedContact,
      msg: "contact created successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getContactus = async (req, res) => {
  try {
    const contacts = await ContactUsModel.find();
    res.status(200).json({
      success: true,
      data: contacts[0]._doc,
      msg: "contacts featched successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const sendContactQuery = async (req, res) => {
  try {
    const { fullname, email, phone, subject, message } = req.body;

    if (!fullname || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    const emailSubject = `${subject}`;
    const recipientEmail = process.env.GMAIL; // Admin email where the queries should be sent

    const htmlToSend = `
      <h2>New Query Received </h2>
      <p><strong>Name:</strong> ${fullname}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    await sendQueryContactEmail(
      email,
      recipientEmail,
      emailSubject,
      htmlToSend
    );

    const sendQuery = new SendQuery(req.body);
    await sendQuery.save();

    setTimeout(async () => {
      await sendAcknowledgmentEmail(email, fullname);
    }, 1000);
    res.status(200).json({
      success: true,
      message: "Your query has been submitted successfully.",
    });
  } catch (error) {
    console.error("Error in /contact route:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};