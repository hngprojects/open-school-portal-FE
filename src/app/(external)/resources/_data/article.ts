// articles.ts — full blog data without images

type PostContent = { type: "paragraph"; text: string } | { type: "list"; items: string[] }

type Post = {
  key: string
  heading: string
  content: PostContent[]
}

export type Article = {
  id: number
  heading: string
  subheading?: string
  slug: string
  date: string
  posts: Post[]
}

export const articles: Article[] = [
  {
    id: 1,
    heading: "A DEVELOPERS GUIDE TO SCHOOL MANAGEMENT SYSTEM",
    subheading: "Why SchoolBase and why open source matters",
    slug: "developers-guide-school-management",
    date: "28/11/2025",
    posts: [
      {
        key: "intro",
        heading: "Introduction",
        content: [
          {
            type: "paragraph" as const,
            text: "According to Google, education is changing at a rapid and accelerating pace which is primarily driven by rapid technological advancement and global shifts in the job market. This is a significant departure from the slower, more traditional changes of the past.",
          },
          {
            type: "paragraph" as const,
            text: "As a developer, you have an opportunity to shape how schools operate. If you're interested in entering the edtech space, school management systems is one of the highest impact areas you can work on. School management is the backbone of educational institutions.",
          },
          {
            type: "paragraph" as const,
            text: "This guide will show you the essential components, challenges and opportunities that you can use to build your first integration with schoolbase, why open source matters in this space.",
          },
        ],
      },
      {
        key: "why_schoolbase",
        heading: "Why SchoolBase",
        content: [
          {
            type: "paragraph" as const,
            text: "Open source is just not another tech thing, it changes how we work with school management systems.",
          },
          {
            type: "paragraph" as const,
            text: "With schoolbase open source it allows you to shape the system around the real needs of the school, rather than forcing our own systems on them.",
          },
          { type: "paragraph" as const, text: "This is why it matters;" },
          {
            type: "paragraph" as const,
            text: "Transparency and control: You're in full control of everything. You can audit security, modify workflow and fix issues immediately without waiting.",
          },
          {
            type: "paragraph" as const,
            text: "It is developer friendly: with schoolbase open source SMS you can give role based accessed control, scalable data models and integration ready architecture. Whatsoever you want to do from custom plugins, to connecting of third party systems it is made to make customization straightforward.",
          },
          {
            type: "paragraph" as const,
            text: "Our licensing fees don't force you into hard contracts, we just collect 10-20% per school. It simply means you're free to deploy, scale and innovate.",
          },
          {
            type: "paragraph" as const,
            text: "You have a whole community to attend to you, you get faster solutions, peer reviews, improved documentation, community plugins etc.",
          },
        ],
      },
      {
        key: "features",
        heading: "Features Schools and Developers Love",
        content: [
          {
            type: "paragraph" as const,
            text: "The beauty of SchoolBase is that it serves both schools and developers simultaneously.",
          },
          {
            type: "paragraph" as const,
            text: "While schools love the smoothness of things, developers love the technical aspect. Schools love SchoolBase for its practicality in parents updates that keeps them informed, fees management that sends timely reminders and simplifies payment and billing, administrative dashboards that let them see everything in one glance. These features directly address and solve the pain the schools admins face.",
          },
          {
            type: "paragraph" as const,
            text: "Developers on the other hand love the technicalities of our product. The fact that they have the ability to centralize data, automate and streamline operations, easy authentication, a zero trust model meaning SchoolBase doesn't hold schools data, the schools do. They use this point to assure schools that their data is safe.",
          },
          {
            type: "paragraph" as const,
            text: "Are you ready to build your first integration with SchoolBase? Or are you still checking possibilities? Or your curiosity has piqued and you want to see how our open source product works? ",
          },
          {
            type: "paragraph" as const,
            text: "Fill out the form below to get access to our developer documentation, reach our support team and see how you can use schoolbase to create an impact",
          },
        ],
      },
    ],
  },

  {
    id: 2,
    heading: "A COMPLETE GUIDE TO TRACKING ATTENDANCE",
    slug: "complete-guide-tracking-attendance",
    date: "28/11/2025",
    posts: [
      {
        key: "intro",
        heading: "",
        content: [
          {
            type: "paragraph" as const,
            text: "Manual attendance is one of the tasks that takes up a large amount of teachers' time. Even at the school entrance where teachers sign in, a simple tap of a card on a screen or using biometrics would reduce the time it takes to mark attendance significantly. According to Google, schools that take attendance with roll calls lose at least 30hours annually per teacher. This time can be spent on better things like student engagement, lesson planning and guidance for students. School administrators are steadily looking for ways to regain back their time and this guide will show you how to do so.",
          },
          {
            type: "paragraph" as const,
            text: "For school administrators looking to improve their school's attendance, it's no longer if it works but they're looking for the BEST options in the market. Is it NFC? Or biometrics? Or the card swipe?",
          },
        ],
      },
      {
        key: "school_needs",
        heading: "KNOWING YOUR SCHOOLS NEEDS",
        content: [
          {
            type: "paragraph" as const,
            text: "When looking for automatic attendance apps and check in solutions, schools face these three difficulties:",
          },
          {
            type: "list" as const,
            items: [
              "Biometrics is highly secured but they're concerned about data leaks, privacy issues. This is a huge cause of alarm for parents. Also during peak hours like morning drop offs, it can create an unnecessary queue outside.",
              "Card swipe is good and affordable with little to no data concern but it can get lost, forgotten or even stolen. And this act creates gaps in the tracking of the attendance system.",
              "This makes NFC the juicy spot for schools because students just tap their ID or phone against the reader and it is recorded instantly.",
            ],
          },
          {
            type: "paragraph" as const,
            text: "SchoolBase offers this as it removes the bottlenecks, morning rushes, and works with what most schools already have (Student IDs and phones for teachers).",
          },
        ],
      },
      {
        key: "why_schoolbase_nfc",
        heading: "WHY YOU SHOULD USE SCHOOLBASE NFC FOR ATTENDANCE",
        content: [
          {
            type: "list" as const,
            items: [
              "Teachers no longer spend mornings calling out names manually as students just tap in and enter",
              "School administrators get an immediate look at who's present and who is absent creating accountability and transparency.",
              "It saves 20 hours per teacher.",
              "Improves attendance tracking to near perfection of 99%",
              "Gives you automatic attendance reporting",
            ],
          },
          {
            type: "paragraph" as const,
            text: "Whether you're a small school or large school, SchoolBase developers build the attendance to suit your school needs.",
          },
          {
            type: "paragraph" as const,
            text: "Use this to track truancy trends, attendance patterns, and save time.",
          },
          {
            type: "paragraph" as const,
            text: "Fill out the form below to schedule a demo with a developer",
          },
        ],
      },
    ],
  },

  {
    id: 3,
    heading: "HOW TO SHARE WARDS RESULTS WITH PARENTS",
    slug: "share-wards-results-with-parents",
    date: "28/11/2025",
    posts: [
      {
        key: "intro",
        heading: "",
        content: [
          {
            type: "paragraph" as const,
            text: "Result time is one of the busiest times in schools as it is manually tasking for teachers as it involves weeks of imputing results, compilation, cross checking for errors, printing of physical reports and giving to parents. Over 70% of schools still rely on spreadsheets or grading software that still forces teachers to enter the same data multiple times in different platforms. ",
          },
          {
            type: "paragraph" as const,
            text: "Parents get anxious while waiting to know their wards performance, they don't see problems early so they can intervene until the report cards are ready. This lack of connection between imputation of grades, calculating grades and parent communication gives teachers excessive workload while parents remain in the dark about their wards academic progress. With SchoolBase these problems are solved, it connects teachers, students and parents making it impossible for anyone to be unaware. ",
          },
        ],
      },
      {
        key: "result_management",
        heading: "Schoolbase Result Management System",
        content: [
          {
            type: "paragraph" as const,
            text: "SchoolBase has an effective grading portal which changes how teachers record and manage students' academics throughout the term. Instead of having different grade sheets, attendance sheets, and assessment compilers, teachers enter scores once into SchoolBase that automatically calculates averages, tracks, grades, and shows students who are struggling.",
          },
          {
            type: "paragraph" as const,
            text: "It supports various grading schemes, whether your school uses letter grading, percentages or gpa. It is built to satisfy your school needs. Schoolbase removes the rush that happens at the end of the term because grades are upgraded continuously and when the session is over, it generates an automatic report card that applies to your school grading system and instructions. This doesn't just save you hours, it reduces error to a minimal percentage.",
          },
        ],
      },
      {
        key: "parent_portals",
        heading: "Parent Portals:",
        content: [
          {
            type: "paragraph" as const,
            text: "The “sweetest” spot of SchoolBase is the parent-academic portals it comes with. Parents can log into here and view their wards performance on all subjects, see how they perform in their take home assessment, check attendance, and also take note of the comments left by the teachers. They can do all this without having to text, call or phone anybody. It gives them control and transparency over what happens to their wards. They can also use this to raise issues where their child is lacking. Instead of handing out printed results to parents, you save time, resources etc and redirect it to counselling on where their child is lacking. This creates a feedback interaction where parents are active in their wards education.",
          },
          {
            type: "paragraph" as const,
            text: "Ready to eliminate report card stress and give parents the transparency they want?",
          },
          {
            type: "paragraph" as const,
            text: "Fill out the form below to see a live demo of our grade entry and parent portal features, learn how to share student results with parents instantly",
          },
        ],
      },
    ],
  },

  {
    id: 4,
    heading: "HOW TO LINK ATTENDANCE AND RESULTS TO CREATE A PARENT ENGAGEMENT SYSTEM",
    slug: "link-attendance-results-parent-engagement",
    date: "28/11/2025",
    posts: [
      {
        key: "intro",
        heading: "",
        content: [
          {
            type: "paragraph" as const,
            text: "Unlike before, these days parents expect information about their kids school performance, yet most schools still use outdated systems. Thereby making this process not only time taking but difficult.",
          },
          {
            type: "paragraph" as const,
            text: "Teachers manually grade students, taking attendance while parents wait for weeks or months without knowing the performance of their child.",
          },
          {
            type: "paragraph" as const,
            text: "This approach wastes valuable time, and also gives poor data collating results that prevent real growth of schools, making both parents and teachers frustrated.",
          },
          {
            type: "paragraph" as const,
            text: "Modernized schools are learning to consider NFC attendance systems and also a digital result management system that creates a connection between a child's education and the parents. Which is all SchoolBase is about.  With it you can connect the school, parents, teachers, students all in one platform. This helps them to know the performance of their wards and intervene on time. ",
          },
        ],
      },
      {
        key: "power_of_schoolbase",
        heading: "The Power of SchoolBase:",
        content: [
          {
            type: "paragraph" as const,
            text: "From Check-In to Report Card when you use SchoolBase, an automatic attendance app alongside an online grade entry portal within a unified school management system with parent view results, something good happens, you create a complete digital ecosystem of student performance data.",
          },
          {
            type: "paragraph" as const,
            text: "Students tap their ID cards at NFC readers as they enter each classroom, giving parents real tracking of their wards and instantly updates the teachers attendance records. These same teachers now use this for CA tests compilation, quiz scores and assignment feedback throughout the term rather than rushing at the close of the session.",
          },
          {
            type: "paragraph" as const,
            text: "Because both things are done on SchoolBase, it is easy to track attendance patterns, academic performance, helping teachers and parents to settle discrepancies in grades, declining grades etc.",
          },
          {
            type: "paragraph" as const,
            text: "The ability to see everything in one glance also applies to parents, it helps them to track their child's daily performance, their child logs into school at 7:58am, scores A in English quiz, and has an average of 86.5% at the end of the term. This simple note builds trust and reliability.",
          },
        ],
      },
      {
        key: "answering_parent_concerns",
        heading: 'Answering the "How Do I Know?" Problem for Parents',
        content: [
          {
            type: "paragraph" as const,
            text: 'The most common questions schools receive from parents revolve around two concerns: "Is my child attending class?" and "How is my child performing academically?" Older systems force parents to wait till closing date before getting a formal report about their kids\' grades, most times this is the wrong time to start correcting because the ward is already failing.',
          },
          {
            type: "paragraph" as const,
            text: "With SchoolBase, this concern is answered because parents can check how their wards are performing academically. When their ward misses their signing time, their parents are notified, if they score poorly on a quiz or test, they're also notified. This isn't just convenience, this creates awareness and engagement of parents. Schools using SchoolBase showed a decrease of 10% in lateness and absenteeism, this is because parents started knowing and holding their wards accountable.",
          },
        ],
      },
      {
        key: "track_engagement",
        heading: "Track Parent Engagement with SchoolBase",
        content: [
          {
            type: "paragraph" as const,
            text: "SchoolBase uniquely combines NFC attendance technology, comprehensive grade management, and robust parent portals in one platform designed specifically for how schools actually operate.",
          },
          {
            type: "paragraph" as const,
            text: "SchoolBase solution processes attendance in under a second while our online grade entry portal gives teachers  tools for continuous assessment tracking and automated report card generation.",
          },
          {
            type: "paragraph" as const,
            text: "Parents can see everything through the portal that answers the “how to share results with parents” and “how to automate school attendance”",
          },
          {
            type: "paragraph" as const,
            text: "Whether you're exploring the best way to manage continuous assessment data, comparing if NFC attendance is better than biometrics, or trying to switch from manual to digital attendance and grade systems simultaneously, our integrated approach eliminates the data silos and duplicate entry that plague schools using separate point solutions.",
          },
          {
            type: "paragraph" as const,
            text: " Ready to see how connected attendance and grade systems create unprecedented parent engagement while saving your staff dozens of hours monthly? Fill out the form below to schedule a comprehensive demo showing our real-time student tracking, digital result management, and parent communication features working together seamlessly.",
          },
        ],
      },
    ],
  },

  {
    id: 5,
    heading: "HOW TO AUTOMATE SCHOOL FEE COLLECTION WITH DIGITAL INVOICE AND RECEIPTS",
    slug: "automate-school-fee-collection",
    date: "28/11/2025",
    posts: [
      {
        key: "intro",
        heading: "",
        content: [
          {
            type: "paragraph" as const,
            text: "Fee leakages and collections is one of the biggest challenges MOST schools face. With school accountants spending countless hours manually tracking payments, creating invoices and chasing outstanding fees before reconciling at month's end. With the olden system, it creates room for errors, lost payments, and what your accountant will tell you \"financial leakage\" Private schools report losing 5-15% of revenue due to untracked fees, forgotten payments and manual error. Parents, meanwhile, struggle with lost paper receipts, confusion about what they've paid and what's remaining, and the inconvenience of making payments only during school office hours.",
          },
          {
            type: "paragraph" as const,
            text: "SchoolBase fee management system handles everything from creating invoices and receipts automatically to tracking every money owed. This administrative issue is now a streamlined, transparent process that benefits schools and Parents alike.",
          },
        ],
      },
      {
        key: "automated_invoicing",
        heading: "From Chaos to Automated Invoicing",
        content: [
          {
            type: "paragraph" as const,
            text: "SchoolBase eliminates these issues. Instead of using a manual process to generate invoice and receipt, SchoolBase automatically applies your fees structure, calculates discounts if necessary, adds extracurricular activities, and produces invoices ready for distribution. The fee management system then monitors when payments are being made, who is on a payment plan, who paid in full, who is overdue and how much. When payment arrives from the gateway, it immediately produces receipts and automatically updates the balance left for that student. This removes double entry work, and reduces reconciliation time from days to mere seconds.",
          },
        ],
      },
      {
        key: "reduce_financial_loss",
        heading: "How to Reduce Financial loss with SchoolBase",
        content: [
          {
            type: "paragraph" as const,
            text: "The problem of how schools can track outstanding fees easily becomes very important when you consider that most school financial losses aren't due to fraud but poor visibility and follow-up systems. Without a proper fee management system,  it's easy to lose track of which students owe money, especially when dealing with complex payment arrangements, mid-year enrollments, or students who leave mid term.",
          },
          {
            type: "paragraph" as const,
            text: "SchoolBase fee management system provides dashboard views showing exactly who owes what at any time, with automatic reminders sent to parents before due dates and escalating notifications for overdue accounts to administrators.",
          },
          {
            type: "paragraph" as const,
            text: 'Schools using these SchoolBase tell us about drastic reductions in outstanding fee balances because the automated follow-up removes the "out of sight, out of mind" problem that affects manual tracking. The integrated payment gateway for schools removes another source of fee leakage by making it convenient for parents to pay immediately when they receive an invoice or reminder they can click a link and pay online rather than needing to remember to send cash or checks with their child.',
          },
          {
            type: "paragraph" as const,
            text: "Transaction records are automatically logged, creating an audit trail that prevents disputes about whether payment was received and significantly reduces the reconciliation errors that occur when manually matching payments to student accounts.",
          },
        ],
      },
      {
        key: "complete_automation",
        heading: "Implement Complete Financial Automation with SchoolBase",
        content: [
          {
            type: "paragraph" as const,
            text: "SchoolBase's comprehensive fee management system handles every aspect of school finances from invoice generation through payment collection and receipt issuance, all within your integrated school management platform. Our automated school invoicing engine creates personalized invoices based on your unique fee structures, automatically applying discounts, payment plans, and special arrangements without manual intervention. The digital receipt generator produces professional, customizable receipts instantly upon payment, whether families pay through our integrated payment gateway for schools, at your office, or via bank transfer.",
          },
          {
            type: "paragraph" as const,
            text: "Ready to automate your invoices and receipts?",
          },
          {
            type: "paragraph" as const,
            text: "Fill out the form below to schedule a demo of our online fee management system, learn how to track outstanding fees easily with SchoolBase",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    heading: "HOW TO DIGITALIZE YOUR SCHOOL : FROM ATTENDANCE TO FEE COLLECTION",
    slug: "digitalize-school-from-attendance-to-fee-collection",
    date: "28/11/2025",
    posts: [
      {
        key: "intro",
        heading: "",
        content: [
          {
            type: "paragraph" as const,
            text: "Most school administrators  that want to make their school more digital tend to make the mistakes of using different apps to do so. Doing this only creates further confusion for them, and increases their workload instead of reducing it.",
          },
          {
            type: "paragraph" as const,
            text: "Teachers have to log into multiple platforms to perform one task. Parents receive emails for results, attendance from another app and fees receipts and invoices on paper therefore making everybody involved very confused. SchoolBase sorts out this issue and removes the need of having multiple apps for just one process.",
          },
        ],
      },
      {
        key: "remove_redundant_work",
        heading: "How SCHOOLBASE removes redundant work and saves time",
        content: [
          {
            type: "paragraph" as const,
            text: "Imagine your school completely digitalized, students tap their student ID card on the NFC reader before entering the school, parents receive a notification of the safe arrival of their ward. This same system know if this child has an outstanding balance, the attendance rate of that child, the academic report.",
          },
          {
            type: "paragraph" as const,
            text: "You get to manage your school from your phone. In class, the teacher uses it to record quiz scores, take attendance and grades all in one platform.  The system automatically links the student's recent absences with declining math performance, flagging this for both teacher and parent attention.",
          },
          {
            type: "paragraph" as const,
            text: "When term ends, automated result management gives attendance records, continuous assessment scores, and outstanding fee information into one report with no manual data compilation required.",
          },
          {
            type: "paragraph" as const,
            text: "The digital receipt generator issues payment confirmations that automatically update the student's financial status, which parents view alongside grades and attendance.",
          },
        ],
      },
      {
        key: "solve_multiple_problems",
        heading: "Solving Multiple Problems with SchoolBase",
        content: [
          {
            type: "paragraph" as const,
            text: "Schools researching the best way to manage continuous assessment data, how to automate school attendance, how schools can track outstanding fees easily, and how to share student results with parents often assume these require separate specialized solutions. With SchoolBase all these problems fit into one.",
          },
          {
            type: "paragraph" as const,
            text: "The truth is these issues are interconnected, attendance affects academic performance, financial problems disturbs retention.",
          },
          {
            type: "paragraph" as const,
            text: "When you're evaluating whether NFC attendance is better than biometrics or comparing different paperless report cards solutions, the crucial question isn't which standalone tool is best but which integrated platform solves multiple problems simultaneously.",
          },
        ],
      },
      {
        key: "your_unified_school_system",
        heading: "Build Your Unified School Management System with SchoolBase",
        content: [
          {
            type: "paragraph" as const,
            text: "SchoolBase provides the only truly integrated platform that connects every aspect of school operations in one system. Our NFC-based student check-in solution processes attendance instantly while our continuous assessment software and online grade entry portal give teachers efficient tools for academic tracking, all feeding into automated report card generation that produces professional results in minutes. Parents access a single parent academic portal where they see real-time attendance, instant student results, outstanding fee balances, and make payments through our integrated payment gateway answering every \"how is my child doing\" question in one place. Our automated school invoicing creates personalized invoices, our digital receipt generator produces instant payment confirmations, and our fee tracking software provides administrators with complete financial visibility to reduce financial leakages. Whether you're a small private school looking for the best fee management software or a large district needing paperless attendance software and digital result management at scale, SchoolBase's architecture adapts to your needs without forcing you into restrictive contracts or expensive per-student licensing.",
          },
          {
            type: "paragraph" as const,
            text: "Ready to see how one  platform can replace your fragmented systems while saving hundreds of administrative hours annually?",
          },
          {
            type: "paragraph" as const,
            text: " Fill out the form below to  demo showing how attendance tracking, grade management, parent communication, and fee collection work together with SchoolBase.",
          },
        ],
      },
    ],
  },
]
