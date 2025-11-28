"use client"

import React, { ReactNode } from "react"

import BackButton from "./back-button"
import ResourceContactForm from "./resource-contact"

type BlogArticleProps = {
  title: string
  date: string
  children: ReactNode
}

export default function BlogArticle({ title, date, children }: BlogArticleProps) {
  return (
    <>
      <BackButton />
      <article className="mx-auto max-w-[1200px] px-5 py-10">
        {/* Title */}
        <h1 className="mb-2 text-2xl font-bold lg:text-4xl">{title}</h1>

        {/* Date */}
        <p className="mb-8 text-sm text-gray-500">{date}</p>

        {/* Actual Article Content */}
        <div className="prose prose-lg mb-16 leading-relaxed">{children}</div>

        {/* Call to Action */}
        <div className="mt-10 max-w-3xl pt-8">
          <ResourceContactForm />
        </div>
      </article>
    </>
  )
}
