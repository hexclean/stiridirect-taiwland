"use client";

import CookieConsent from "react-cookie-consent";

const Cookie = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      cookieName="terms"
      style={{ background: "#2B373B" }}
      buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
      expires={150}
    >
      <span style={{ fontSize: "14px" }}>
        Pentru scopuri precum afișarea de conținut personalizat, folosim module
        cookie sau tehnologii similare. Apăsând Accept, ești de acord să permiți
        colectarea de informații prin cookie-uri sau tehnologii similare.
      </span>
    </CookieConsent>
  );
};

export default Cookie;
