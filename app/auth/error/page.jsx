"use client";

import { useRouter } from "next/router";

const ErrorPage = () => {
  const router = useRouter();
  const error = router.query.error || "Unknown Error";

  return (
    <div className="w-full grid place-content-center text-center">
      <h1 className="text-2xl font-bold">Error</h1>
      <p className="text-red-500 text-xl">{error}</p>
      <button onClick={() => router.push("/")}>Go home</button>
    </div>
  );
};

export default ErrorPage;
