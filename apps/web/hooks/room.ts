import {  useQuery } from "@tanstack/react-query"
import { GetAllRoomsQuery, GetAllRoomsQueryVariables, GetRoomsByIdQuery, GetRoomsByIdQueryVariables } from "gql/graphql";
import { graphqlClient } from "@providers/graphqlClient/index";
import { getAllRoomsQuery, getRoomsByIdQuery } from "graphql/query/room";

export const useGetRooms = () => {
 const query = useQuery<GetAllRoomsQuery,GetAllRoomsQueryVariables>({
  queryKey: ["all-Rooms"],
  queryFn: async () => {
    const data = await graphqlClient.request(getAllRoomsQuery as any);
    return data;
  }
 });
 return {...query,rooms:query.data?.getAllRooms,isLoading3:query.isLoading}
}

export const useGetRoomsById = () => {
  const query = useQuery<GetRoomsByIdQuery,GetRoomsByIdQueryVariables>({
    queryKey: ["all-Rooms"],
    queryFn: async () => {
      const data = await graphqlClient.request(getRoomsByIdQuery as any);
      return data;
    }
  });
  return {...query,rooms:query.data?.getRoomsById,isLoading4:query.isLoading}
}