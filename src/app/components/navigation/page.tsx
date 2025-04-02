import Link from "next/link";
import { EntityLinkProps } from "./type";

export default function EntityLink({ url, type, label }: EntityLinkProps) {
  if (!url) return null;
  const id = url.split("/").filter(Boolean).pop();
  return <Link href={`/${type}/${id}`}>{label}</Link>;
};
