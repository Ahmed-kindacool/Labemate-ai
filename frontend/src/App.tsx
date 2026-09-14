import { FileUp, Sparkles, Download } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: FileUp,
    title: "1. Student details & lab upload",
    description:
      "Fill in your student and course info, then upload your lab as PDF, DOC, or DOCX.",
  },
  {
    icon: Sparkles,
    title: "2. AI generates your solution",
    description:
      "AI reads the lab, identifies the tasks, and writes explanations and code where needed.",
  },
  {
    icon: Download,
    title: "3. Download your report",
    description:
      "Code is executed for real output, then everything is placed into your university's report template.",
  },
];

function App() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-10">
        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="border-muted-foreground/10">
              <CardHeader className="gap-2">
                <Icon className="size-5 text-muted-foreground" aria-hidden="true" />
                <CardTitle className="text-base">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Generate a report</CardTitle>
            <CardDescription>
              The student form, university selector, and lab upload land here
              in Phase 1. This screen confirms the app boots and the shared
              layout, theme, and components are in place.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button disabled>Generate Lab Report</Button>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        Air University · Bahria University · NUST
      </footer>
    </div>
  );
}

export default App;
