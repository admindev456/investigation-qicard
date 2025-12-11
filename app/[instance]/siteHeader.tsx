"use client";

import { useState, useEffect } from "react";
import { Globals, Header } from "@/app/lib/types";
import { usePathname } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/logoutButton";

interface Common {
  globals: Globals;
  header: Header;
}

interface HeaderProps {
  common: Common;
  instanceId: string;
  clientConfig: { siteId: string };
}

export default function SiteHeader({ common, instanceId }: HeaderProps) {
  const [showNav, setShowNav] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();
  const { globals, header } = common;
  const { links = [] } = globals?.content || {};
  const { links: headerLinks = [] } = header?.content || {};

  useEffect(() => {
    async function checkAdmin() {
      try {
        const res = await fetch('/api/admin/check')
        const data = await res.json()
        setIsAdmin(data.isAdmin === true)
      } catch {
        setIsAdmin(false)
      }
    }
    checkAdmin()
  }, [])

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md shadow-slate-900/5 transition duration-500">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center space-x-8 justify-between px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <button type="button" className="relative lg:hidden mr-3" aria-label="Open navigation" onClick={() => setShowNav(true)}>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" className="h-6 w-6 stroke-slate-500">
                <path d="M4 7h16M4 12h16M4 17h16"></path>
              </svg>
            </button>
            <nav className="hidden lg:flex lg:space-x-8">
              {headerLinks.map((link) => {
                const isActive = pathname === link.slug || pathname.includes(link.slug?.split('/').pop() || '');
                return link.slug?.startsWith("http") ? (
                  <a key={link.title} href={link.slug}>
                    {link.title}
                  </a>
                ) : (
                  <Link 
                    key={link.title} 
                    href={link.slug ?? ""} 
                    className={`text-sm py-2.5 font-display font-semibold transition-colors ${
                      isActive 
                        ? "text-sky-600 border-b-2 border-sky-600" 
                        : "text-slate-900 hover:text-sky-500"
                    }`}
                  >
                    {link.title}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {isAdmin && (
              <Link 
                href="/admin" 
                className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Admin
              </Link>
            )}
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {showNav && (
        <div 
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
          onClick={() => setShowNav(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-out lg:hidden ${
          showNav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <span className="font-display font-semibold text-slate-900 text-lg">Navigation</span>
          <button
            type="button"
            className="inline-flex items-center justify-center text-slate-500 hover:text-slate-700 focus:outline-none"
            onClick={() => setShowNav(false)}
          >
            <span className="sr-only">Close menu</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Navigation Content */}
        <nav className="px-6 py-6">
          <ul className="space-y-1">
            {/* Overview Link - Only Nav Item */}
            {headerLinks.map((link) => {
              const isActive = pathname === link.slug || pathname.includes(link.slug?.split('/').pop() || '');
              return (
                <li key={link.title}>
                  <Link
                    href={link.slug ?? ""}
                    onClick={() => setShowNav(false)}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? "bg-sky-50 text-sky-600"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {link.title}
                  </Link>
                </li>
              );
            })}
            {/* Admin Link for Mobile */}
            {isAdmin && (
              <li>
                <Link
                  href="/admin"
                  onClick={() => setShowNav(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    pathname.startsWith('/admin')
                      ? "bg-sky-50 text-sky-600"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  Admin Panel
                </Link>
              </li>
            )}
          </ul>
          <div className="mt-6 pt-6 border-t border-slate-200">
            <LogoutButton />
          </div>
        </nav>
      </div>
    </>
  );
}
