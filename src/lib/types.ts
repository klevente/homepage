export type Empty = Record<string, never>;

export type Metadata = {
  title: string;
  date: string;
};

export type MetadataWithSize = Metadata & {
  size: number;
};
