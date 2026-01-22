import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get section-specific primary color class based on the pathname
 * Used for CTAs and primary actions in different sections
 */
export function getSectionPrimaryColor(pathname: string): string {
  if (pathname.includes('/blog')) return 'bg-primary-blog hover:bg-primary-blog/90';
  if (pathname.includes('/creation')) return 'bg-primary-creation hover:bg-primary-creation/90';
  if (pathname.includes('/formation') || pathname.includes('/academy')) {
    return 'bg-primary-formation hover:bg-primary-formation/90';
  }
  return 'bg-primary-orbitvu hover:bg-primary-orbitvu/90'; // Violet par défaut
}

/**
 * Get section-specific text color class for CTAs
 */
export function getSectionTextColor(pathname: string): string {
  // Blog uses dark text on Lime background
  if (pathname.includes('/blog')) return 'text-neutral-dark';
  // Other sections use white text
  return 'text-white';
}
