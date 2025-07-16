import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Lexend } from "next/font/google";
import "../styles/globals.scss";
import { PrimeReactProvider } from 'primereact/api';


const inter = Inter({ subsets: ["latin"] });
const lexend = Lexend({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal'],
  subsets: ['latin']
  
})

export const metadata: Metadata = {
  title: "Fernanda Pestana Despachante Fluvial",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PrimeReactProvider>
      <html lang="pt-br" style={{ scrollBehavior: 'smooth' }}>
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,700,0,0" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />

          <style>
          @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
          </style>
          <style>
          @import url('https://fonts.googleapis.com/css2?family=Ancizar+Serif:ital,wght@0,300..900;1,300..900&family=Geist:wght@100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
          </style>

        </head>
        <body className={lexend.className} style={{margin: 0}}>{children}</body>
      </html>
    </PrimeReactProvider>
  );
}
