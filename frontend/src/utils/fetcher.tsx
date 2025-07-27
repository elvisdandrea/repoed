import axios from 'axios';

export async function postFetcher<TResponse = any, TBody = any>(
  url: string,
  body?: TBody,
  config = {}
): Promise<TResponse> {
  const response = await axios.post<TResponse>(url, body, config);
  return response.data;
}