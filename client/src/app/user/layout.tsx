
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // Check if user is not logged in then force to /user/login
  
  return (
    <>
        {children}
    </>  
  );
}