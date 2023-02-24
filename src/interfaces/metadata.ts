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

export type MetadataObject = {
  metadata: MetadataProps;
  tags: Tags[];
}

export interface Metadata {
  twitter?: MetadataObject;
  openGraph?: MetadataObject;
  general?: MetadataObject;
  url?: string;
}
