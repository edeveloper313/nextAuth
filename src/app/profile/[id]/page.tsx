const page = async ({params}:{params:Promise<{id:string}>}) => {
    const {id}=await params;
  return (
    <>
      <h1>{id}</h1>
    </>
  );
};

export default page;
