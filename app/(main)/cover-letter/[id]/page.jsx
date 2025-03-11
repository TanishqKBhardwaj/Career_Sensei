import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { getCoverLetter } from "../../../../actions/cover_letter";
import CoverLetterPreview from "../components/CoverLetterPreview";

export default async function EditCoverLetterPage({ params }) {
  const { id } = await params;
  const coverLetter = await getCoverLetter(id);

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-2">
        <Link href="/cover-letter" legacyBehavior>
          <Button  className=" text-white hover:bg-violet-500 gap-2 pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Cover Letters
          </Button>
        </Link>

        <h1 className="text-6xl font-bold gradient-title mb-6">
          {coverLetter?.jobTitle} at <span className="text-purple-500">{coverLetter?.companyName}</span>
        </h1>
      </div>

      <CoverLetterPreview content={coverLetter?.content} />
    </div>
  );
}