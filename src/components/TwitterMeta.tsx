import { MetadataObject } from "../interfaces/metadata";

interface TwitterMetaProps {
  props: MetadataObject;
}

export default function TwitterMeta({ props }: TwitterMetaProps) {
  return (
    <div className='w-full h-full flex flex-col'>
      <img className='h-full w-full rounded-t-md' src={props.metadata.image} />
      <div className='w-full py-2 pl-1 rounded-b-md border border-sky-800'>
        <span className='font-bold text-slate-900 mb-1 text-sm'>{props.metadata.title}</span>
        <span className='line-clamp-2 text-slate-700 mb-1 text-sm'>{props.metadata.description}</span>
        <span className='text-slate-500 text-sm'>{props.metadata.url.replace(/^https?:\/\//, '')}</span>
      </div>
    </div>
  );
}
