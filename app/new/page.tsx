"use client";

import { FormEvent, useState } from "react";
import { APP_API_URL, type QueryItem } from "../types";

const initialForm: QueryItem = {
  first_name: "",
  last_name: "",
  phone_number: "",
  query: "",
};

export default function NewQueryPage() {
  const [form, setForm] = useState<QueryItem>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [createdQuery, setCreatedQuery] = useState<QueryItem | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    setCreatedQuery(null);

    try {
      const response = await fetch(APP_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const result = (await response.json()) as QueryItem;
      setCreatedQuery(result);
      setForm(initialForm);
    } catch {
      setError("Could not submit the query. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function updateField(field: keyof QueryItem, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  return (
    <>
      <section className="page-heading">
        <h1>Add a query</h1>
        <p>Submit a new query to the deployed backend endpoint.</p>
      </section>

      <section className="panel">
        <form className="form" onSubmit={handleSubmit}>
          <div className="field-grid">
            <div className="field">
              <label htmlFor="first_name">First name</label>
              <input
                id="first_name"
                name="first_name"
                required
                value={form.first_name}
                onChange={(event) =>
                  updateField("first_name", event.target.value)
                }
              />
            </div>

            <div className="field">
              <label htmlFor="last_name">Last name</label>
              <input
                id="last_name"
                name="last_name"
                required
                value={form.last_name}
                onChange={(event) =>
                  updateField("last_name", event.target.value)
                }
              />
            </div>

            <div className="field full-width">
              <label htmlFor="phone_number">Phone number</label>
              <input
                id="phone_number"
                name="phone_number"
                required
                value={form.phone_number}
                onChange={(event) =>
                  updateField("phone_number", event.target.value)
                }
              />
            </div>

            <div className="field full-width">
              <label htmlFor="query">Query</label>
              <textarea
                id="query"
                name="query"
                required
                value={form.query}
                onChange={(event) => updateField("query", event.target.value)}
              />
            </div>
          </div>

          {error ? <div className="notice error">{error}</div> : null}
          {createdQuery ? (
            <div className="notice success">
              Query submitted for {createdQuery.first_name}{" "}
              {createdQuery.last_name}.
            </div>
          ) : null}

          <button className="button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Query"}
          </button>
        </form>
      </section>
    </>
  );
}
