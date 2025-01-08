
import ArticleList from "./components/ArticleList";
import Error from "./error";

export default async function Home() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${API_URL}/api/nippo`, { cache: "no-store" });
    const articles = await res.json();

    console.log(articles);

    return (
      <main className="flex flex-col justify-between">
        <ArticleList articles={articles} />
      </main>
    );
  } catch (error: any) {
    return (<Error {...error} />);
  }
}
