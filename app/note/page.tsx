"use client";

import dynamic from "next/dynamic";

const NotesPage = dynamic(() => import("./NotesPage"), { ssr: false });

export default function Page() {
  return <NotesPage />;
}
