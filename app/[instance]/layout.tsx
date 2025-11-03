import type { Metadata } from "next";
import LeftNav from "@/components/leftNav";
import SiteHeader from "./siteHeader";
import SiteFooter from "./siteFooter";
import { getMap, getCommon, getClientConfig } from "@/app/lib/api";

export default async function Layout({ children, params }: { children: React.ReactNode; params: { instance: string } }) {
  const common = await getCommon(params.instance);
  const map = await getMap(params.instance);
  const clientConfig = await getClientConfig();

  return map?.content?.pages?.length > 0 ? (
    <>
      <SiteHeader common={common} instanceId={params.instance} clientConfig={clientConfig} />
      <div className="w-full px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 mx-auto max-w-6xl">
        {children}
      </div>
      <SiteFooter />
    </>
  ) : (
    <div className="m-12">
      <div className={`rounded-2xl p-6 bg-blue-50`}>
        <p className="font-display text-xl text-yellow-900 mt-0 mb-2.5">No Pages Found</p>
        <div className={`text-black-800`}>
          <p className="whitespace-pre-wrap">There are currently no pages in this knowledgebase. Add some content to get started!</p>
        </div>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Knowledgebase",
  description: "Knowledgebase",
};
