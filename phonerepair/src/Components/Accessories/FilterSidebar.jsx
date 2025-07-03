import React from 'react';
import './FilterSidebar.css';

const FilterSidebar = ({
  selectedCategories,
  setSelectedCategories,
  selectedColors,
  setSelectedColors,
  selectedPrices,
  setSelectedPrices,
  selectedBrands,
  setSelectedBrands
}) => {
  const toggle = (list, value, setFunc) => {
    if (list.includes(value)) {
      setFunc(list.filter((item) => item !== value));
    } else {
      setFunc([...list, value]);
    }
  };

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedPrices([]);
    setSelectedBrands([]);
  };

  return (
    <div className="filter-sidebar">
      <h3>Filters</h3>
      <button className="clear-filter" onClick={clearAll}>Clear Filter</button>

      <div className="filter-section">
        <h4>Category</h4>
        {['Earphones', 'Chargers', 'Headphones', 'Power Banks', 'Smart Watches'].map((cat) => (
          <label key={cat}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() => toggle(selectedCategories, cat, setSelectedCategories)}
            />
            {cat}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Brand</h4>
        {['Apple', 'Samsung', 'Sony', 'boAt', 'Noise', 'JBL', 'Boult', 'Zebronics'].map((brand) => (
          <label key={brand}>
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => toggle(selectedBrands, brand, setSelectedBrands)}
            />
            {brand}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Price</h4>
        {['0-1000', '1001-3000', '3001-6000', '6001-9000', '10000-15000', '15000 and above'].map((range) => (
          <label key={range}>
            <input
              type="checkbox"
              checked={selectedPrices.includes(range)}
              onChange={() => toggle(selectedPrices, range, setSelectedPrices)}
            />
            ₹{range}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Color</h4>
        {['Black', 'White', 'Blue', 'Green', 'Orange'].map((color) => (
          <label key={color}>
            <input
              type="checkbox"
              checked={selectedColors.includes(color)}
              onChange={() => toggle(selectedColors, color, setSelectedColors)}
            />
            {color}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
