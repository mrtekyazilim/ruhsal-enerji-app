import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { slug } = useParams();
  return <div>Ürün Detay: {slug}</div>;
}
