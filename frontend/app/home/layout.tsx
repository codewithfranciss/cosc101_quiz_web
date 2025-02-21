import Navbar from "@/components/ui/navbar";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="">{children}</main>
      </body>
    </html>
  );
}
