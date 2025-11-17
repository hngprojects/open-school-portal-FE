export interface ImageData {
  src: string
  mobile: {
    width: number
    height: number
    bottom: string
    left: string
  }
  desktop: {
    width: number
    height: number
    bottom: string
    left: string
  }
  zIndex: number
}

export interface Feature {
  id: string
  header: string
  paragraph: string
  images: ImageData[]
}

// DATA
export const HowItWorksFeatures: Feature[] = [
  {
    id: "feat-1",
    header: "Set Up Your School (Admins)",
    paragraph:
      "Admins can set up the entire school in minutes adding classes, departments, teachers, students, subjects, timetables, fee groups, and all necessary information creating a fully digitized school structure.",
    images: [
      {
        src: "/assets/images/howitworks/feat-1.1.svg",
        mobile: {
          width: 180,
          height: 140,
          bottom: "-60px",
          left: "10px",
        },
        desktop: {
          width: 350,
          height: 264,
          bottom: "-140px",
          left: "20px",
        },
        zIndex: 1,
      },
      {
        src: "/assets/images/howitworks/feat-1.2.svg",
        mobile: {
          width: 160,
          height: 180,
          bottom: "-60px",
          left: "80px",
        },
        desktop: {
          width: 300,
          height: 380,
          bottom: "-140px",
          left: "120px",
        },
        zIndex: 2,
      },
    ],
  },

  {
    id: "feat-2",
    header: "Smart Attendance (Admins, Teacher & Students)",
    paragraph:
      "Students check in instantly with NFC ID cards, teachers can take attendance manually, and admins get real-time attendance tracking with no paperwork.",
    images: [
      {
        src: "/assets/images/howitworks/feat-2.1.svg",
        mobile: {
          width: 180,
          height: 150,
          bottom: "-60px",
          left: "16px",
        },
        desktop: {
          width: 350,
          height: 264,
          bottom: "-140px",
          left: "20px",
        },
        zIndex: 2,
      },
      {
        src: "/assets/images/howitworks/feat-2.2.svg",
        mobile: {
          width: 150,
          height: 140,
          bottom: "-60px",
          left: "100px",
        },
        desktop: {
          width: 300,
          height: 264,
          bottom: "-140px",
          left: "120px",
        },
        zIndex: 1,
      },
    ],
  },

  {
    id: "feat-3",
    header: "Academics & Results (Teachers, Admins & Students)",
    paragraph:
      "Teachers enter scores, admins approve results, and students access their digital report cards anytime.",
    images: [
      {
        src: "/assets/images/howitworks/feat-3.1.svg",
        mobile: {
          width: 180,
          height: 190,
          bottom: "-70px",
          left: "16px",
        },
        desktop: {
          width: 350,
          height: 420,
          bottom: "-140px",
          left: "20px",
        },
        zIndex: 2,
      },
      {
        src: "/assets/images/howitworks/feat-3.2.svg",
        mobile: {
          width: 150,
          height: 160,
          bottom: "-70px",
          left: "110px",
        },
        desktop: {
          width: 300,
          height: 380,
          bottom: "-140px",
          left: "120px",
        },
        zIndex: 1,
      },
    ],
  },

  {
    id: "feat-4",
    header: "Fees & Payments (Admins & Parents)",
    paragraph:
      "Admins create invoices, track payments, and send reminders while parents pay online and view their full payment history.",
    images: [
      {
        src: "/assets/images/howitworks/feat-4.1.svg",
        mobile: {
          width: 180,
          height: 180,
          bottom: "-70px",
          left: "20px",
        },
        desktop: {
          width: 350,
          height: 420,
          bottom: "-140px",
          left: "20px",
        },
        zIndex: 1,
      },
      {
        src: "/assets/images/howitworks/feat-4.2.svg",
        mobile: {
          width: 160,
          height: 160,
          bottom: "-70px",
          left: "110px",
        },
        desktop: {
          width: 300,
          height: 380,
          bottom: "-140px",
          left: "120px",
        },
        zIndex: 2,
      },
    ],
  },

  {
    id: "feat-5",
    header: "Timetable Management (Admins & Teachers)",
    paragraph:
      "Admins and teachers manage timetables in one place, while students always see the most updated versions.",
    images: [
      {
        src: "/assets/images/howitworks/feat-5.1.svg",
        mobile: {
          width: 170,
          height: 160,
          bottom: "-70px",
          left: "16px",
        },
        desktop: {
          width: 350,
          height: 420,
          bottom: "-140px",
          left: "20px",
        },
        zIndex: 1,
      },
      {
        src: "/assets/images/howitworks/feat-5.2.svg",
        mobile: {
          width: 150,
          height: 150,
          bottom: "-70px",
          left: "110px",
        },
        desktop: {
          width: 300,
          height: 380,
          bottom: "-140px",
          left: "120px",
        },
        zIndex: 2,
      },
    ],
  },
]

