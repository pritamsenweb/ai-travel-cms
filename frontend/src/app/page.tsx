"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [form, setForm] = useState({
    destination: "",
    days: "",
    preferences: "",
    budget: "",
  });
  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setItinerary("");

    try {
      const res = await axios.post(
        "http://localhost:8000/generate-itinerary",
        form
      );
      setItinerary(res.data.itinerary);
    } catch (err) {
      console.error("Error:", err);
      setItinerary("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        AI Travel Itinerary Generator
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-6 rounded-xl shadow space-y-4"
      >
        <input
          className="w-full p-3 border border-gray-300 rounded"
          type="text"
          name="destination"
          placeholder="Destination (e.g., Paris)"
          value={form.destination}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-3 border border-gray-300 rounded"
          type="number"
          name="days"
          placeholder="Number of Days"
          value={form.days}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-3 border border-gray-300 rounded"
          type="text"
          name="preferences"
          placeholder="Preferences (e.g., food, nature, culture)"
          value={form.preferences}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-3 border border-gray-300 rounded"
          type="text"
          name="budget"
          placeholder="Budget (e.g., Low, Medium, High)"
          value={form.budget}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Generating..." : "Generate Itinerary"}
        </button>
      </form>

      {itinerary && (
        <div className="mt-6 w-full max-w-xl bg-white p-6 rounded-xl shadow whitespace-pre-wrap">
          <h2 className="text-xl font-semibold mb-4">Your Itinerary:</h2>
          <p>{itinerary}</p>
        </div>
      )}
    </main>
  );
}
