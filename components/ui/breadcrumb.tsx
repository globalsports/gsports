"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const Breadcrumb = () => {
  const pathname = usePathname(); // Get the current route
  const segments = pathname.split("/").filter((segment) => segment); // Split path into segments

  const generateLabel = (segment: string) => {
    // Optionally transform the segment into a readable label
    return segment
      .replace(/-/g, " ") // Replace dashes with spaces
      .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize first letter
  };

  return (
    <nav className="text-sm text-gray-600 ">
      <ul className="flex items-center space-x-2">
        {/* Home link */}
        <li>
          <Link href="/" className="hover:text-gray-800">
            Home
          </Link>
        </li>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = "/" + segments.slice(0, index + 1).join("/");

          return (
            <li key={index} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
              {isLast ? (
                <span className="font-bold text-black">
                  {generateLabel(segment)}
                </span>
              ) : (
                <Link href={href} className="hover:text-gray-800">
                  {generateLabel(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
