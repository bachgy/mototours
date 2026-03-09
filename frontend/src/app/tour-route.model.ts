export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface TourRoute {
  id?: string;
  name: string;
  startLocation: string;
  endLocation: string;
  distanceKm: number;
  durationMinutes: number;
  difficulty: Difficulty;
  notes?: string;
  createdAt?: string;
}