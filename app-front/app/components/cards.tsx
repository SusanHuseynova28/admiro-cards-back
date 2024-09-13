"use client";

import { useEffect, useState } from "react";
import { useRequestMutation } from "../_http/axiosFetcher";
import { CheckStatus } from "../_utils/CheckStatus";
import clsx from "clsx";
import { toast } from "react-toastify";

interface ICard {
  createdAt: string;
  description: string;
  status: string;
  title: string;
}

export default function Home() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const {
    data,
    trigger: loadData,
    isMutating: isLoading,
    error,
  } = useRequestMutation("todos", {
    method: "GET",
    module: "devApi",
  });

  const {
    trigger,
    isMutating,
    error: createTodoError,
  } = useRequestMutation("todos", {
    method: "POST",
    module: "devApi",
  });

  const {
    trigger: deleteTodo,
    isMutating: deleteMutating,
    error: DeleteError,
  } = useRequestMutation("deletetodo", {
    method: "DELETE",
    module: "devApi",
  });

  const handleDelete = async (id: any) => {
    console.log(id,'deletedItem')
    try {
      await deleteTodo({
        dynamicValue: id,
      }).then((res) => {
        loadData();
      });
      toast.success("Deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await trigger({
        body: form,
      }).then((res) => {
        loadData();
        toast.success(res.message);
        Object.keys(form).forEach((key) => {
          setForm((prev) => ({ ...prev, [key]: "" }));
        });
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (error) {
    return (
      <button className="bg-red-100 text-red-600 rounded-md p-2">
        {error.message as string}
      </button>
    );
  }

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="border-gray-300 h-12 w-12 animate-spin rounded-full border-4 border-t-green-600" />
      </div>
    );
  }

  const cards = [
    {
      id: 1,
      title: "Cutting-Edge Design",
      description:
        "The design is responsive and works on tablets and mobile devices.",
      issues: 12,
      resolved: 5,
      comment: 7,
      progress: 70,
      status: "doing",
      avatars: ["avatar1.jpg", "avatar2.jpg", "avatar3.jpg"],
    },
    {
      id: 2,
      title: "Customization Options",
      description:
        "The design maintains consistency, color scheme, and typography.",
      issues: 24,
      resolved: 24,
      comment: 40,
      progress: 100,
      status: "done",
      avatars: ["avatar1.jpg", "avatar2.jpg"],
    },
    {
      id: 3,
      title: "Mobile-Friendly",
      description:
        "The design incorporates error handling and feedback mechanisms.",
      issues: 40,
      resolved: 40,
      comment: 20,
      progress: 100,
      status: "done",
      avatars: ["avatar1.jpg", "avatar2.jpg", "avatar3.jpg"],
    },
    {
      id: 4,
      title: "Universal Admin Design",
      description: "Designed to be responsive with customizable options.",
      issues: 24,
      resolved: 24,
      comment: 40,
      progress: 100,
      status: "done",
      avatars: ["avatar1.jpg", "avatar2.jpg", "avatar3.jpg"],
    },
    {
      id: 5,
      title: "Modular Structure",
      description:
        "Attention is given to readability and visual extensiveness.",
      issues: 12,
      resolved: 5,
      comment: 7,
      progress: 70,
      status: "doing",
      avatars: ["avatar1.jpg", "avatar2.jpg", "avatar3.jpg"],
    },
    {
      id: 6,
      title: "Dazzling Admin Design",
      description:
        "User-friendly navigation with organized categories and subcategories.",
      issues: 40,
      resolved: 40,
      comment: 20,
      progress: 100,
      status: "done",
      avatars: ["avatar1.jpg", "avatar2.jpg"],
    },
  ];

  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="max-w-[500px] mx-auto my-5">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            className="p-3 rounded-md w-full border-2 border-gray-300 outline-none"
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
            value={form.title}
          />
          <input
            className="p-3 rounded-md w-full border-2 border-gray-300 outline-none"
            type="text"
            placeholder="Description"
            name="description"
            onChange={handleChange}
            value={form.description}
          />
          <select
            className="p-3 rounded-md w-full outline-none border-2 border-gray-300"
            name="status"
            onChange={handleChange}
            value={form.status}
          >
            <option value="pending">Pending</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
          <button
            disabled={isMutating}
            className="bg-green-100 flex justify-center items-center disabled:bg-gray-300 disabled:cursor-not-allowed w-full text-green-600 rounded-md p-2"
            type="submit"
          >
            {isMutating ? (
              <div className="border-gray-300 h-6 w-6 animate-spin rounded-full border-2 border-t-blue-600" />
            ) : (
              "Create"
            )}
          </button>
        </form>
      </div>

      {DeleteError && (
        <button className="bg-red-100 text-red-600 rounded-md p-2">
          {DeleteError.message as string}
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
        {data?.data?.map((card: ICard, idx: number) => (
          <div
            key={idx}
            className={clsx(
              "p-5 border rounded-md shadow-md",
              card.status === "done" ? "bg-green-50" : "bg-red-50"
            )}
          >
            <div className="flex justify-between items-center mb-2">
              <h1 className="font-bold text-lg">{card.title}</h1>
              <button
                className={clsx(
                  "px-3 py-1 rounded-md",
                  CheckStatus(card.status)
                )}
              >
                {card.status === "done" ? "Done" : "Doing"}
              </button>
            </div>
            <p className="text-sm mb-4">{card.description}</p>
            <div className="flex justify-between mb-2">
              <span>Issues: {card.issues}</span>
              <span>Resolved: {card.resolved}</span>
              <span>Comment: {card.comment}</span>
            </div>
            <div className="flex items-center mb-2">
              <div className="flex -space-x-2"></div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={clsx(
                  "h-2.5 rounded-full",
                  card.progress === 100 ? "bg-green-500" : "bg-red-500"
                )}
                style={{ width: `${card.progress}%` }}
              />
            </div>
            <p className="mt-2 text-right text-sm font-bold">
              {card.progress}% Done
            </p>
            <button
              onClick={() => handleDelete(card?.id)}
              disabled={deleteMutating}
              className="mt-3 bg-red-100 disabled:bg-gray-300 disabled:cursor-not-allowed text-red-600 rounded-md p-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
