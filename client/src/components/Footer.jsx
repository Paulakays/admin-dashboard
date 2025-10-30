import React from "react";

const year = new Date().getFullYear();

function Footer() {
  return (
    <footer>
      <p>Copyright © {year}. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