// interface ImageData {
//   src: string
//   width: number
//   height: number
//   style: {
//     bottom: string
//     left: string
//     zIndex: number
//   }
// }

// interface Features {
//   id: string
//   header: string
//   paragraph: string
//   images: ImageData[]
// }

// export const HowItWorksFeatures: Features[] = [
//   {
//     id: "feat-1",
//     header: "Set Up Your School (Admins)",
//     paragraph:
//       "Admins can set up the entire school in minutes adding classes, departments, teachers, students, subjects, timetables, fee groups, and all necessary information creating a fully digitized structure that forms the foundation for smooth, efficient operations.",
//     images: [
//       {
//         src: "/assets/images/howitworks/feat-1.1.svg",
//         width: 350,
//         height: 264,
//         style: { bottom: "-140px", left: "20px", zIndex: 1 },
//       },
//       {
//         src: "/assets/images/howitworks/feat-1.2.svg",
//         width: 300,
//         height: 380,
//         style: { bottom: "-140px", left: "120px", zIndex: 2 },
//       },
//     ],
//   },
//   {
//     id: "feat-2",
//     header: "Smart Attendance (Admins, Teacher & Students)",
//     paragraph:
//       "With Smart Attendance, students check in instantly by tapping their NFC ID cards, teachers can take attendance manually when needed, and admins see real-time records for the entire school automatically tracking late arrivals, absences, and teacher attendance, eliminating paperwork and ensuring instant, accurate updates for everyone.",
//     images: [
//       {
//         src: "/assets/images/howitworks/feat-2.1.svg",
//         width: 350,
//         height: 264,
//         style: { bottom: "-140px", left: "20px", zIndex: 2 },
//       },
//       {
//         src: "/assets/images/howitworks/feat-2.2.svg",
//         width: 300,
//         height: 264,
//         style: { bottom: "-140px", left: "120px", zIndex: 1 },
//       },
//     ],
//   },
//   {
//     id: "feat-3",
//     header: "Academics & Results (Teachers, Admins & Students)",
//     paragraph:
//       "Teachers can record classwork, assignments, tests, and exams while uploading results; admins can approve and publish digital report cards; and students and parents can view results anytime, track performance, and download report cards creating a complete academic record that is organized, transparent, and always accessible.",
//     images: [
//       {
//         src: "/assets/images/howitworks/feat-3.1.svg",
//         width: 350,
//         height: 420,
//         style: { bottom: "-140px", left: "20px", zIndex: 2 },
//       },
//       {
//         src: "/assets/images/howitworks/feat-3.2.svg",
//         width: 300,
//         height: 380,
//         style: { bottom: "-140px", left: "120px", zIndex: 1 },
//       },
//     ],
//   },
//   {
//     id: "feat-4",
//     header: "Fees & Payments (Admins & Parents)",
//     paragraph:
//       "Fees become structured and easy to manage as admins create fee groups, assign charges to classes or individual students, generate invoices, send reminders, and track payments in real time, while parents can view all fee details, pay directly, and access their full payment history resulting in stress free fee collection with complete transparency.",
//     images: [
//       {
//         src: "/assets/images/howitworks/feat-4.1.svg",
//         width: 350,
//         height: 420,
//         style: { bottom: "-140px", left: "20px", zIndex: 1 },
//       },
//       {
//         src: "/assets/images/howitworks/feat-4.2.svg",
//         width: 300,
//         height: 380,
//         style: { bottom: "-140px", left: "120px", zIndex: 2 },
//       },
//     ],
//   },
//   {
//     id: "feat-5",
//     header: "Timetable Management (Admins & Teachers)",
//     paragraph:
//       "Open School Portal keeps the school schedule organized by allowing admins and teachers to create and update timetables, assign classes and subjects, and share schedules with students and parents, while everyone can view the latest timetable in one place ensuring no confusion, missed classes, or scheduling conflicts across the school community.",
//     images: [
//       {
//         src: "/assets/images/howitworks/feat-5.1.svg",
//         width: 350,
//         height: 420,
//         style: { bottom: "-140px", left: "20px", zIndex: 1 },
//       },
//       {
//         src: "/assets/images/howitworks/feat-5.2.svg",
//         width: 300,
//         height: 380,
//         style: { bottom: "-140px", left: "120px", zIndex: 2 },
//       },
//     ],
//   },
// ]
