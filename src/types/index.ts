import { LucideIcon } from 'lucide-react';
export interface Project {
  id: string;
  title: string;
  category_id: string;
  imageUrl: string;
  description?: string;
  completionDate?: string; // new field
}


export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  company?: string;
  feedback: string;
  rating: number;
  date?: string;
}


export interface Service {
  title: string;
  description: string;
  icon: LucideIcon; // more precise typing
}
