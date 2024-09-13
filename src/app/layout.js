import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import Cookie from "./shared/Cookie";
import Footer from "./shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ştiridirect.ro",
  description:
    "Aici găsești cele mai recente știri și evenimente importante, toate într-un singur loc. Fii la curent cu cele mai noi informații și nu rata nimic!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-CVX7L2YKTT"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-CVX7L2YKTT');
          `}
      </Script>
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1358591178432800');
          fbq('track', 'PageView');
        `}
      </Script>

      <body className={inter.className}>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1358591178432800&ev=PageView&noscript=1"
          />
        </noscript>
        <ToastContainer />
        <Cookie />

        {children}
        <Footer />
      </body>
    </html>
  );
}
