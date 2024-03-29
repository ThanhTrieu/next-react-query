import { requestClient } from "@/src/axios/request";

export const fetchPotsByPage = async (page = 1, limit = 10) => {
    const start = (page - 1)*limit;
    const response =  await requestClient.get(`/posts?limit=${limit}&skip=${start}`);
    return await response.data;
}