export type Room = {
  id: number;
  players: Player[];
  language: Language;
};

export type Player = {
  name: string;
};

export type Language = "fr" | "en";
