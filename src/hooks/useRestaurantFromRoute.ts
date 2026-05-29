import { useParams } from "react-router-dom";
import { restaurants } from "../data/mock";

export function useRestaurantFromRoute() {
  const { slug } = useParams();
  return restaurants.find((entry) => entry.slug === slug) ?? restaurants[0];
}
