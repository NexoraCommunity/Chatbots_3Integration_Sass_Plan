import React from 'react'
import { Input } from './Input'

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'default' | 'miniDefault' | 'custom';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ placeholder, className, variant = "primary", value, onChange }: SearchBarProps) => {
  return (
    <Input 
      placeholder={placeholder || "Search..."} 
      variant={variant} 
      className={className} 
      value={value}
      onChange={onChange}
    />
  )
}

export {SearchBar}