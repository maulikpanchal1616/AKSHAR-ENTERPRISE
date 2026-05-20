import { LucideIcon } from 'lucide-react';

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  status?: string;
}

export interface StatItem {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export interface Industry {
  name: string;
  icon: LucideIcon;
  desc: string;
  color: string;
}

export interface ProductSpec {
  [key: string]: string | boolean;
}

export interface Product {
  name: string;
  specs: ProductSpec;
  features: string[];
  color: string;
}
