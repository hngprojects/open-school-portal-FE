// "use client";

// import { FileText, Eye, Download } from "lucide-react";

// export default function LegalPrivacyPage() {
//   const documents = [
//     {
//       title: "Terms of Service",
//       updated: "Last updated: January 2024",
//       viewUrl: "/legal/terms",
//       downloadUrl: "/legal/terms.pdf",
//     },
//     {
//       title: "Privacy Policy",
//       updated: "Last updated: January 2024",
//       viewUrl: "/legal/privacy",
//       downloadUrl: "/legal/privacy.pdf",
//     },
//     {
//       title: "Data Processing Agreement",
//       updated: "Last updated: January 2024",
//       viewUrl: "/legal/dpa",
//       downloadUrl: "/legal/dpa.pdf",
//     },
//   ];

//   return (
//     <>
//       <div className="bg-white rounded-xl shadow-sm p-8 max-w-full mx-auto">
//         <h1 className="text-2xl font-bold text-gray-900 mb-2">Legal & Privacy</h1>
//         <p className="text-gray-600 mb-10">
//           Review our terms, privacy policy, and legal documents.
//         </p>

//         <div className="space-y-6">
//           {documents.map((doc) => (
//             <div
//               key={doc.title}
//               className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
//             >
//               <div className="flex items-start justify-between">
//                 <div className="flex items-start gap-4">
//                   <div className="shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
//                     <FileText className="w-6 h-6 text-gray-600" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-900 text-lg">{doc.title}</h3>
//                     <p className="text-sm text-gray-500 mt-1">{doc.updated}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <a
//                     href={doc.viewUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium text-gray-700"
//                   >
//                     <Eye className="w-4 h-4" />
//                     View
//                   </a>
//                   <a
//                     href={doc.downloadUrl}
//                     download
//                     className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium text-gray-700"
//                   >
//                     <Download className="w-4 h-4" />
//                     Download
//                   </a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
//           <div className="flex items-start gap-4">
//             <div className="shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//               <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//             <div>
//               <h4 className="font-semibold text-blue-900">Need help understanding our policies?</h4>
//               <p className="text-sm text-blue-700 mt-1">
//                 Contact our support team at{" "}
//                 <a href="mailto:legal@schoolbase.com" className="underline hover:text-blue-800">
//                   legal@schoolbase.com
//                 </a>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

"use client"

import { FileText, Eye, Download } from "lucide-react"

export default function LegalPrivacyPage() {
  const documents = [
    {
      title: "Terms of Service",
      updated: "Last updated: January 2024",
      viewUrl: "#",
      // downloadUrl: "/legal/terms.pdf",
      downloadUrl: "#",
    },
    {
      title: "Privacy Policy",
      updated: "Last updated: January 2024",
      viewUrl: "#",
      downloadUrl: "#",
    },
    {
      title: "Data Processing Agreement",
      updated: "Last updated: January 2024",
      viewUrl: "#",
      downloadUrl: "#",
    },
  ]

  return (
    <>
      {/* Mobile Top Padding for Header */}
      <div className="min-h-screen bg-gray-50 pt-16 lg:pt-0">
        <div className="mx-auto max-w-4xl rounded-t-3xl bg-white p-6 shadow-sm lg:rounded-xl lg:p-8 lg:shadow-none">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">Legal & Privacy</h1>
          <p className="mb-8 text-gray-600 lg:mb-10">
            Review our terms, privacy policy, and legal documents.
          </p>

          <div className="space-y-6">
            {documents.map((doc) => (
              <div
                key={doc.title}
                className="rounded-xl border border-gray-200 p-6 transition-shadow hover:shadow-md"
              >
                {/* Mobile: Vertical Stack */}
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  {/* Left: Icon + Title */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                      <FileText className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{doc.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{doc.updated}</p>
                    </div>
                  </div>

                  {/* Right: Buttons */}
                  <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                    <a
                      href={doc.viewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </a>
                    <a
                      href={doc.downloadUrl}
                      download
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Support Box */}
          <div className="mt-10 rounded-xl border border-blue-200 bg-blue-50 p-6 lg:mt-12">
            <div className="flex flex-col items-start gap-4 sm:flex-row">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900">
                  Need help understanding our policies?
                </h4>
                <p className="mt-1 text-sm text-blue-700">
                  Contact our support team at{" "}
                  <a
                    href="mailto:legal@schoolbase.com"
                    className="underline hover:text-blue-800"
                  >
                    legal@schoolbase.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
