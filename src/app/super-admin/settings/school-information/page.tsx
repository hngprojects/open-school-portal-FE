// // components/settings/SchoolInformationForm.tsx
// 'use client';

// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import Image from 'next/image';
// import { Upload, X, CheckCircle } from 'lucide-react';

// // Form Schema
// const schema = z.object({
//   schoolName: z.string().min(2, 'School name is required'),
//   address1: z.string().min(5, 'Address is required'),
//   address2: z.string().min(5, 'Full address is required'),
//   phone: z.string().regex(/^\d{10}$/, 'Valid 10-digit phone number required'),
//   brandColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Valid hex color required'),
// });

// type FormData = z.infer<typeof schema>;

// export default function SchoolInformationForm() {
//   const [logoPreview, setLogoPreview] = useState('/studbridge-logo.png');
//   const [uploadError, setUploadError] = useState('');
//   const [showSuccess, setShowSuccess] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<FormData>({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       schoolName: '',
//       address1: '',
//       address2: '',
//       phone: '',
//       brandColor: '',
//     },
//   });

//   const handleImageUpload = (file: File | null) => {
//     setUploadError('');

//     if (!file) return;

//     if (!file.type.startsWith('image/')) {
//       setUploadError('Please upload a valid image (PNG, JPG)');
//       return;
//     }
//     if (file.size > 5 * 1024 * 1024) {
//       setUploadError('Image must be under 5MB');
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setLogoPreview(reader.result as string);
//     };
//     reader.readAsDataURL(file);
//   };

//   const onSubmit = async (data: FormData) => {
//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     setShowSuccess(true);
//     setTimeout(() => setShowSuccess(false), 4000);
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl space-y-8">
//         {/* School Logo Card */}
//         <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
//           <div className="px-8 py-6 border-b border-gray-100">
//             <h3 className="text-lg font-semibold text-gray-900">School Logo</h3>
//             <p className="text-sm text-gray-500 mt-1">Update your School logo</p>
//           </div>

//           <div className="px-8 py-10">
//             <div className="flex items-center gap-10">
//               {/* Logo Preview */}

//               <div className="relative w-36 h-36 rounded-full overflow-hidden border border-gray-200 bg-white shadow-sm">
//                 <Image
//                     src={logoPreview}
//                     alt="School Logo"
//                     fill
//                     className="object-cover"
//                     priority
//                 />
//                 </div>

//               {/* Upload Area */}
//               <div>
//                 <label
//                   htmlFor="logo-upload"
//                   className="cursor-pointer inline-block"
//                   onDrop={(e) => {
//                     e.preventDefault();
//                     handleImageUpload(e.dataTransfer.files[0]);
//                   }}
//                   onDragOver={(e) => e.preventDefault()}
//                 >
//                   <div className="px-6 py-4 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition flex items-center gap-3">
//                     <Upload className="w-5 h-5 text-gray-600" />
//                     <span className="text-sm font-medium text-gray-700">Change photo</span>
//                   </div>
//                 </label>
//                 <input
//                   id="logo-upload"
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={(e) => handleImageUpload(e.target.files?.[0] || null)}

//                 />

//                 {uploadError && (
//                   <p className="text-red-600 text-xs mt-2 flex items-center gap-1">
//                     <X className="w-4 h-4" />
//                     {uploadError}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Personal Information Card */}
//         <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
//           <div className="px-8 py-6 border-b border-gray-100">
//             <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
//             <p className="text-sm text-gray-500 mt-1">Manage your personal information</p>
//           </div>

//           <div className="px-8 py-10">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {/* School Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-3">School Name</label>
//                 <input
//                   {...register('schoolName')}
//                   className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition"
//                   placeholder='Enter School Name'
//                 />
//                 {errors.schoolName && (
//                   <p className="text-red-600 text-xs mt-2">{errors.schoolName.message}</p>
//                 )}
//               </div>

