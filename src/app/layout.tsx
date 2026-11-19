import type { Metadata } from "next";
import { cms } from "@/lib/cms";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import "@/styles/main.scss";

export const metadata: Metadata = {
  title: { default: "Sundial Media & Technology Group", template: "%s · Sundial" },
  description: "Sundial is a human connections company, powered by brands and communities that create meaningful cultural connection.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await cms.getSettings();
  return (
    <html lang="en">
      <body>
        <SiteHeader nav={settings.nav} primaryAction={settings.primaryAction} socials={settings.socials} />
        <main>{children}</main>
        <SiteFooter nav={settings.nav} socials={settings.socials} footer={settings.footer} tagline={settings.tagline} />
      </body>
    </html>
  );
}
