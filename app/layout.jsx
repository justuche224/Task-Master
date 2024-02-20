import TopBar from "@/components/nav/TopBar";
import Provider from "@/components/Provider";
import "@/styles/globals.css";

export const metadata = {
  title: "Task Master",
  description:
    "Task Master: Your all-in-one task management solution. Stay organized, track deadlines, and boost productivity with ease. Sign in with Google for seamless access, and master your tasks effortlessly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body>
        <Provider>
          <TopBar />
          <section className=" mt-[5rem]">{children}</section>
        </Provider>
      </body>
    </html>
  );
}
