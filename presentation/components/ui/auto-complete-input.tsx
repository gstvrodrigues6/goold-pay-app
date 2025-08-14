import { citiesMock, City } from '@/presentation/mock/cities';
import { FormError } from '@/shared/types/form';
import { removeAccents } from '@/shared/utils/format';
import { forwardRef, useState } from 'react';
import { Control, Controller, FieldValues, RegisterOptions } from 'react-hook-form';
import { Keyboard, ScrollView, Text, TextInput, TextInputProps, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

interface AutocompleteInputProps<T extends FieldValues> extends Omit<TextInputProps, 'onChangeText'> {
  label: string;
  label2?: string;
  name: keyof T & string;
  control: Control<T>;
  rules?: RegisterOptions<T>;
  error?: FormError;
  disabled?: boolean;
}

export const AutocompleteInput = forwardRef<TextInput, AutocompleteInputProps<any>>(({
  label,
  label2,
  name,
  control,
  rules,
  error,
  disabled,
  ...rest
}, ref) => {
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (text: string, onChange: (value: string) => void) => {
    onChange(text);
    if (text.length > 2) {
      const allCities = Object.values(citiesMock);
      const cleanedText = removeAccents(text.toLowerCase());
      
      const filtered = allCities.filter(city => {
        const cleanedCityName = removeAccents(city.cidade.toLowerCase());
        return cleanedCityName.startsWith(cleanedText);
      }).slice(0, 4);

      setFilteredCities(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectCity = (city: City, onChange: (value: string) => void) => {
    onChange(`${city.cidade} - ${city.uf}`);
    setShowSuggestions(false);
  };

  return (
      <View className='pb-5'>
        {(label || label2) && (
          <View className='flex-row items-center pb-1'>
            {label && <Text className="font-medium text-base">{label}</Text>}
            {label2 && <Text className="font-normal text-sm"> {label2}</Text>}
          </View>
        )}
        <Controller
          name={name}
          control={control}
          rules={{ ...rules, validate: validateCityExists }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <TextInput
                  {...rest}
                  ref={ref}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={(text) => handleSearch(text, onChange)}
                  editable={!disabled}
                  placeholderTextColor={'#A0A0A0'}
                  style={{ borderColor: error ? '#ef4444' : '#D7D7D7' }}
                  className='disabled:bg-[#f0f0f0] disabled:text-[#888] min-h-14 focus:border-primary border rounded-[10px] p-3 text-base font-normal'
                />
              </TouchableWithoutFeedback>
              {showSuggestions && filteredCities.length > 0 && (
                <View className="absolute top-[80px] w-full bg-white border border-gray-300 rounded-md shadow-md z-10">
                  <ScrollView 
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={true}
                    keyboardShouldPersistTaps="handled"
                  >
                    {filteredCities.map((item) => (
                      <TouchableOpacity
                        key={`${item.cidade}-${item.uf}`}
                        onPress={() => handleSelectCity(item, onChange)}
                        className="p-3 border-b border-gray-200"
                      >
                        <Text>{`${item.cidade} - ${item.uf}`}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </>
          )}
        />
        {error?.message && typeof error.message === 'string' && <Text className='text-xs text-red-500 font-normal'>{error?.message}</Text>}
      </View>
  );
});

AutocompleteInput.displayName = 'AutocompleteInput';

const validateCityExists = (value: string) => {
  if (!value) return 'A cidade é obrigatória.';

  const [cityName, cityUf] = value.split(' - ');
  
  if (!cityName || !cityUf) {
    return 'Por favor, selecione uma cidade válida da lista.';
  }

  const cityExists = Object.values(citiesMock).some(city => 
    removeAccents(city.cidade.toLowerCase()) === removeAccents(cityName.toLowerCase()) && 
    city.uf.toLowerCase() === cityUf.toLowerCase()
  );

  return cityExists || 'Por favor, selecione uma cidade válida da lista.';
};