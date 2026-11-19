import type { Metadata } from "next";
import { ContactBlock } from "@/components/sections/ContactBlock";

export const metadata: Metadata = { title: "Partner with us" };

export default function PartnerPage() {
  return (
    <ContactBlock
      heading={["Don’t just reach culture.", "Become part of what moves it."]}
      text="Let’s create the experiences people want to be part of and the relationships that make brands matter beyond the moment."
      cta={{ label: "Partner with Sundial", href: "https://sundialmg.com/contact", external: true }}
      meta={["sundialmg.com/contact", "New York"]}
    />
  );
}
