import http from "./http";
import { Category } from "@/types/category";

export const getCategories = async (): Promise<Category[]> => {
  const res = await http.get("/categories");
  return res.data;
};
