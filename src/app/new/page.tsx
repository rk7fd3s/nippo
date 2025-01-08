"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateArticlePage = () => {
  const router = useRouter();

  const [nippo_at, setNippoAt] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [thoughts, setThoughts] = useState<string>("");
  const [start_time, setStartTime] = useState<string>("");
  const [end_time, setEndTime] = useState<string>("");
  const [time_optional, setTimeOptiomal] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    await fetch(`${API_URL}/api/nippo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nippo_at,
        content,
        thoughts,
        start_time,
        end_time,
      }),
    });

    setLoading(false);

    router.push("/");
    router.refresh();
  };

  return (
    <div className="py-8 px-4 md:px-12">
      <h2 className="text-2xl font-bold mb-4">新規作成</h2>
      <form
        className="bg-slate-200 p-6 rounded shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="text-gray-700 text-sm font-bold mb-2">研修日</label>
          <input
            type="date"
            required
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none invalid:border-red-500"
            onChange={(e) => setNippoAt(e.target.value)}
          />
        </div>
        <div className="mb-1">
          <label className="text-gray-700 text-sm font-bold mb-2">
            研修時間
          </label>
          <div className="w-full">
            <input
              type="time"
              required
              className="shadow border rounded w-28 py-2 px-3 text-gray-700 leading-tight focus:outline-none invalid:border-red-500"
              onChange={(e) => setStartTime(e.target.value)}
            />
            <span className="text-gray-700 text-sm px-2">-</span>
            <input
              type="time"
              required
              className="shadow border rounded w-28 py-2 px-3 text-gray-700 leading-tight focus:outline-none invalid:border-red-500"
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="text-gray-700 text-sm font-bold mb-2">
            研修時間補足
          </label>
          <textarea
            rows={1}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            onChange={(e) => setTimeOptiomal(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700 text-sm font-bold mb-2">
            研修内容
          </label>
          <textarea
            required
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none invalid:border-red-500"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700 text-sm font-bold mb-2">
            研修の感想
          </label>
          <textarea
            required
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none invalid:border-red-500"
            onChange={(e) => setThoughts(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`py-2 px-4 border rounded-md ${
            loading
              ? "bg-orange-300 cursor-not-allowed"
              : "bg-orange-400 hover:bg-orange-500"
          } text-white font-semibold focus:outline-none`}
          disabled={loading}
        >
          投稿
        </button>
      </form>
    </div>
  );
};

export default CreateArticlePage;
