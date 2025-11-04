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
            title: "Ongoing Qi Card Intelligence Archive",
            tagline:
              "Comprehensive cited documentation of corruption, money laundering, and sanctions evasion in Iraq's Qi Card electronic payment infrastructure (2007-2025)",
            supporting: "Sourced from U.S. government records, congressional documents, Treasury statements, and verified investigative reporting",
            stats: [
              { value: "$1.5B", label: "Laundered", caption: "(2023)", source: "WSJ" },
              { value: "$450M", label: "Militia Profits", caption: "(2023)", source: "JPost" },
              { value: "200,000+", label: "Cards Blocked", caption: "by U.S. Treasury", source: "Congress" },
              { value: "18 Years", label: "Documented Corruption", caption: "(2007-2025)", source: "" },
            ],
            aboutTitle: "About This Archive",
            aboutDescription:
              "This repository consolidates verified evidence of systematic financial corruption involving Iraq's dominant payment processor, International Smart Card (Qi Card). Documentation includes:",
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
          id: "leadership-record",
          type: "LEADERSHIP_RECORD",
          content: {
            profile: {
              name: "Bahaa Abdul Hussein Abdul Hadi",
              title: "Founder & Chairman, International Smart Card (Qi Card)",
              summary: "Founder and Chairman of International Smart Card, Bahaa Abdul Hussein Abdul Hadi has been central to multiple corruption scandals spanning 2007-2025. Iraqi courts convicted him twice in 2021 for bribery and theft of approximately $8.9 million in bank revenues. Despite his December 2023 acquittal by Iraq's Court of Cassation, U.S. Congressional representatives explicitly named him as a \"key money-laundering confederate\" in their May 2025 letter demanding sanctions. He remains chairman and actively represents Qi Card internationally, including at the October 2025 Money 20/20 USA fintech conference."
            },
            timeline: [
              {
                date: "September 17, 2020",
                event: "Arrest at Baghdad International Airport",
                authority: "Committee No. 29 (Prime Minister al-Kadhimi's anti-corruption unit)",
                outcome: "Arrested without warrant while attempting to flee Iraq",
                citation: "MENA Rights Group",
                citationUrl: "https://menarights.org/en/case/bahaa-abdul-hussein-abdul-hadi"
              },
              {
                date: "January 24, 2021",
                event: "First Conviction: Bribery of Public Official",
                authority: "Central Anti-Corruption Criminal Court",
                outcome: "Sentenced to 4 years imprisonment plus 10 million Iraqi dinar fine ($6,800)",
                citation: "MENA Rights Group, Rudaw",
                citationUrl: "https://menarights.org/en/case/bahaa-abdul-hussein-abdul-hadi"
              },
              {
                date: "July 11, 2021",
                event: "Second Conviction: Theft of Bank Revenues",
                authority: "Baghdad Karkh Criminal Court",
                outcome: "Sentenced to 3 years for stealing 13.1 billion dinars ($8.9 million) alongside Rafidain Bank officials",
                citation: "Rudaw, The National",
                citationUrl: ""
              },
              {
                date: "August 28, 2023",
                event: "UN Declares Detention Arbitrary",
                authority: "UN Working Group on Arbitrary Detention",
                outcome: "Ruled detention violated international law, documented torture allegations",
                citation: "MENA Rights Group",
                citationUrl: "https://menarights.org/en/case/bahaa-abdul-hussein-abdul-hadi"
              },
              {
                date: "December 11, 2023",
                event: "Full Acquittal by Highest Court",
                authority: "Iraqi Court of Cassation",
                outcome: "Acquitted of all charges; Committee No. 29 previously declared unconstitutional",
                citation: "MENA Rights Group",
                citationUrl: "https://menarights.org/en/case/bahaa-abdul-hussein-abdul-hadi"
              },
              {
                date: "May 28, 2025",
                event: "Named in U.S. Congressional Sanctions Demand",
                authority: "Representatives Joe Wilson (R-SC) & Greg Steube (R-FL)",
                outcome: "Designated as 'key money-laundering confederate' in letter to Secretary of State Marco Rubio",
                citation: "Congressional Letter to Sec. Rubio",
                citationUrl: "https://static.foxnews.com/foxnews.com/content/uploads/2025/05/5.28.25_iraq_sanctions_letter.pdf"
              },
              {
                date: "July 30, 2025",
                event: "Torturers Convicted",
                authority: "Karkh Criminal Court of Appeal",
                outcome: "Two individuals convicted under Article 333 of Iraqi Penal Code, sentenced to 2 years each for torturing Abdul Hadi",
                citation: "MENA Rights Group",
                citationUrl: "https://menarights.org/en/case/bahaa-abdul-hussein-abdul-hadi"
              }
            ],
            convictions: [
              {
                charge: "Bribery of Ahmed Abdul Jalil, former Director of Public Pensions, to secure state contracts",
                sentence: "4 years imprisonment + 10 million Iraqi dinar fine ($6,800)",
                court: "Central Anti-Corruption Criminal Court",
                date: "January 24, 2021",
                status: "Later overturned on appeal (December 2023)",
                citation: "MENA Rights Group, Rudaw",
                citationUrl: "https://menarights.org/en/case/bahaa-abdul-hussein-abdul-hadi"
              },
              {
                charge: "Theft of 13.1 billion Iraqi dinars (approximately $8.9 million) in bank revenues",
                coDefendants: "Rafidain Bank General Manager Afrah Muhammad, Credit Card Director Walaa Jawad",
                sentence: "3 years imprisonment each",
                court: "Baghdad Karkh Criminal Court",
                date: "July 11, 2021",
                status: "Later overturned on appeal (December 2023)",
                citation: "Rudaw, The National",
                citationUrl: ""
              }
            ],
            schemes: [
              {
                title: "Pension System Fraud",
                description: "Partnership with Ahmed al-Saadi (National Pension Authority Director) to systematically embezzle hundreds of millions of dollars monthly from Iraq's pension system.",
                details: [
                  "Seizure of salaries from thousands of deceased retirees not removed from payrolls",
                  "Payments to tens of thousands of fictitious retirees",
                  "Illegal deductions from millions of legitimate retirees",
                  "Al-Saadi admitted Abdul Hadi was his 'partner in thefts'"
                ],
                citation: "Middle East Eye (September 2020)",
                citationUrl: ""
              },
              {
                title: "Ghost Fighter Scheme (2021)",
                description: "Registration of up to 70,000 fictitious Popular Mobilization Forces (PMF) militia members on government payroll, with salaries disbursed via Qi Cards.",
                details: [
                  "Fake employees registered in Hashd al-Shaabi (PMF) payroll system",
                  "Qi Cards issued to non-existent personnel",
                  "Scheme allegedly created by Abu Muhandis, former deputy head of Hashd Commission",
                  "Facilitated payments to Iran-aligned militia groups"
                ],
                citation: "Musings on Iraq (January 27, 2021)",
                citationUrl: "http://musingsoniraq.blogspot.com/2021/01/qi-card-allegedly-involved-in-ghost.html"
              }
            ],
            usResponse: {
              designation: "Key Money-Laundering Confederate",
              source: "Representatives Joe Wilson (R-SC) & W. Gregory Steube (R-FL)",
              date: "May 28, 2025 (3 days before Wall Street Journal exposé)",
              details: "Congressional letter to Secretary of State Marco Rubio explicitly named Abdul Hadi alongside Qi Card and Al-Rafidain Bank for sanctions. Letter stated: 'Iraq's ability to receive US dollars through the Federal Reserve is directly supporting Iran and its proxies. The US Treasury Department must stop turning a blind eye to Iraq's largest state banks that launder US dollars on behalf of Iran.'",
              citation: "Congressional Letter, pages 2-3",
              citationUrl: "https://static.foxnews.com/foxnews.com/content/uploads/2025/05/5.28.25_iraq_sanctions_letter.pdf"
            },
            torture: {
              arrest: "Arrested without warrant on September 17, 2020 at Baghdad International Airport. Held incommunicado for 40 days; family and lawyers unable to see him during this period.",
              methods: [
                "Beatings with sticks",
                "Waterboarding",
                "Suffocation with plastic bags",
                "Hanging by legs and hands",
                "Electric shocks on sensitive body parts",
                "Use of the 'falqa' method",
                "Deprivation of sleep and food",
                "Threats of raping family members"
              ],
              evidence: [
                "Forensic medical report from Forensic Medicine Department documenting physical torture",
                "Forensic psychiatric report from Ministry of Health documenting psychological torture",
                "Ministerial investigation by Iraqi Ministry of Justice corroborating torture",
                "Report by parliamentary committee that visited during detention",
                "UN Working Group on Arbitrary Detention ruling (August 28, 2023)"
              ],
              outcome: "July 30, 2025: Karkh Criminal Court of Appeal convicted two individuals of torturing Abdul Hadi under Article 333 of Iraqi Penal Code, sentencing each to 2 years imprisonment. Court of Cassation later remanded case for retrial to increase sentences.",
              citation: "MENA Rights Group Detailed Case File",
              citationUrl: "https://menarights.org/en/case/bahaa-abdul-hussein-abdul-hadi"
            },
            currentStatus: {
              positions: [
                "Chairman, International Smart Card (Qi Card)",
                "Inaugural Chair, MENA Fintech Association Iraq Chapter"
              ],
              activities: [
                "Represented Qi Card at Money 20/20 USA fintech conference (October 2025)",
                "Announced partnership with K2 Integrity for compliance overhaul (June 2025)",
                "Continues to publicly represent company internationally"
              ],
              note: "Despite two criminal convictions (later overturned), documented torture, UN ruling of arbitrary detention, and explicit naming in U.S. Congressional sanctions demands, Bahaa Abdul Hadi remains in leadership and no OFAC designation has been issued as of November 2025. The Wall Street Journal reported that Qi Card transaction volumes grew from $10 million monthly (early 2023) to over $500 million monthly (early 2025), with more than 200,000 militia members receiving salaries through the system."
            }
          }
        }
      ],
      content: {
        extendedProperties: [
          { name: "title", value: "Ongoing Qi Card Intelligence Archive" },
          {
            name: "description",
            value:
              "Comprehensive documentation of Iraqi Qi Card corruption, money laundering, and sanctions evasion activities spanning 2007-2025.",
          },
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
          type: "TEXT_BLOCK",
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
          type: "PAGE_HEADER",
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
          name: "Research Team",
          email: "research@qicardintelligence.org",
          role: "Lead Investigator",
          phone: "",
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
    siteId: "qi-card-intelligence-archive",
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
