import { cn } from "@/lib/utils";

export const Dune = ({ className }: { className?: string }) => {
  return (
    <svg
      // aria-hidden="true"
      width="100%"
      height="100%"
      viewBox="0 0 300 300"
      // fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(`${className}`)}
    >
      <path d="M150 300C232.843 300 300 232.843 300 150C300 67.1575 232.843 0.000244141 150 0.000244141C67.1573 0.000244141 0 67.1575 0 150C0 232.843 67.1573 300 150 300Z" fill="#F06040" />
      <path d="M26 234.405C26 234.405 125.092 201.946 299.739 145C299.739 145 309.305 238.257 212.626 286.901C212.626 286.901 164.951 309.75 112.648 295.093C112.648 295.093 60.5661 285.262 26 234.405Z" fill="#2B286C" />
    </svg>
  );
};