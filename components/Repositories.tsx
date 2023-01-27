import { useQuery } from "@apollo/client";
import Get_repository_query from "@/queries/Get_repository_query.gql";

const Repositories = () => {
  const { data, loading, error } = useQuery(Get_repository_query);
  console.log(data);

  return (
    <>
      {error && <p>error</p>}

      {loading && <h1>Loading...</h1>}

      {!loading && data && <div>{data.repository.id}</div>}
    </>
  );
};

export default Repositories;
