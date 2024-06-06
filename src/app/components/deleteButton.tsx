"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {
      console.log("error ===> ", error);
    }
  };

  return <button onClick={() => handleDelete(id)}>Delete</button>;