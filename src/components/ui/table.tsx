export function Table({ className, children, ...props }: any) {
  return (
    <div className="w-full overflow-auto">
      <table className={`w-full text-sm ${className}`} {...props}>
        {children}
      </table>
    </div>
  )
}

export function TableHeader({ className, children, ...props }: any) {
  return (
    <thead className={`bg-gray-50 ${className}`} {...props}>
      {children}
    </thead>
  )
}

export function TableBody({ className, children, ...props }: any) {
  return (
    <tbody className={`divide-y ${className}`} {...props}>
      {children}
    </tbody>
  )
}

export function TableRow({ className, children, ...props }: any) {
  return (
    <tr className={`${className}`} {...props}>
      {children}
    </tr>
  )
}

export function TableHead({ className, children, ...props }: any) {
  return (
    <th className={`px-4 py-2 text-left font-medium text-gray-500 ${className}`} {...props}>
      {children}
    </th>
  )
}

export function TableCell({ className, children, ...props }: any) {
  return (
    <td className={`px-4 py-2 ${className}`} {...props}>
      {children}
    </td>
  )
} 