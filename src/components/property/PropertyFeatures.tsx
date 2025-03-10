interface PropertyFeaturesProps {
  title: string
  features: Record<string, string | number | boolean>
}

export default function PropertyFeatures({ title, features }: PropertyFeaturesProps) {
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
            <div className="w-3/5 font-medium break-words">
              {typeof value === "boolean" ? (value ? "Yes" : "No") : value.toString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

