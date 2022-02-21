import { useLocation } from "react-router-dom";

export default function Search() {
  const { search } = useLocation();
  console.log(search); // ?keyword=dune
  const keyword = new URLSearchParams(search).get("keyword");
  console.log(keyword); // dune
  return null;
}
