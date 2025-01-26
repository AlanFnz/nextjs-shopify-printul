export type Poster = {
  id: number;
  printfulId: number;
  order: number;
  title: string;
  description?: string;
  src: string;
  printUrl?: string;
  instagramUrl?: string;
  visible: boolean;
  printable: boolean;
  downloadable: boolean;
  dateCreated: number;
  lastUpdate: number;
};

export interface PosterImage {
  src: string;
  alt: string;
}

export interface PosterOnGrid {
  id: string;
  title: string;
  images: PosterImage[];
}

export interface PosterGridProps {
  posters: Poster[];
}
