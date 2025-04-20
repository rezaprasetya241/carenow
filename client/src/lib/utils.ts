import { Option } from "@/components/ui/MultipleSelector";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function converetOptionMultiple(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[],
  key: string,
  value: string
): Option[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options = data?.map((item: any) => {
    return {
      value: item[key],
      label: item[value],
    };
  });
  return options;
}
