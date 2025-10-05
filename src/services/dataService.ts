import Papa from 'papaparse';
import { Project, Category, Testimonial, Service } from '../types';

const GITHUB_RAW_BASE_URL = 'https://raw.githubusercontent.com';

export class DataService {
  private repoOwner: string;
  private repoName: string;
  private branch: string;

  constructor(repoOwner: string, repoName: string, branch: string = 'main') {
    this.repoOwner = repoOwner;
    this.repoName = repoName;
    this.branch = branch;
  }

  private getFileUrl(filePath: string): string {
    return `${GITHUB_RAW_BASE_URL}/${this.repoOwner}/${this.repoName}/${this.branch}/${filePath}`;
  }

  private async fetchCSV<T>(filePath: string): Promise<T[]> {
    try {
      const url = this.getFileUrl(filePath);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
      const csvText = await response.text();
      return new Promise((resolve, reject) => {
        Papa.parse<T>(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => resolve(results.data as T[]),
          error: (error: unknown) => reject(error),
        });
      });
    } catch (error) {
      console.error(`Error fetching CSV from ${filePath}:`, error);
      return [];
    }
  }

  private async fetchJSON<T>(filePath: string): Promise<T[]> {
    try {
      const url = this.getFileUrl(filePath);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
      return response.json() as Promise<T[]>;
    } catch (error) {
      console.error(`Error fetching JSON from ${filePath}:`, error);
      return [];
    }
  }

  // CSV methods
  async getProjects(): Promise<Project[]> {
    return this.fetchCSV<Project>('projects.csv');
  }
  async getCategories(): Promise<Category[]> {
    return this.fetchCSV<Category>('categories.csv');
  }
  async getTestimonials(): Promise<Testimonial[]> {
    return this.fetchCSV<Testimonial>('testimonials.csv');
  }
  async getServices(): Promise<Service[]> {
    return this.fetchCSV<Service>('services.csv');
  }

  // JSON method for stats
  async getStats(): Promise<{ label: string; value: number }[]> {
    return this.fetchJSON<{ label: string; value: number }>('stats.json');
  }
}

export const createDataService = (repoOwner: string, repoName: string, branch?: string) => {
  return new DataService(repoOwner, repoName, branch);
};