//               {/* Address Line 1 */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-3">School Address</label>
//                 <input
//                   {...register('address1')}
//                   className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition"
//                    placeholder='Enter School Address '
//                 />
//                 {errors.address1 && (
//                   <p className="text-red-600 text-xs mt-2">{errors.address1.message}</p>
//                 )}
//               </div>

//               {/* Brand Color */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-3">
//                   Primary Brand Color <span className="text-red-600">*</span>
//                 </label>
//                 <div className="flex items-center gap-4">
//                   <div
//                     className="w-14 h-14 rounded-xl border-2 border-gray-300 shadow-inner"
//                     style={{ backgroundColor: logoPreview ? '#DA3743' : '#DA3743' }}
//                   />
//                   <input
//                     {...register('brandColor')}
//                     className="flex-1 px-4 py-3.5 border border-gray-300 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
//                       placeholder='#DA3743'
//                   />
//                 </div>
//                 <p className="text-xs text-gray-500 mt-3">
//                   This color will be used throughout your portal interface
//                 </p>
//                 {errors.brandColor && (
//                   <p className="text-red-600 text-xs mt-2">{errors.brandColor.message}</p>
//                 )}
//               </div>

//               {/* Phone */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-3">School Phone No.</label>
//                 <div className="flex">
//                   <span className="inline-flex items-center px-4 py-3.5 bg-gray-50 border border-r-0 border-gray-300 rounded-l-xl text-gray-600 font-medium">
//                     +234
//                   </span>
//                   <input
//                     {...register('phone')}
//                     className="flex-1 px-4 py-3.5 border border-gray-300 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition"
//                       placeholder='Enter phone number'
//                   />
//                 </div>
//                 {errors.phone && (
//                   <p className="text-red-600 text-xs mt-2">{errors.phone.message}</p>
//                 )}
//               </div>

//               {/* Full Address */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-3">School Address</label>
//                 <input
//                   {...register('address2')}
//                   className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition"
//                     placeholder='Enter School Address 2'
//                 />
//                 {errors.address2 && (
//                   <p className="text-red-600 text-xs mt-2">{errors.address2.message}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Save Button */}
//         <div className="flex justify-end pt-8">
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="px-10 py-4 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-3"
//           >
//             {isSubmitting ? 'Saving...' : 'Save Changes'}
//           </button>
//         </div>
//       </form>

//       {/* Success Card Modal */}
//       {showSuccess && (
//         <>
//           <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full animate-in fade-in zoom-in duration-300">
//               <div className="text-center space-y-6">
//                 <div className="mx-auto w-20 h-20 relative">
//                   <div className="absolute inset-0 animate-ping">
//                     <CheckCircle className="w-20 h-20 text-green-500 opacity-70" />
//                   </div>
//                   <CheckCircle className="w-20 h-20 text-green-500 relative" />
//                 </div>
//                 <div>
//                   <h3 className="text-2xl font-bold text-gray-900">Saved Successfully!</h3>
//                   <p className="text-gray-600 mt-3">Your school information has been updated.</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// }

// components/settings/SchoolInformationForm.tsx
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Image from "next/image"
import { Upload, X, CheckCircle } from "lucide-react"

