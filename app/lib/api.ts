"use server";
import { revalidateTag } from "next/cache";
import { Author, PagedResponse, ProductionSlug } from "./types";

// Mock data for local development
const mockData = {
  common: {
    globals: {
      content: {
        links: [
          {
            group: "Navigation",
            links: [
              { title: "Overview", slug: "overview", target: "_self" },
              { title: "Quick Start", slug: "quick-start", target: "_self" },
              { title: "Installation", slug: "installation", target: "_self" },
            ],
          },
          {
            group: "Documentation",
            links: [
              { title: "Components", slug: "components", target: "_self" },
              { title: "API Reference", slug: "api-reference", target: "_self" },
              { title: "Examples", slug: "examples", target: "_self" },
            ],
          },
        ],
      },
    },
    header: {
      content: {
        smallLogo: {
          url: "/logo-sm.png",
          width: 30,
          height: 22,
          id: "logo-sm",
        },
        largeLogo: {
          url: "/logo.png",
          width: 257,
          height: 30,
          id: "logo-lg",
        },
        links: [{ title: "Overview", slug: "/knowledgebase/overview", target: "_self" }],
      },
    },
  },
  map: {
    content: {
      pages: [
        { identifier: "overview", title: "Overview", index: 0 },
        { identifier: "quick-start", title: "Quick Start", index: 1 },
        { identifier: "installation", title: "Installation", index: 2 },
        { identifier: "components", title: "Components", index: 3 },
        { identifier: "api-reference", title: "API Reference", index: 4 },
        { identifier: "examples", title: "Examples", index: 5 },
      ],
    },
  },
  pages: {
    overview: {
      title: "Overview",
      sections: [
        {
          id: "overview-hero",
          type: "OVERVIEW_HERO",
          content: {
            siteMark: "[Logo / Site Mark]",
            title: "Qi Card: An Analysis of a Financial Nexus in Iraq—Assessing Allegations of Illicit Finance, Iranian Proximity, and Systemic Risk",
            tagline:
              "Comprehensive cited documentation of corruption, money laundering, and sanctions evasion in Iraq's Qi Card electronic payment infrastructure (2007-2025)",
            supporting:
              "",
            stats: [
              { value: "$1.5B", label: "Laundered", caption: "(2023)", source: "WSJ" },
              { value: "$450M", label: "Militia Profits", caption: "(2023)", source: "JPost" },
              { value: "200,000+", label: "Cards Blocked", caption: "by U.S. Treasury", source: "Congress" },
              { value: "18 Years", label: "Documented Corruption", caption: "(2007-2025)" },
            ],
            aboutTitle: "About This Archive",
            aboutDescription:
              "This repository consolidates verified evidence of systematic financial corruption involving Iraq's dominant payment processor, International Smart Card (Qi Card).",
            highlights: [
              "Congressional demands for sanctions (May 2025)",
              "U.S. Treasury investigations and card blocking actions",
              "Multiple criminal convictions of company leadership",
              "Money laundering mechanisms exploiting Iraqi government payroll",
              "Connections to Iranian-backed militia financing",
            ],
            metaSummary: "Last Updated: [Date] | [Number] Source Documents | [Number] Citations",
          },
        },
        {
          id: "overview-context",
          type: "textBlock",
          content: {
            text: "All claims are cited to primary sources. Materials organized for legal, governmental, and investigative use.",
          },
        },
      ],
      content: {
        extendedProperties: [
          { name: "title", value: "Qi Card: An Analysis of a Financial Nexus in Iraq—Assessing Allegations of Illicit Finance, Iranian Proximity, and Systemic Risk" },
          {
            name: "description",
            value:
              "Comprehensive documentation of Iraqi Qi Card corruption, money laundering, and sanctions evasion activities spanning 2007-2025.",
          },
        ],
      },
    },
    "quick-start": {
      title: "Quick Start",
      sections: [
        {
          id: "qs-header",
          type: "pageHeader",
          heading: { title: "Quick Start Guide", headingType: "h1" },
        },
        {
          id: "qs-content",
          type: "textBlock",
          content: {
            text: "Get started with your knowledgebase in just a few steps:\n\n1. Clone the repository\n2. Install dependencies with npm install\n3. Run the development server with npm run dev\n4. Open http://localhost:3000 in your browser",
          },
        },
      ],
      content: {
        extendedProperties: [
          { name: "title", value: "Quick Start - Knowledgebase" },
          { name: "description", value: "Get started quickly" },
        ],
      },
    },
    installation: {
      title: "Installation",
      sections: [
        {
          id: "install-header",
          type: "pageHeader",
          heading: { title: "Installation", headingType: "h1" },
        },
        {
          id: "install-content",
          type: "textBlock",
          content: {
            text: "To install this knowledgebase template, follow these steps:\n\n1. Make sure you have Node.js installed (version 18 or higher)\n2. Clone the repository\n3. Navigate to the project directory\n4. Run: npm install\n5. Start the development server: npm run dev",
          },
        },
      ],
      content: {
        extendedProperties: [
          { name: "title", value: "Installation - Knowledgebase" },
          { name: "description", value: "How to install" },
        ],
      },
    },
    components: {
      title: "Components",
      sections: [
        {
          id: "comp-header",
          type: "pageHeader",
          heading: { title: "Available Components", headingType: "h1" },
        },
        {
          id: "comp-content",
          type: "textBlock",
          content: {
            text: "This template includes several pre-built components:\n\n- Text Blocks\n- Page Headers\n- Code Displays\n- Tables\n- Navigation Links\n- Search Functionality\n\nYou can customize these components or create your own!",
          },
        },
      ],
      content: {
        extendedProperties: [
          { name: "title", value: "Components - Knowledgebase" },
          { name: "description", value: "Available components" },
        ],
      },
    },
    "api-reference": {
      title: "API Reference",
      sections: [
        {
          id: "api-header",
          type: "pageHeader",
          heading: { title: "API Reference", headingType: "h1" },
        },
        {
          id: "api-content",
          type: "textBlock",
          content: {
            text: "The API has been simplified to use local mock data. You can find the API functions in app/lib/api.ts.\n\nAll API functions now return mock data synchronously, making it easy to customize and extend for your needs.",
          },
        },
      ],
      content: {
        extendedProperties: [
          { name: "title", value: "API Reference - Knowledgebase" },
          { name: "description", value: "API documentation" },
        ],
      },
    },
    examples: {
      title: "Examples",
      sections: [
        {
          id: "ex-header",
          type: "pageHeader",
          heading: { title: "Examples", headingType: "h1" },
        },
        {
          id: "ex-content",
          type: "textBlock",
          content: {
            text: "Here are some examples of what you can build with this template:\n\n- Product Documentation\n- API Documentation\n- Help Centers\n- Knowledge Bases\n- User Guides\n\nThe flexible component system allows you to create any type of documentation you need!",
          },
        },
      ],
      content: {
        extendedProperties: [
          { name: "title", value: "Examples - Knowledgebase" },
          { name: "description", value: "Usage examples" },
        ],
      },
    },
  },
  guide: {
    name: "Component Guide",
    notes: "This is a guide to all available components in the template.",
    content: {
      sections: [
        {
          id: "guide-text",
          type: "textBlock",
          _meta: {
            name: "Text Block",
            description: "Display formatted text content",
          },
          content: {
            text: "This is a text block component. You can use it to display paragraphs of text.",
          },
        },
        {
          id: "guide-header",
          type: "pageHeader",
          _meta: {
            name: "Page Header",
            description: "Display page titles and subtitles",
          },
          heading: { title: "Sample Header", headingType: "h2" },
        },
      ],
    },
  },
  authors: {
    result: [
      {
        id: "author-1",
        cid: "author-1",
        content: {
          name: "John Doe",
          email: "john@example.com",
          role: "Developer",
          phone: "555-0100",
          image: {
            url: "/user.png",
            width: 100,
            height: 100,
            id: "user-1",
          },
        },
      },
    ],
    total: 1,
    page: 1,
    pageSize: 10,
  },
};

export async function getClientConfig(): Promise<{ siteId: string }> {
  return {
    siteId: "local-development",
  };
}

export async function getAuthors(instanceId: string): Promise<PagedResponse<Author>> {
  return mockData.authors;
}

export async function getGuide(instanceId: string) {
  return mockData.guide;
}

export async function getMap(instanceId: string) {
  return mockData.map;
}

export async function getCommon(instanceId: string) {
  return mockData.common;
}

export async function getPage(page: string, instanceId: string) {
  return mockData.pages[page as keyof typeof mockData.pages] || mockData.pages.overview;
}

export async function clearCache(tag: string) {
  revalidateTag(tag);
}
