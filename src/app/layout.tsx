import Notification from "@/components/Notification/Notification";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import UserProvider from "../context/UserProvider";
import WebSocket from "@/components/WebSocket/WebSocket";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aahar - Food Delivery Application",
  description: "Aahar - Food Delivery Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <UserProvider>
        <ToastContainer position="bottom-center" />
        <WebSocket />
        <Notification />
        <Navbar />
        {children}
        <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
