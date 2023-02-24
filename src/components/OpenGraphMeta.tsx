import { MetadataObject } from "../interfaces/metadata";

interface OpenGraphMetaProps {
  props: MetadataObject;
}

export default function OpenGraphMeta({ props }: OpenGraphMetaProps) {
  return (
    <div className='w-full h-full flex flex-col'>
      <img className='h-full w-full' src={props.metadata.image} />
      <div className='w-full py-2 pl-1 border border-sky-800'>
        <p className='text-slate-500 text-xs uppercase'>{props.metadata.url.replace(/^https?:\/\//, '')}</p>
        <span className='font-bold text-slate-900 mb-1 text-base'>{props.metadata.title}</span>
        <span className='line-clamp-1 text-slate-700 mb-1 text-sm'>{props.metadata.description}</span>
      </div>
    </div>
  );
}
