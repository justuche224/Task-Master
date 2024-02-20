import Tasks from "@/components/Tasks";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="mt-14 text-center">
      <h1 className="orange_gradient head_text">Welcome to Task Master</h1>
      <p className="desc">
        Your all-in-one task management solution. Stay organized, track
        deadlines, and boost productivity with ease.
      </p>
      <br />
      <Suspense fallback={<p>loading...</p>}>
        <Tasks />
      </Suspense>
    </main>
  );
}
