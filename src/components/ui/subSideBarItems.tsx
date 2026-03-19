'use client'
import Link from "next/link";

interface subSideBarItemProps {
  labelSub: string;
  subHref: string;
  active?: boolean;
  isOpen?: boolean;
}
const SubSideBarItems = ({ labelSub, subHref, active, }: subSideBarItemProps) => {
  return (
    <Link href={subHref} onClick={(e) => { e.stopPropagation(); }}>
      <div className={`${active ? "text-[#01D2B3]" : "text-[#655E5E]"}`}>{labelSub}</div>
    </Link>
  );
};

export { SubSideBarItems };
