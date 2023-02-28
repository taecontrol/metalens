export type MetadataProps = {
  title: string;
  description: string;
  image: string;
  url: string;
};

export type MetadataObject = {
  metadata: MetadataProps;
  tags: HTMLMetaElement[] | HTMLElement[];
}

export interface Metadata {
  twitter: MetadataObject;
  og: MetadataObject;
  general: MetadataObject;
  url: string;
}
