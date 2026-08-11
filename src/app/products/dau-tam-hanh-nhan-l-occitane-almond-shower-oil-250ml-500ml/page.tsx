import { ProductDetailPage } from "@/components/sites/vn-loccitane-com-1c965340/products-dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml-167aa139/ProductDetailPage";
import {
  almondShowerOil,
  recommendedProducts,
} from "@/components/sites/vn-loccitane-com-1c965340/products-dau-tam-hanh-nhan-l-occitane-almond-shower-oil-250ml-500ml-167aa139/data";

export default function AlmondShowerOilPage() {
  return (
    <ProductDetailPage
      product={almondShowerOil}
      recommendations={recommendedProducts}
    />
  );
}
