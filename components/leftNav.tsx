"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Globals } from "@/app/lib/types";

interface LeftNavProps {
  globals?: Globals;
  instanceId: string;
}

const LeftNav: React.FC<LeftNavProps> = ({ globals, instanceId }) => {
  const pathname = usePathname();

  const selectedCss = "block w-full pl-3.5 before:pointer-events-none before:absolute before:left-0.5 before:top-1/2 before:h-0.5 before:w-1.5 before:-translate-y-1/2 text-sky-500 before:bg-sky-500";
  const blankCss = "block w-full pl-3.5 before:pointer-events-none before:absolute before:left-0.5 before:top-1/2 before:h-0.5 before:w-1.5 before:-translate-y-1/2 text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-900 hover:before:block";

  return (
    <div className="hidden lg:block">
      {globals?.content?.links && (
        <div className="sticky top-24 w-56 overflow-y-auto">
          <nav className="text-sm">
            <ul className="space-y-8">
              {globals?.content?.links.map((item) => (
                <li key={item.group}>
                  <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-900">{item.group}</h2>
                  <ul className="space-y-2">
                    {item.links?.map((child) => (
                      <li className="relative" key={child.slug}>
                        <Link 
                          className={pathname.endsWith(child.slug ?? "") ? selectedCss : blankCss} 
                          href={`/${instanceId}/${child.slug}`}
                        >
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default LeftNav;
