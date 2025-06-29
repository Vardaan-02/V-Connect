import { graphqlClient } from "@providers/graphqlClient";
import { useQuery } from "@tanstack/react-query";
import { GetAllStoriesQuery,GetAllStoriesQueryVariables } from "gql/graphql";
import { getAllStories } from "graphql/query/story";


export const useGetStories=()=>{
 const query=useQuery<GetAllStoriesQuery,GetAllStoriesQueryVariables>({
   queryKey:["all-story"],
   queryFn:()=>graphqlClient.request(getAllStories),
})
 return{ ...query,stories:query.data?.getAllStories,
   isLoading4: query.isLoading,
 };
}