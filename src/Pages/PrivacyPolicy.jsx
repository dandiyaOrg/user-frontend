import React from "react";

const PrivacyPolicy = () => {
  return (
    <div style={{
      maxWidth: "600px",
      margin: "40px auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif"
    }}>
      <h2 style={{
        textAlign: "center",
        marginBottom: "24px"
      }}>
        Privacy Policy
      </h2>
      <p>
We at www.rkgarbanight.com respect your privacy and are committed to protecting your personal data.

<p>1. Information We Collect:
   - Name, email, phone number
   - Payment details (processed securely via our payment gateway)
   - Usage data such as IP address, browser type</p>

<p>2. How We Use Your Information:
   - To process ticket bookings/payments
   - To provide customer support
   - To send important event updates and promotions</p>

<p>3. Data Security:
   - We use SSL encryption and trusted third-party payment gateways.
   - We do not store sensitive payment information such as credit card details.</p>

<p>4. Sharing of Information:
   - We do not sell or rent your data.
   - Data may be shared with event organizers or payment processors only when required.</p>

<p>For any queries, contact us at support@rkgarbanight.com.</p>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
