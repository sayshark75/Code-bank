import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { fonts } from "@/fonts/fonts";
import { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";
import Navigation from "@/components/Navigation/Navigation";

export const metadata: Metadata = {
  title: "Code Bank",
  description: "A Library to easily use pre-configured code snippets tailored to your project needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${fonts.montserrat.variable} ${fonts.rubik.variable} ${fonts.poppins.variable}`}>
      <body>
        <Providers>
          <Flex
            w={"100%"}
            pos={"relative"}
            minH={"100vh"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            bgColor={"light.250"}
            direction={["column", "column", "column", "column", "row"]}
          >
            <Navigation />
            {children}
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
