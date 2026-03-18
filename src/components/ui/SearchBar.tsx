import React from 'react'
import { Input } from './Input'


interface SearchBarProps {
  placeholder?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'default' | 'miniDefault' | 'custom';
}

const SearchBar = ({ placeholder, className, variant = "primary" }: SearchBarProps) => {
  return (
    <Input placeholder={placeholder || "Search..."} variant={variant} className={className} />
  )
}

export {SearchBar}