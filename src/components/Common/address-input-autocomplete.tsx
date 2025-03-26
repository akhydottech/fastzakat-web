import { useState, useCallback } from "react"
import { Box, Input, InputProps } from "@chakra-ui/react"
import { useBounce } from "@/hooks/useBounce"
import { AddressService } from "@/client"

interface AddressSuggestion {
  label: string
  value: string
}

interface InputAutocompleteProps extends Omit<InputProps, "onChange" | "onSelect"> {
  value: string
  onChange: (value: string) => void
  onSelect?: (suggestion: AddressSuggestion) => void
  placeholder?: string
}

const AddressInputAutocomplete = ({
  value,
  onChange,
  onSelect,
  placeholder = "Address",
  ...props
}: InputAutocompleteProps) => {
  const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const fetchAddressSuggestions = useCallback(async (query: string) => {
    if (!query || query.length < 3) {
      setAddressSuggestions([])
      return
    }
    try {
      const response = await AddressService.getAddress({ query })
      const suggestions = response.features.map((feature: any) => ({
        label: feature.properties.label,
        value: feature.properties.label,
      }))
      setAddressSuggestions(suggestions)
    } catch (error) {
      console.error("Error fetching address suggestions:", error)
      setAddressSuggestions([])
    }
  }, [])

  useBounce(() => {
    fetchAddressSuggestions(value)
  }, 300, [value, fetchAddressSuggestions])

  const handleAddressSelect = (suggestion: AddressSuggestion) => {
    onChange(suggestion.value)
    onSelect?.(suggestion)
    setShowSuggestions(false)
  }

  return (
    <Box position="relative" width="100%">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type="text"
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        autoComplete="off"
        {...props}
      />
      {showSuggestions && addressSuggestions.length > 0 && (
        <Box
          position="absolute"
          top="100%"
          left="0"
          right="0"
          bg="white"
          boxShadow="md"
          borderRadius="md"
          maxH="200px"
          overflowY="auto"
          zIndex={1000}
        >
          {addressSuggestions.map((suggestion, index) => (
            <Box
              key={index}
              p={2}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              onClick={() => handleAddressSelect(suggestion)}
            >
              {suggestion.label}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default AddressInputAutocomplete
