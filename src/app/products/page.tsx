import type { Metadata } from "next";
import { cms } from "@/lib/cms";
import { Capabilities } from "@/components/sections/Capabilities";
import { PageHead } from "@/components/sections/PageHead";

export const metadata: Metadata = { title: "Products" };

// NEW in the sitemap. Uses the capabilities grid until product designs land.
export default async function ProductsPage() {
  const products = await cms.getProducts();
  return (
    <>
      <PageHead title="Products" intro="Media, content, experiences, talent and intelligence: the ways brands become part of culture with Sundial." />
      <Capabilities eyebrow={["What we bring", `${products.length} products`]} heading={["Culture into infrastructure."]} products={products} />
    </>
  );
}
