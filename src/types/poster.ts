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