const schema = z.object({
  schoolName: z.string().min(2, "School name is required"),
  address1: z.string().min(5, "Address is required"),
  address2: z.string().min(5, "Full address is required"),
  phone: z.string().regex(/^\d{10}$/, "Valid 10-digit phone number required"),
  brandColor: z.string().regex(/^#[0-9A-F]{6}$/i, "Valid hex color required"),
})

type FormData = z.infer<typeof schema>

export default function SchoolInformationForm() {
  const [logoPreview, setLogoPreview] = useState("/studbridge-logo.png")
  const [uploadError, setUploadError] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const handleImageUpload = (file: File | null) => {
    setUploadError("")
    if (!file) return

    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload a valid image (PNG, JPG)")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image must be under 5MB")
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setLogoPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1000))
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pt-16 lg:pt-0">
        {/* School Logo Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="border-b border-gray-100 px-6 py-5 lg:px-8 lg:py-6">
            <h3 className="text-lg font-semibold text-gray-900">School Logo</h3>
            <p className="mt-1 text-sm text-gray-500">Update your School logo</p>
          </div>

          <div className="p-6 lg:p-10">
            <div className="flex flex-col items-center gap-8 lg:flex-row">
              <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm">
                <Image
                  src={logoPreview}
                  alt="School Logo"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="w-full lg:w-auto">
                <label
                  htmlFor="logo-upload"
                  className="inline-block cursor-pointer"
                  onDrop={(e) => {
                    e.preventDefault()
                    handleImageUpload(e.dataTransfer.files[0])
                  }}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <div className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-6 py-4 transition hover:bg-gray-50 lg:justify-start">
                    <Upload className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Change photo
                    </span>
                  </div>
                </label>
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e.target.files?.[0] || null)}
                />
                {uploadError && (
                  <p className="mt-3 flex items-center gap-1 text-xs text-red-600">
                    <X className="h-4 w-4" /> {uploadError}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="border-b border-gray-100 px-6 py-5 lg:px-8 lg:py-6">
            <h3 className="text-lg font-semibold text-gray-900">School Information</h3>
            {/* <p className="text-sm text-gray-500 mt-1">Manage your personal information</p> */}
          </div>

          <div className="space-y-8 p-6 lg:p-10">
            <div className="grid grid-cols-1 gap-8">
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  School Name
                </label>
                <input
                  {...register("schoolName")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3.5 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  placeholder="e.g. School Folio"
                />
                {errors.schoolName && (
                  <p className="mt-2 text-xs text-red-600">{errors.schoolName.message}</p>
                )}
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  School Address
                </label>
                <input
                  {...register("address1")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3.5 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  placeholder="Enter School Address"
                />
                {errors.address1 && (
                  <p className="mt-2 text-xs text-red-600">{errors.address1.message}</p>
                )}
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  Primary Brand Color <span className="text-red-600">*</span>
                </label>
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <div
                    className="h-16 w-16 rounded-xl border-2 border-gray-300 shadow-inner"
                    style={{ backgroundColor: "#DA3743" }}
                  />
                  <input
                    {...register("brandColor")}
                    className="flex-1 rounded-xl border border-gray-300 px-4 py-3.5 font-mono text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="#DA3743"
                  />
                </div>
                <p className="mt-3 text-xs text-gray-500">
                  This color will be used throughout your portal interface
                </p>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  School Phone No.
                </label>
                <div className="flex">
                  <span className="inline-flex items-center rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 px-4 py-3.5 font-medium text-gray-600">
                    +234
                  </span>
                  <input
                    {...register("phone")}
                    className="flex-1 rounded-r-xl border border-gray-300 px-4 py-3.5 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="000 000 0000"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-2 text-xs text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  {...register("address2")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3.5 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  placeholder="Enter full address"
                />
                {errors.address2 && (
                  <p className="mt-2 text-xs text-red-600">{errors.address2.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center pt-8 lg:justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-10 py-4 text-lg font-medium text-white shadow-lg transition-all duration-200 hover:bg-red-700 hover:shadow-xl disabled:bg-red-400 lg:w-auto"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {showSuccess && (
        <>
          <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="animate-in fade-in zoom-in w-full max-w-md rounded-2xl bg-white p-10 shadow-2xl duration-300">
              <div className="space-y-6 text-center">
                <div className="relative mx-auto h-20 w-20">
                  <div className="absolute inset-0 animate-ping">
                    <CheckCircle className="h-20 w-20 text-green-500 opacity-70" />
                  </div>
                  <CheckCircle className="relative h-20 w-20 text-green-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Saved Successfully!
                  </h3>
                  <p className="mt-3 text-gray-600">
                    Your school information has been updated.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
