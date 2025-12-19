import { redirect } from "next/navigation";
import { getCurrentUserServer } from "../lib/authServer";
import Link from "next/link";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await getCurrentUserServer();

  // Check if user is not logged in then force to /user/login
  if(!user || user.role!=="ADMIN"){
    redirect("/");
  }
  
  return (
    <>
        {children}
    </>  
  );
}