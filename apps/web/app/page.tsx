"use client";
import { trpc } from "~/trpc/client";

export default function Home() {
  const { data } = trpc.chaicode.useQuery({ email: "Kunalmadoliya@gmail.com", name: "Kunal", phone: 1234567890 });
  return (
    <main className="min-h-screen min-w-screen flex justify-center items-center">
      <div>
        <p>{data?.message}</p>
      </div>
    </main>
  );
}
