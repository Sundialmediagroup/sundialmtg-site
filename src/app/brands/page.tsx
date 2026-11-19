import type { Metadata } from "next";
import { cms } from "@/lib/cms";
import { BrandDirectory } from "@/components/sections/BrandDirectory";
import { PageHead } from "@/components/sections/PageHead";

export const metadata: Metadata = { title: "Brands" };

export default async function BrandsPage() {
  const brands = await cms.getBrands();
  return (
    <>
      <PageHead
        title="Brands"
        intro="Different passions. Shared human connection. Our brands bring people together around the identities, interests, and cultural experiences that matter to them. Each creates a distinct space for people to express who they are and connect with others who share their passions."
      />
      <BrandDirectory brands={brands} cta={{ label: "Discover our experiences", href: "/experiences" }} />
    </>
  );
}
