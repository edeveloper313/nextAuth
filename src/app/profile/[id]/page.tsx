import { Suspense } from "react";

const ContentPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <h1>{id}</h1>;
};

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ContentPage params={params} />
    </Suspense>
  );
}
