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
              { title: "Ecosystem", slug: "ecosystem", target: "_self" },
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
        links: [
          { title: "Overview", slug: "/knowledgebase/overview", target: "_self" },
          { title: "Ecosystem", slug: "/knowledgebase/ecosystem", target: "_self" },
        ],
      },
    },
  },
  map: {
    content: {
      pages: [
        { identifier: "overview", title: "Overview", index: 0 },
        { identifier: "ecosystem", title: "Ecosystem", index: 1 },
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
    ecosystem: {
      title: "Ecosystem",
      sections: [
        {
          id: "ecosystem-title",
          type: "STANDARD_HEADING",
          content: {
            heading: {
              title: "Militias, Banks, and Electronic Payments: Unmasking Iranian Leverage Through Iraq's Qi Card Ecosystem",
              headingType: "h1",
            },
          },
        },
        {
          id: "ecosystem-subtext",
          type: "TEXT_BLOCK",
          content: {
            content: "The section will describe Iraq's Qi Card system and show how Iranian-backed militias have used it to embed themselves in digital payments, helping move state payroll and money flows that support Iran and its proxies in evading sanctions, laundering funds, and financing regional operations.",
            variant: "tagline",
          },
        },
        {
          id: "ecosystem-citation",
          type: "TEXT_BLOCK",
          content: {
            content: "All claims are cited to primary sources. Materials organized for legal, governmental, and investigative use.",
            variant: "citation",
          },
        },
        {
          id: "ecosystem-divider",
          type: "DIVIDER",
          content: {},
        },
        {
          id: "origins-title",
          type: "STANDARD_HEADING",
          content: {
            heading: {
              title: "Origins",
              headingType: "h1",
            },
          },
        },
        {
          id: "ecosystem-intro",
          type: "TEXT_BLOCK",
          content: {
            content: "Qi Card in Iraq was founded and developed through a strategic public-private partnership in 2007 between private sector architect <strong>Bahaa Abdul Hussein</strong>, and Iraq's two largest state-owned banks, <strong>Rafidain Bank</strong> and <strong>Rasheed Bank</strong>.",
            variant: "body",
            html: true,
          },
        },
        {
          id: "rafidain-bank-section",
          type: "IMAGE_WITH_TEXT",
          content: {
            image: {
              url: "/rafidain-bank-iraq.jpg",
              alt: "Rafidain Bank Iraq",
            },
            caption: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.foxbusiness.com%2Ffox-news-world%2Firaqi-state-bank-accused-processing-payments-houthi-terrorists-who-disrupt-red-sea-commerce&psig=AOvVaw0ugX2KI-NafB-2AHC9BOot&ust=1764084499975000&source=images&cd=vfe&opi=89978449&ved=0CBYQjRxqFwoTCJCxhJeNi5EDFQAAAAAdAAAAABAE",
            captionUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.foxbusiness.com%2Ffox-news-world%2Firaqi-state-bank-accused-processing-payments-houthi-terrorists-who-disrupt-red-sea-commerce&psig=AOvVaw0ugX2KI-NafB-2AHC9BOot&ust=1764084499975000&source=images&cd=vfe&opi=89978449&ved=0CBYQjRxqFwoTCJCxhJeNi5EDFQAAAAAdAAAAABAE",
            text: [
              {
                text: "Rafidain Bank is Iraq's largest and oldest state-owned commercial bank, founded in 1941 and headquartered in central Baghdad, the bank is a primary channel for handling government accounts, public-sector payroll, pensions, and large volumes of domestic payments.",
                citation: {
                  number: "15",
                  url: "https://martini.ai/pages/research/Rafidain%20Bank-f278ca2d9881e6fb1e238ecf6817fdfe",
                },
              },
              {
                text: "Rafidain Bank has a long history of US sanctions. During Saddam Hussein's rule, it was blacklisted to prevent the regime from using the bank to finance weapons purchases. The United Nations imposed sanctions on Rafidain after the first Gulf War in 1991, which were lifted in 2020.",
                citation: {
                  number: "16",
                  url: "https://www.basnews.com/en/babat/892016",
                },
              },
            ],
          },
        },
        {
          id: "rafidain-scrutiny-section",
          type: "TEXT_BLOCK",
          content: {
            content: `<p class="mb-4 text-xs sm:text-sm md:text-base font-medium sm:font-normal leading-relaxed text-slate-800">In recent years, Rafidain bank is once again under international scrutiny, specifically for its alleged ties and funding of <strong>Iranian backed terror proxies.</strong></p>
<p class="mb-4 text-xs sm:text-sm md:text-base font-medium sm:font-normal leading-relaxed text-slate-800">
<span class="relative group border-b-2 border-dotted border-sky-500 cursor-help px-0.5">
'Michael Knights, senior fellow at the Washington Institute, told FOX Business that US lawmakers have increasingly pressured Rafidain. "Since February 2025, Congress has been calling for sanctioning Rafidain over facilitating large-scale transfers of money to Iran and its proxies. That puts Rafidain in the danger zone as an Iraqi bank that multiple congressional representatives know by name," he said.'
<span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap z-10 shadow-lg">Citation [16]</span>
</span>
<a href="https://www.basnews.com/en/babat/892016" target="_blank" rel="noopener noreferrer" class="inline-block ml-1.5 text-sky-600 hover:text-sky-700 underline font-semibold text-[10px] sm:text-xs align-super">[16]</a>
</p>
<p class="text-xs sm:text-sm md:text-base font-medium sm:font-normal leading-relaxed text-slate-800">
<span class="relative group border-b-2 border-dotted border-sky-500 cursor-help px-0.5">
Iraq's banking system plays a significant role in facilitating Iranian access to the Western-led global financial system. Iraq's largest state-owned financial institution, Rafidain Bank, stands accused — most notably by <strong>U.S. Rep. Joe Wilson (R-SC)</strong> — of laundering billions of dollars for the benefit of Iran and its proxies. Iran-aligned businessmen use fraudulent invoices and nominee buyers to extract hard currency from Iraq's financial system — money that is then rerouted across the region to support Iran's Islamic Revolutionary Guard Corps.
<span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap z-10 shadow-lg">Citation [17]</span>
</span>
<a href="https://www.fdd.org/analysis/2025/07/25/from-oil-to-oman-10-ways-to-economically-cripple-irans-war-machine/" target="_blank" rel="noopener noreferrer" class="inline-block ml-1.5 text-sky-600 hover:text-sky-700 underline font-semibold text-[10px] sm:text-xs align-super">[17]</a>
</p>`,
            variant: "body",
            html: true,
          },
        },
        {
          id: "rasheed-bank-section",
          type: "IMAGE_WITH_TEXT",
          content: {
            image: {
              url: "/rasheedbank.png",
              alt: "Rasheed Bank",
            },
            caption: "https://en.964media.com/10620/",
            captionUrl: "https://en.964media.com/10620/",
            text: [
              {
                text: "Al-Rasheed is Iraq's second largest state-owned commercial bank, established in 1988 by being spun off from Rafidain Bank.",
                citation: {
                  number: "18",
                  url: "https://en.wikipedia.org/wiki/Rasheed_Bank",
                },
              },
              {
                text: "Rasheed Bank plays a central role in Iraq's payroll and social payments system, partnering for public salaries, pensions, and Qi Card issuance.",
                citation: {
                  number: "19",
                  url: "https://www.state.gov/wp-content/uploads/2025/08/638719_2025-Iraq-Investment-Climate-Statement.pdf",
                },
              },
              {
                text: "As of 2025, Rasheed Bank and Rafidain together with the Trade Bank of Iraq make up roughly 85% of all assets in Iraq's banking sector.",
                citation: {
                  number: "19",
                  url: "https://www.state.gov/wp-content/uploads/2025/08/638719_2025-Iraq-Investment-Climate-Statement.pdf",
                },
              },
              {
                text: "While less prominent than Rafidain in sanctions and Western reports, recent investigations and U.S. advisories highlight broader risks of Iranian exploitation and militia-linked activity across the Iraqi banking sector, including Rasheed.",
                citation: {
                  number: "20",
                  url: "https://www.basnews.com/en/babat/884914",
                },
              },
            ],
          },
        },
        {
          id: "congressional-letter-section",
          type: "TEXT_BLOCK",
          content: {
            content: `<p class="mb-4 text-xs sm:text-sm md:text-base font-medium sm:font-normal leading-relaxed text-slate-800">Effectively, the main founders of Iraq's Qi Card, including Rafidain Bank, Al-Rasheed Bank, and Bahaa Abdul Hussein Abdul Hadi, all have a track record linked to supporting Iranian terror proxies and the funding of Iranian backed PMF militias. In the recent congressional letter from U.S. Representatives Joe Wilson (R-SC) and W. Gregory Steube (R-FL) addressed to Secretary Marco Rubio, all 3 are explicilty mentioned in the letter by name.</p>
<p class="mb-2 text-xs sm:text-sm md:text-base font-medium sm:font-normal leading-relaxed text-slate-800">Specifically mentioned in the letter by name:</p>
<ul class="list-disc list-inside mb-4 text-xs sm:text-sm md:text-base font-medium sm:font-normal leading-relaxed text-slate-800 space-y-1">
<li>Al Rafidain Bank</li>
<li>Bahaa Abdul Hussein Abdul Hadi (labeled a 'key money-laundering confederate')</li>
<li>Qi Card</li>
<li>The Director General of Rafidain Bank</li>
<li>The Director General of Al-Rasheed Bank</li>
</ul>`,
            variant: "body",
            html: true,
          },
        },
        {
          id: "congressional-letter-image",
          type: "IMAGE_WITH_CITATION",
          content: {
            image: {
              url: "/snippet.png",
              alt: "Congressional Letter Snippet",
              width: 1200,
              height: 800,
            },
            citationUrl: "https://static.foxnews.com/foxnews.com/content/uploads/2025/05/5.28.25_iraq_sanctions_letter.pdf",
          },
        },
        {
          id: "conclusion-text",
          type: "TEXT_BLOCK_WITH_BORDER",
          content: {
            content: `<ul class="space-y-3 list-none">
<li class="flex items-start">
  <span class="mr-3 text-slate-400">•</span>
  <span>The 2007 public-private partnership between Bahaa Abdul Hussein and Iraq's state banks created more than a payment processing company—it built mandatory financial infrastructure that would eventually touch 12 million Iraqis and process billions in monthly transactions.</span>
</li>
<li class="flex items-start">
  <span class="mr-3 text-slate-400">•</span>
  <span>When the Popular Mobilization Forces (PMF) were placed on the government payroll in 2014, Qi Card became the conduit through which U.S.-designated terrorist organizations received Iraqi state funding.</span>
</li>
<li class="flex items-start">
  <span class="mr-3 text-slate-400">•</span>
  <span>What began as salary disbursement evolved into an industrial-scale sanctions evasion operation that, by 2025, had funneled hundreds of millions of dollars to Iranian proxy militias.</span>
</li>
</ul>`,
            html: true,
          },
        },
        {
          id: "structure-image",
          type: "IMAGE_WITH_CITATION",
          content: {
            image: {
              url: "/structure.png",
              alt: "Qi Card Structure",
              width: 1200,
              height: 800,
            },
          },
        },
        {
          id: "pmf-divider",
          type: "DIVIDER",
          content: {},
        },
        {
          id: "pmf-title",
          type: "STANDARD_HEADING",
          content: {
            heading: {
              title: "The PMF Payroll Complex: Qi Card's Role in Enabling Iranian-Backed Militia Financing Through State Payment Infrastructure",
              headingType: "h1",
            },
          },
        },
        {
          id: "pmf-bullets",
          type: "TEXT_BLOCK_WITH_BORDER",
          content: {
            content: `<ul class="space-y-3 list-none">
<li class="flex items-start">
  <span class="mr-3 text-slate-400">•</span>
  <span>When Islamic State fighters swept across northern and western Iraq in 2014, the U.S.-trained Iraqi army collapsed. Baghdad turned to Iranian-backed Shia militias as an emergency fighting force. The Popular Mobilization Forces (PMF) was formalized and placed on the government payroll.</span>
</li>
<li class="flex items-start">
  <span class="mr-3 text-slate-400">•</span>
  <span>A decade later, this emergency arrangement would metastasize into deeply State-integrated financial infrastructure: a $2.7 billion annual state-funded apparatus with 130,000-145,000 fighters organized into 67 factions - 90% Shia - that openly take orders from Iran's Supreme Leader Khamenei while simultaneously receiving salaries through Iraq's national payment infrastructure via Qi Card.</span>
</li>
</ul>`,
            html: true,
          },
        },
        {
          id: "command-structure-title",
          type: "STANDARD_HEADING",
          content: {
            heading: {
              title: "The Command Structure: From Tehran to Baghdad",
              headingType: "h2",
            },
          },
        },
        {
          id: "command-structure-bullets",
          type: "TEXT_BLOCK_WITH_BORDER",
          content: {
            content: `<ul class="space-y-3 list-none">
<li class="flex items-start">
  <span class="mr-3 text-slate-400">•</span>
  <span>The PMF divides into two doctrinal axes. The first follows Grand Ayatollah Ali al-Sistani and the Najaf religious establishment—the "shrine brigades" (Hashd al-Atabat) that maintain nominal loyalty to the Iraqi state.</span>
</li>
<li class="flex items-start">
  <span class="mr-3 text-slate-400">•</span>
  <span>The second—and dominant—axis follows Wilayat al-Faqih (Guardianship of the Jurist), meaning direct allegiance to Khamenei. These factions operate under IRGC-Quds Force command, executing Iranian foreign policy objectives on Iraqi soil while drawing <strong>Iraqi government paychecks.</strong></span>
</li>
</ul>`,
            html: true,
          },
        },
        {
          id: "pmf-leadership-title",
          type: "STANDARD_HEADING",
          content: {
            heading: {
              title: "PMF Leadership Personal (Including U.S. Sanction Details)",
              headingType: "h3",
            },
          },
        },
        {
          id: "pmf-leadership-table",
          type: "PMF_LEADERSHIP_TABLE",
          content: {
            rows: [
              {
                position: "Chairman",
                name: "<strong>Faleh al-Fayyadh</strong>",
                designation: "Designated December 2019",
                notes: "Former Dawa Party member; resided in Iran 1970s-2003; <strong>cooperates with IRGC to implement Iranian instructions</strong>",
                additionalDetails: "Chair of Popular Mobilization Commission (PMC/PMF); US Global Magnitsky sanctions for protest crackdown abuses; longtime National Security Adviser; leads Ataa Movement",
              },
              {
                position: "Chief of Staff",
                name: "<strong>Abdul Aziz al-Mohammadawi (Abu Fadak)</strong>",
                designation: "Designated January 2021 (terrorism, E.O. 13224)",
                notes: "Former Kata'ib Hezbollah Sec-Gen; succeeded Abu Mahdi al-Muhandis after Jan 2020 drone strike; declared in Tehran Apr 2024: <strong>\"PMF takes orders from Khamenei\"</strong>",
                additionalDetails: "Veteran of anti-Saddam resistance; <strong>Iranian proxy ties; active in ISIS campaigns; PMF's most senior operational commander; subject to OFAC/E.O. 13224 terror sanctions</strong>",
              },
              {
                position: "Secretary",
                name: "<strong>Abu Muntadhar Tahsin al-Aboudi al-Husseini</strong>",
                designation: "____",
                notes: "Administrative oversight",
                additionalDetails: "Birth name Tahseen Abid Murat al-Abboudi; PMF chief of operations (prior); alleged role in protester killings 2019; supervises PMF's new Human Rights Department",
              },
              {
                position: "Operations Commander",
                name: "<strong>Abu Ali Adnan Ibrahim Mohsen al-Basri</strong>",
                designation: "____",
                notes: "Tactical command",
                additionalDetails: "Badr Organization veteran; linked to Supreme Committee for Combating Corruption; <strong>reportedly worked under Soleimani</strong>; principal PMF operational planner",
              },
            ],
          },
        },
        {
          id: "weapons-smuggling-section",
          type: "TEXT_BLOCK",
          content: {
            content: `<p class="mb-4 text-xs sm:text-sm md:text-base font-medium sm:font-normal leading-relaxed text-slate-800">A leaked U.S. intelligence document, as reported by the Washington Post in May 2023, implicated Abu Fadak (Abdul Aziz al-Mohammadawi), the PMF chief of staff, in a weapons-smuggling scheme that funneled arms to Iran and its proxy groups for attacks against U.S. forces in Syria.</p>
<p class="mb-2 text-xs sm:text-sm md:text-base font-medium sm:font-normal leading-relaxed text-slate-800 font-semibold">Key Details from the Leak:</p>
<ul class="space-y-3 list-none mb-4">
<li class="flex items-start">
  <span class="mr-3 text-slate-400">•</span>
  <span class="text-xs sm:text-sm md:text-base font-medium sm:font-normal leading-relaxed text-slate-800">The classified report detailed how Iran and its affiliated militias, using the aftermath of a devastating earthquake, hid weapons (including rifles, ammunition, and drones) within humanitarian aid shipments routed through Iraq into Syria.</span>
</li>
<li class="flex items-start">
  <span class="mr-3 text-slate-400">•</span>
  <span class="text-xs sm:text-sm md:text-base font-medium sm:font-normal leading-relaxed text-slate-800">Abu Fadak was identified as complicit in organizing these smuggling convoys, <strong>leveraging his position within the PMF to facilitate both the logistics and cover for the operation.</strong></span>
</li>
<li class="flex items-start">
  <span class="mr-3 text-slate-400">•</span>
  <span class="text-xs sm:text-sm md:text-base font-medium sm:font-normal leading-relaxed text-slate-800"><strong>This network provided the means for Iran-backed groups to launch attacks on U.S. military positions in Syria</strong>, escalating regional tensions and complicating the efforts of both U.S. and Israeli militaries to interdict these transfers.</span>
</li>
<li class="flex items-start">
  <span class="mr-3 text-slate-400">•</span>
  <span class="text-xs sm:text-sm md:text-base font-medium sm:font-normal leading-relaxed text-slate-800">PMF and Iraqi government sources deny the allegations, while independent confirmations from Israeli officials and separate intelligence assessments support the existence of the arms-smuggling operation.</span>
</li>
</ul>`,
            variant: "body",
            html: true,
          },
        },
        {
          id: "abu-fadak-statement",
          type: "TEXT_BLOCK",
          content: {
            content: `<p class="mb-4 text-xs sm:text-sm md:text-base font-medium sm:font-normal leading-relaxed text-slate-800">On April 5, 2024, Abu Fadak (Abdul Aziz al-Mohammadawi), chief of staff of the Popular Mobilization Forces, traveled to Tehran for Qods Day marches, where he publicly stated to media, <strong>"The PMF is a fundamental part of the battle in Gaza and Palestine"</strong>. <em>(Potentially referring to Hamas, which is a U.S. designated terror organization and the major Iranian funded proxy in the region. Effectively implicitly linking Iraqi Popular Mobilization Forces (financed by Iraqi state funding, <strong>enabled with Qi Card</strong>) with current U.S. designated terror organizations in Gaza.)</em></p>
<p class="mb-4 text-xs sm:text-sm md:text-base font-medium sm:font-normal leading-relaxed text-slate-800">This statement by Abu Fadak, "The PMF is a fundamental part of the battle in Gaza and Palestine", is a rare public admission by the PMF's highest military commander that his Iraqi state-funded organization is participating in a regional conflict that the Iraqi state is not party to. A documented publicly stated quote, one of many instances of documented sources of evidence, linking Iraqi PMF, <strong>which have been financed using Qi Card</strong>, to Iranian terror proxies and designated terrorist organizations.</p>
<p class="text-xs sm:text-sm md:text-base font-medium sm:font-normal leading-relaxed text-slate-800">Abu Fadak was also very blunt about the fact that he takes orders from a foreign official, Iran's Supreme Leader Ali Khamenei:</p>
<p class="mt-4 text-sm sm:text-base md:text-lg font-medium sm:font-normal leading-relaxed text-slate-900 italic pl-4 border-l-4 border-slate-300">"We are waiting for the [Supreme] Leader to express his view on the next step...What will the response be to the aggression on the Iranian consulate and the killing of some of the [Islamic Revolutionary Guard Corps, or IRGC] commanders?...After the criminal [attack] on the consulate in Damascus, we came to the Islamic Republic to first express our solidarity with the vision and the plan of the Leader and the Imam...and second is to renew our covenant [i.e., loyalty to the Supreme Leader] and wait for the Leader's decision"</p>`,
            variant: "body",
            html: true,
          },
        },
      ],
      content: {
        extendedProperties: [
          { name: "title", value: "Militias, Banks, and Electronic Payments: Unmasking Iranian Leverage Through Iraq's Qi Card Ecosystem" },
          {
            name: "description",
            value:
              "Analysis of the interconnected network of militias, banks, and electronic payment systems enabling Iranian influence through Iraq's Qi Card infrastructure.",
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
