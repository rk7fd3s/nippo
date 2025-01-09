
import ArticleList from "./components/ArticleList";
import Error from "./error";

export default async function Home() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${API_URL}/apis/nippo`, { cache: "no-store" });
    const articles = await res.json();

    return (
      <main className="flex flex-col justify-between">
        <ArticleList articles={articles} />
      </main>
    );
  } catch (error: any) {
    return (<Error {...error} />);
  }
}
