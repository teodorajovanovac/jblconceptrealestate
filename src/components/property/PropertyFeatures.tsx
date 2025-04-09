// import { useCmsData } from "../../services/CmsProvider"

interface PropertyFeaturesProps {
  title: string
  features: Record<string, string | number | boolean | string[]>
}

export default function PropertyFeatures({ title, features }: PropertyFeaturesProps) {
//  const { t } = useCmsData();

  // Helper funkcija za razdvajanje stringa u niz i uklanjanje praznih prostora
  // const splitFeatures = (value: string) => {
  //   return value.split(',').map(item => item.trim()).filter(item => item);
  // };

  // Helper funkcija za formatiranje prikaza vrednosti
  const formatFeatureValue = (key: string, value: string | number | boolean | string[]) => {
    if (Array.isArray(value)) {
      if (value[1] !== "") {      
        const splitParts = value[0].toString().split(value[1]);
        return (
          <div className="flex flex-wrap gap-2">
            {splitParts.map((part, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {part}
              </span>
            ))}
          </div>
        );
      } else {
        return value[0] === "true" ? "Da" : value[0] === "false" ? "Ne" : value[0];
      }
  } else {
     // console.log("Not an array:"+key, value);
  }


    // if (key === t("property-type")) {
    //   const typeParts = value.toString().split(' + ');
    //   return (
    //     <div className="flex flex-wrap gap-2">
    //       {typeParts.map((type, index) => (
    //         <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
    //           {type}
    //         </span>
    //       ))}
    //     </div>
    //   );
    // } else if (key === t("property-additional-rooms") || key === t("property-characteristics") || key === t("property-floor")) {
    //   const items = splitFeatures(value.toString());
    //   return (
    //     <div className="flex flex-wrap gap-2">
    //       {items.map((item, index) => (
    //         <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
    //           {item}
    //         </span>
    //       ))}
    //     </div>
    //   );
    // }
    
    // return (
    //   <div className="font-medium break-words">
    //     {typeof value === "boolean" ? (value ? "Da" : "Ne") : value.toString()}
    //   </div>
    // );
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="border-t border-gray-200">
        {Object.entries(features).map(([key, value]) => (
          <div key={key} className="flex py-3 border-b border-gray-200">
            <div className="w-2/5 text-gray-600">
              {key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())
                .replace(/([A-Z])\s/g, (str) => str.trim() + " ")}
            </div>
            <div className="w-3/5">
              {formatFeatureValue(key, value)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

