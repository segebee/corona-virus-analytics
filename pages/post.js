import { useRouter } from "next/router";
import Layout from "../components/layout";

export default function() {
  const router = useRouter();
  return (
    <Layout>
      <h1>{router.query.title}</h1>
      <p>Content</p>
    </Layout>
  );
}
