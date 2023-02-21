export type tags = {
  title: string;
  property: string;
  content: string;
  spec: string;
};

export type metadataProps = {
  title: string;
  description: string;
  spec: string;
  image: string;
  url: string;
};

export interface metadata {
  twitter?: {
    metadata: metadataProps;
    tags: tags[];
  };
  openGraph?: {
    metadata: metadataProps;
    tags: tags[];
  };
}
