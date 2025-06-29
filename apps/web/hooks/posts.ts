import { useQuery } from "@tanstack/react-query"
import { graphqlClient } from "./../providers/graphqlClient"
import { getAllPostsQuery } from "graphql/query/post";
import { GetAllPostsQuery, GetAllPostsQueryVariables} from "gql/graphql";


export const useGetPosts=()=>{
  const query=useQuery<GetAllPostsQuery,GetAllPostsQueryVariables>({
    queryKey:["all-posts"],
    queryFn:()=>graphqlClient.request(getAllPostsQuery as any),
})
  return{ ...query,posts:query.data?.getAllPosts,
    isLoading2: query.isLoading,
  };
}

