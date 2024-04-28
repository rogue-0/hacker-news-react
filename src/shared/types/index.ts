export type Story = {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: "comment" | "story";
  url?: string;
};

export type Comment = {
  deleted?: boolean;
  by: string;
  id: number;
  kids?: number[];
  parent: number;
  text: string;
  time: number;
  type: "comment" | "story";
};
