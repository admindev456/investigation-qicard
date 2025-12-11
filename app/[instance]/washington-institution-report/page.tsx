export default function WashingtonInstitutionReportPage() {
  return (
    <main className="w-full">
      <article>
        <div className="max-w-4xl mx-auto px-4 py-10 space-y-10 text-slate-800">
          <section className="space-y-4">
            <h2 className="font-display text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold leading-snug sm:leading-snug text-black">
              5.0 Independent Policy Analysis: The Washington Institute on PMF Payment Infrastructure
            </h2>
            <p className="leading-relaxed">
              The systemic exploitation of Iraq&apos;s electronic payment infrastructure for militia financing was not a late-breaking surprise from the 2025 Wall Street Journal exposé. It had been flagged years earlier by Middle East security researchers as a structural vulnerability that Iraqi and international actors chose not to close.
            </p>
            <p className="leading-relaxed">
              In early 2020, <strong>The Washington Institute for Near East Policy</strong> published an 80-page study titled <em>&quot;Honored, Not Contained: The Future of the Popular Mobilization Forces in Iraq.&quot;</em> Authors <strong>Michael Knights</strong>, <strong>Hamdi Malik</strong>, and <strong>Aymenn Jawad Al-Tamimi</strong> framed it as a primer for agencies considering PMF-related Security Sector Reform (SSR) or Disarmament, Demobilization, and Reintegration (DDR).
            </p>
            <p className="leading-relaxed">
              The paper, prepared for senior U.S. and Coalition planners, called out PMF payment transparency as a critical, unresolved vulnerability—independent corroboration of the financial controls later exposed as central to Iranian sanctions evasion.
            </p>
          </section>

          <section className="space-y-4 border-t border-slate-200 pt-6">
            <h3 className="font-display text-base sm:text-lg md:text-xl lg:text-xl font-bold leading-snug sm:leading-snug text-black">
              &quot;Contentious Issues&quot;: The Electronic Payment Problem
            </h3>
            <p className="leading-relaxed">
              The study grouped PMF financial transparency under the most controversial reform items, noting that electronic payment oversight was a structural weak point:
            </p>
            <blockquote className="border-l-2 border-slate-200 pl-3 my-3 text-slate-800 bg-white py-2 pr-3 rounded">
              &quot;Greater transparency is required. That the government must oversee the PMF is indisputable; however, the issue of implementation faces greater resistance. <strong>Independent auditing of PMF elements, transitioning to full electronic payment for forces under independent oversight, and inventorying PMF bases, weapons, and equipment are all contentious issues in practice.</strong> The PMF must also submit to a more transparent system of military justice by bringing in an independent inspector general from outside the main PMF factions.&quot;
              <footer className="text-sm text-slate-500 mt-3 not-italic flex flex-wrap items-center gap-2">
                <span>— Knights, Malik, Al-Tamimi, <em>&quot;Honored, Not Contained,&quot;</em> Washington Institute for Near East Policy (2020), p. 46</span>
                <a
                  href="https://www.washingtoninstitute.org/policy-analysis/honored-not-contained-future-iraqs-popular-mobilization-forces"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-700 hover:text-sky-800 underline font-medium"
                >
                  [Full Report]
                </a>
              </footer>
            </blockquote>
            <p className="leading-relaxed">
              The &quot;electronic payment&quot; system was <strong>Qi Card (International Smart Card/ISC)</strong>—the mandated processor for Iraqi government salaries, pensions, and social support, including PMF payroll. By early 2020, the lack of independent oversight was already on record, yet it remained open through the 2025 enforcement actions.
            </p>
          </section>

          <section className="space-y-4 border-t border-slate-200 pt-6">
            <h3 className="font-display text-base sm:text-lg md:text-xl lg:text-xl font-bold leading-snug sm:leading-snug text-black">
              Quantified Scale: 60,000 Iran-Aligned Fighters on State Payroll
            </h3>
            <p className="leading-relaxed">
              The study delivered the first clear quantification of Iranian penetration of Iraq&apos;s payroll systems. Under Abu Mahdi al-Muhandis (killed alongside IRGC-QF Commander Qasem Soleimani in January 2020), the PMF became a cover to fund Iran-leaning militias:
            </p>
            <blockquote className="border-l-2 border-slate-200 pl-3 my-3 text-slate-800 bg-white py-2 pr-3 rounded">
              &quot;Under [Abu Mahdi al-]Muhandis&apos;s control, the PMF was used as a cover to fund a growing apparatus of Iran-leaning militias, numbering <strong>60,000 members on the Iraqi state payroll</strong>, as well as facilitating a range of measures to support Iranian foreign policy.&quot;
              <footer className="text-sm text-slate-500 mt-3 not-italic">— Knights, Malik, Al-Tamimi, <em>Washington Institute</em> (2020), p. 38</footer>
            </blockquote>
            <p className="leading-relaxed">
              By early 2025, the Wall Street Journal reported over <strong>200,000 PMF members</strong> paid through Qi Card—a more than threefold increase despite repeated warnings that the payment system lacked independent oversight.
            </p>
            <div className="bg-white border border-slate-200 rounded-lg p-4 my-4 shadow-sm">
              <p className="text-sm text-slate-800 font-semibold mb-3">Timeline Comparison: PMF Payroll Growth via Qi Card</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center p-3 bg-slate-50 rounded border border-slate-200">
                  <p className="text-2xl font-bold text-slate-800">60,000</p>
                  <p className="text-slate-600">Iran-aligned fighters (2020)</p>
                  <p className="text-xs text-slate-500">Washington Institute estimate</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded border border-slate-200">
                  <p className="text-2xl font-bold text-slate-800">200,000+</p>
                  <p className="text-slate-600">PMF members paid (2025)</p>
                  <p className="text-xs text-slate-500">Wall Street Journal report</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-3 text-center">233% increase in militia personnel receiving Iraqi government salaries via Qi Card</p>
            </div>
          </section>

          <section className="space-y-4 border-t border-slate-200 pt-6">
            <h3 className="font-display text-base sm:text-lg md:text-xl lg:text-xl font-bold leading-snug sm:leading-snug text-black">
              Named Actors: PMF Leadership Controlling Financial Mechanisms
            </h3>
            <p className="leading-relaxed">
              The study mapped the power brokers running PMF finances—figures later surfacing in U.S. designations, Treasury actions, and Congressional calls for Qi Card sanctions:
            </p>
            <div className="overflow-x-auto my-4">
              <table className="min-w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700 border-b">Individual/Faction</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700 border-b">Role (per Washington Institute)</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700 border-b">U.S. Designation Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium">Falih al-Fayyadh</td>
                    <td className="px-4 py-3">PMF Chairman; author of July 2019 reform letter to Prime Minister</td>
                    <td className="px-4 py-3"><span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">OFAC Designated (Dec 2019)</span></td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 font-medium">Abu Ali al-Basri</td>
                    <td className="px-4 py-3">&quot;Prominent potential successor to Muhandis&quot;; PMF Deputy Chairman&apos;s assistant; advocate for &quot;Damj&quot; (merger) integration model</td>
                    <td className="px-4 py-3"><span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-medium">Not Designated</span></td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium">Abu Muntadhar al-Husseini</td>
                    <td className="px-4 py-3">PMF Secretary; Badr Organization power base</td>
                    <td className="px-4 py-3"><span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-medium">Not Designated</span></td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 font-medium">Kata&apos;ib Hezbollah</td>
                    <td className="px-4 py-3">Controlled key PMF Commission roles: Deputy Chairmanship, Intelligence Branch, Central Security Directorate, Missile Unit, Anti-Armor Unit</td>
                    <td className="px-4 py-3"><span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">FTO (July 2009)</span></td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium">Asa&apos;ib Ahl al-Haq</td>
                    <td className="px-4 py-3">Given geographic control over southern Salah al-Din; described as &quot;nouveau riche actors&quot; competing for PMF influence</td>
                    <td className="px-4 py-3"><span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">SDGT (Jan 2020)</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="leading-relaxed">
              These factions—paid through Qi Card—held influence beyond their formal means because of backing from Iran and Lebanese Hezbollah. The authors underscored that the PMF is a political-military force architected to project Iranian power:
            </p>
            <blockquote className="border-l-2 border-slate-200 pl-3 my-3 text-slate-800 bg-white py-2 pr-3 rounded">
              &quot;As long as Iran-backed leaders dominate the PMF, the IRGC will be able to use Iraq as a theater to project its power.&quot;
              <footer className="text-sm text-slate-500 mt-3 not-italic">— Knights, Malik, Al-Tamimi, <em>Washington Institute</em> (2020), p. 38</footer>
            </blockquote>
          </section>

          <section className="space-y-4 border-t border-slate-200 pt-6">
            <h3 className="font-display text-base sm:text-lg md:text-xl lg:text-xl font-bold leading-snug sm:leading-snug text-black">
              Asymmetric Information: Iran&apos;s Privileged Access to PMF Reform Documents
            </h3>
            <p className="leading-relaxed">
              The study described how PMF reform documents—including payment policies—were shared unevenly. The U.S.-led Coalition learned of new orders when they hit the press; Iran saw drafts earlier:
            </p>
            <blockquote className="border-l-2 border-slate-200 pl-3 my-3 text-slate-800 bg-white py-2 pr-3 rounded">
              &quot;At present, when a new reform document related to the PMF is issued, such as &apos;Diwani Order No. 331,&apos; the US-led Coalition learns of its content for the first time at the same time as &apos;Reuters&apos; and millions of other people. <strong>However, the IRGC, another external actor, has reviewed the draft days or weeks prior.</strong>&quot;
              <footer className="text-sm text-slate-500 mt-3 not-italic">— Knights, Malik, Al-Tamimi, <em>Washington Institute</em> (2020), p. 53</footer>
            </blockquote>
            <p className="leading-relaxed">
              If the IRGC saw PMF organizational and financial drafts first, it enjoyed an inherent advantage in shaping payment mechanisms that appeared compliant while sidestepping oversight.
            </p>
          </section>

          <section className="space-y-4 border-t border-slate-200 pt-6">
            <h3 className="font-display text-base sm:text-lg md:text-xl lg:text-xl font-bold leading-snug sm:leading-snug text-black">
              The &quot;Five to Ten Year&quot; Timeline: Predicted Delay in Addressing Payment Vulnerabilities
            </h3>
            <p className="leading-relaxed">
              The study anticipated that meaningful PMF financial reform would take five to ten years:
            </p>
            <blockquote className="border-l-2 border-slate-200 pl-3 my-3 text-slate-800 bg-white py-2 pr-3 rounded">
              &quot;Making major decisions regarding the PMF over five to ten years is far better than doing so in the next year or two or even in the next three to five years, when attitudes toward the PMF will likely remain immature and emotional, and when Israeli-Iraqi and US-Iranian tensions will likely remain high.&quot;
              <footer className="text-sm text-slate-500 mt-3 not-italic">— Knights, Malik, Al-Tamimi, <em>Washington Institute</em> (2020), p. 55</footer>
            </blockquote>
            <p className="leading-relaxed">
              That timeline effectively signaled that Qi Card vulnerabilities would persist through the mid-2020s. The Wall Street Journal later confirmed the surge: transactions grew from $10 million monthly in early 2023 to over $500 million by early 2025—a fiftyfold jump squarely within the predicted window.
            </p>
          </section>

          <section className="space-y-4 border-t border-slate-200 pt-6">
            <h3 className="font-display text-base sm:text-lg md:text-xl lg:text-xl font-bold leading-snug sm:leading-snug text-black">
              Evidentiary Significance for Sanctions Case
            </h3>
            <p className="leading-relaxed">
              The Washington Institute analysis offers contemporaneous expert corroboration that:
            </p>
            <ol className="list-decimal pl-5 space-y-3 mb-2 leading-relaxed">
              <li>
                <strong>Payment transparency was a documented problem.</strong> Transitioning to independent oversight of electronic payments was flagged as contentious, confirming that Qi Card controls were known to be insufficient.
              </li>
              <li>
                <strong>Iran-aligned militias were embedded in payroll.</strong> The 60,000 Iran-leaning fighters on Iraqi government payroll in 2020 establish a baseline that grew to 200,000+ by 2025.
              </li>
              <li>
                <strong>Designated groups controlled financial levers.</strong> Kata&apos;ib Hezbollah (FTO since 2009) held core PMF administrative roles through which salaries flowed.
              </li>
              <li>
                <strong>Iran held an information edge.</strong> The IRGC reviewed PMF reform drafts before the U.S.-led Coalition, enabling compliant-looking mechanisms that still facilitated evasion.
              </li>
              <li>
                <strong>The vulnerability was expected to persist.</strong> A five-to-ten-year reform horizon signaled that Qi Card weaknesses would remain exploitable well into the mid-2020s—the period when volumes spiked fiftyfold.
              </li>
            </ol>
            <div className="bg-white border border-slate-200 rounded-lg p-4 my-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-800 mb-2">Source Document</p>
              <p className="text-sm text-slate-700 leading-relaxed">
                Knights, Michael, Hamdi Malik, and Aymenn Jawad Al-Tamimi. <em>&quot;Honored, Not Contained: The Future of Iraq&apos;s Popular Mobilization Forces.&quot;</em> Policy Focus 163. Washington, DC: The Washington Institute for Near East Policy, 2020.
              </p>
              <a
                href="https://www.washingtoninstitute.org/policy-analysis/honored-not-contained-future-iraqs-popular-mobilization-forces"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-sky-700 hover:text-sky-800 underline text-sm font-medium"
              >
                Access Full Report →
              </a>
            </div>
            <p className="leading-relaxed">
              Produced before Bahaa Abdul Hussein&apos;s September 2020 arrest and five years ahead of the Wall Street Journal exposé, the paper shows that the militia-payment nexus via Qi Card was a long-documented structural weakness. The result of inaction: Iraq&apos;s mandatory payment infrastructure evolved into what U.S. Treasury officials later described as a clandestine network enabling Iranian sanctions evasion at hundreds of millions of dollars per month.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}

