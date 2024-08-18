import nodemailer from "nodemailer";
import "dotenv/config";
import { ethers } from "ethers";

function returnStr(tx, sim) {
  let str = `
<h2>Transaction Alert</h2>
<p>A transaction attempt has been detected that could potentially exploit a smart contract vulnerability. Below are the details:</p>

<h3>Transaction Details</h3>
<ul>
  <li><strong>From Address:</strong> ${tx.from}</li>
  <li><strong>To Address:</strong> ${tx.to}</li>
  <li><strong>Value:</strong> ${parseInt(
    tx.value,
    16
  )} wei (${ethers.utils.formatEther(tx.value)} ETH)</li>
  <li><strong>Data:</strong> ${tx.data}</li>
</ul>

<h3>Simulation Results</h3>
<p>The simulation indicated that the attempted transaction could result in a loss of <strong>${
    sim.rawAmount
  } wei (${ethers.utils.formatEther(sim.rawAmount)} ETH)</strong>.</p>

<p>This potential loss is significant and suggests that the smart contract is vulnerable to an attack that could drain funds.</p>

<p><strong>Immediate action is recommended to secure the smart contract and prevent any unauthorized transactions.</strong></p>

<p>Best regards,<br>Quills Security Team</p>

`;
  return str;
}

export default async function sendNotificationEmail(tx, sim) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bitax256@gmail.com", // your Gmail account
      pass: process.env.PASS, // your Gmail password
    },
  });

  let mailOptions = {
    from: "bitax256@gmail.com",
    to: "varshneychinu1204@gmail.com",
    subject: `⚠️Attack on smart contract⚠️`,
    html: returnStr(tx, sim),
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}
