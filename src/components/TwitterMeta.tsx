import { metadata } from "../interfaces/metadata";

interface TwitterMetaProps {
  metadata: metadata;
}

export default function TwitterMeta({ metadata }: TwitterMetaProps) {
  return (
    <div className='w-full h-full flex flex-col'>
      <img className='h-full w-full rounded-t-md' src="https://moonguard.dev/build/assets/preview.64501091.jpg" />
      <p>{metadata.twitterMetadata.title}</p>
    </div>
  );
}
