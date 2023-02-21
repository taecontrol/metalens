type metadataTagsProps = {
  title: string;
  property: string;
  content: string;
  spec: string;
};

type metadataProps = {
  title: string;
  description: string;
  spec: string;
  image: string;
  url: string;
}

export interface metadata {
  twitterTags: metadataTagsProps[];
  twitterMetadata: metadataProps;
}