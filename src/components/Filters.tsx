import React from "react";
import { FiCalendar, FiDollarSign, FiFilter } from "react-icons/fi";

import { Button, IOption, Select, countries, dates, prices } from "mosaic";

export const Filters = () => {
  const [selectedCountry, setSelectedCountry] = React.useState<IOption>(
    countries[0]
  );
  const [selectedDate, setSelectedDate] = React.useState<IOption>();
  const [selectedPrice, setSelectedPrice] = React.useState<IOption>();

  const handleSelectCountry = (countryValue: string) => {
    const country = countries.find((p) => p.value === countryValue) as IOption;
    setSelectedCountry(country);
  };

  const handleSelectDate = (dateValue: string) => {
    const date = dates.find((p) => p.value === dateValue) as IOption;
    setSelectedDate(date);
  };

  const handleSelectPrice = (priceValue: string) => {
    const price = prices.find((p) => p.value === priceValue) as IOption;
    setSelectedPrice(price);
  };

  const resetFilters = () => {
    setSelectedCountry(countries[0]);
    setSelectedDate(undefined);
    setSelectedPrice(undefined);
  };

  return (
    <div className='flex flex-col-reverse items-start justify-between mt-3 mb-4 lg:items-center lg:flex-row'>
      <div className='w-full space-y-3 sm:space-x-3 lg:mr-7'>
        <Select
          options={countries}
          selectedOption={selectedCountry}
          setSelectedOption={handleSelectCountry}
          placeholder='Select a country'
          width='w-full lg:w-50'
        />

        <Select
          options={dates}
          LeadingIcon={<FiCalendar />}
          selectedOption={selectedDate}
          setSelectedOption={handleSelectDate}
          placeholder='Select a date'
          width='w-full lg:w-50'
        />

        <Select
          options={prices}
          LeadingIcon={<FiDollarSign />}
          selectedOption={selectedPrice}
          setSelectedOption={handleSelectPrice}
          placeholder='Select a price'
          width='w-full lg:w-50'
        />
      </div>
      <Button
        size='lg'
        LeadingIcon={<FiFilter className='text-gray-900 dark:text-white' />}
        variant='secondaryGray'
        className='mt-2.5 mb-4 lg:m-0'
        onClick={() => resetFilters()}
      >
        Reset Filters
      </Button>
    </div>
  );
};
