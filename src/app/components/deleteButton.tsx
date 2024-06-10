"use client";
import axios from 'axios';
import { useRouter } from "next/navigation";


export default function DeleteButton({ id }: { id: String }) {
  const router = useRouter();

  const handleDelete = async (id: String) => {

    try {
      await axios.delete(`http://localhost:3000/posts/delete/${id}`);
      router.push("/dashboard");
    } catch (error) {
      console.log("error ===> ", error);
    }
  };
  
  return (
    <span
      className="mt-2 inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600 hover:cursor-pointer"
      onClick={() => handleDelete(id)}
    >
      Delete post
    </span>
  );
}
