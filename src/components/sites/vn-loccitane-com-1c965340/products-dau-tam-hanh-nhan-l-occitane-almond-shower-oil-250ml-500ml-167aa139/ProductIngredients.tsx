import { ProductAccordion } from "./ProductAccordion";
import type { ProductDescriptionSection } from "./types";

// Not a visually distinct component on the source page — "THÀNH PHẦN" is just
// one section inside the single description block (see BEHAVIORS.md). Kept as
// a thin named export for API-shape parity with the task's component list.
export function ProductIngredients({
  section,
}: {
  section: ProductDescriptionSection;
}) {
  return <ProductAccordion sections={[section]} mode="accordion" />;
}
