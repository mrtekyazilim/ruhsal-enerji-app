import { useParams } from "react-router-dom";

export default function Category() {
  const { slug } = useParams();
  return <div>Kategori: {slug}</div>;
}
