export type Tags = {
  title: string;
  property: string;
  content: string;
  spec: string;
};

export type MetadataProps = {
  title: string;
  description: string;
  image: string;
  url: string;
};

export interface Metadata {
  twitter?: {
    metadata: MetadataProps;
    tags: Tags[];
  };
  openGraph?: {
    metadata: MetadataProps;
    tags: Tags[];
  };
  url?: string;
}
