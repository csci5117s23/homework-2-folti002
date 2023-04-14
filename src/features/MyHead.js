import Head from "next/head";

// Header for each page to keep consistent logo and title
export default function MyHead() {
  return (
    <Head>
      <title>GeoDo List</title>
      <link rel="icon" href="/GeoDoListLogo.png" />
    </Head>
  );
}