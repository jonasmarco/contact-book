import { useQuery, QueryFunctionContext } from 'react-query'
import axios from '../api/config'

export type QueryResponse = {
  [key: string]: string
}

const getStuff = async ({
  queryKey
}: QueryFunctionContext<[string, string, number]>): Promise<QueryResponse> => {
  const [_, searchQuery, page] = queryKey
  const { data } = await axios.get(
    `https://fetchurl.com?query=${searchQuery}&page=${page}`
  )
  return data
}

export default function useReactQuery(searchQuery: string, page: number) {
  return useQuery<QueryResponse, Error>(
    ['query', searchQuery, page],
    getStuff,
    {
      enabled: searchQuery !== ''
    }
  )
}
