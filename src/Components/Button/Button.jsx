import React from 'react'

export default function Button({
    clildren,
    className = '',
    type = "button",
    bgcolor = "bg-blue-600",
    textcolor = "text-white",
    ...props
}) {
    return <button type={type} className={`px-4 py-2 rounded-lg ${bgcolor} ${textcolor} ${className}`} {...props}>{clildren}</button>;
}
