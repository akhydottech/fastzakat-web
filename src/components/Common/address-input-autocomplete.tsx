import { useState, useCallback } from "react"
import { Box, Input, InputProps } from "@chakra-ui/react"
import { useBounce } from "@/hooks/useBounce"
import { AddressService } from "@/client"
import { useTranslation } from "react-i18next"
import { useColorModeValue } from "@/components/ui/color-mode"

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
  const { t } = useTranslation()
  const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  
  const bgColor = useColorModeValue("white", "gray.700")
  const hoverBgColor = useColorModeValue("gray.100", "gray.600")

  const fetchAddressSuggestions = useCallback(async (query: string) => {
    if (!query || query.length < 3) {
      setAddressSuggestions([])
      return
    }
    try {
      const response = await AddressService.searchAddress({ query })
      const suggestions = response.features?.map((feature: any) => ({
        label: feature.properties.label,
        value: feature.properties.label,
      }))
      setAddressSuggestions(suggestions || [])
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
        placeholder={t(placeholder)}
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
          bg={bgColor}
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
              _hover={{ bg: hoverBgColor }}
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
