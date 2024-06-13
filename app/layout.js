import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { dbConnect } from "@/services/dbConnect";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "EduConnect- World's best learning platform",
  description: "Explore || Learn || Share",
};

export default async function RootLayout({ children }) {
  await dbConnect()
  return (
    <html lang="en">
      <body className={cn(inter.className, poppins.className)}>{children} 
        <Toaster richColors position="top-center"/>
      </body>
    </html>
  );
}
