import Link from "next/link";
import { BACKEND_API_URL, type QueryItem } from "./types";

async function getQueries(): Promise<QueryItem[]> {
  const response = await fetch(BACKEND_API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to load queries");
  }

  return response.json();
}

export default async function Home() {
  let queries: QueryItem[] = [];
  let error = "";

  try {
    queries = await getQueries();
  } catch {
    error = "Could not load queries from the backend.";
  }

  return (
    <>
      <section className="page-heading">
        <h1>Submitted queries</h1>
        <p>
          View query submissions returned by the deployed backend endpoint.
        </p>
      </section>

      <section className="panel">
        <div className="toolbar">
          <h2>All queries</h2>
          <Link href="/new" className="button">
            Add Query
          </Link>
        </div>

        {error ? (
          <div className="empty-state">{error}</div>
        ) : queries.length === 0 ? (
          <div className="empty-state">No queries have been submitted yet.</div>
        ) : (
          <div className="table-wrap">
            <table className="queries-table">
              <thead>
                <tr>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Phone number</th>
                  <th>Query</th>
                </tr>
              </thead>
              <tbody>
                {queries.map((item, index) => (
                  <tr key={`${item.phone_number}-${index}`}>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.phone_number}</td>
                    <td>{item.query}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
