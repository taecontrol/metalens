import { MetadataObject } from "../interfaces/metadata";

interface OpenGraphMetaProps {
  props?: MetadataObject;
}

export default function OpenGraphMeta({ props }: OpenGraphMetaProps) {
  return (
    <div className="w-full h-full flex flex-col">
      <h3 className="text-blue-700 text-lg">
        {props?.metadata.title}
      </h3>
      <p className="text-green-600 text-sm">{props?.metadata.url}</p>
      <p className="line-clamp-2 text-slate-600 text-[13px]">
        {props?.metadata.description}
      </p>
    </div>
  );
}
