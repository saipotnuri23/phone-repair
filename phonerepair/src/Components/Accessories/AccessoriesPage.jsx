import React, { useState, useEffect } from 'react';
import FilterSidebar from './FilterSidebar';
import AccessoryCard from './AccessoryCard';
import Pagination from './Pagination';
import './AccessoriesPage.css';

import { accessoriesData } from './SampleData';

const AccessoriesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const itemsPerPage = 9;

  // Apply filters
  const filterData = accessoriesData.filter((item) => {
    const matchCategory = selectedCategories.length
      ? selectedCategories.includes(item.category)
      : true;

    const matchColor = selectedColors.length
      ? selectedColors.includes(item.color)
      : true;

    const matchPrice = selectedPrices.length
      ? selectedPrices.some((range) => {
          if (range === '15000 and above') return item.price >= 15000;
          const [min, max] = range.split('-').map(Number);
          return item.price >= min && item.price <= max;
        })
      : true;

    const matchBrand = selectedBrands.length
      ? selectedBrands.includes(item.brand)
      : true;

    return matchCategory && matchColor && matchPrice && matchBrand;
  });

  // Reset to page 1 on any filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedColors, selectedPrices, selectedBrands]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filterData.slice(indexOfFirst, indexOfLast);

  return (
    <div className="accessories-container">
      <FilterSidebar
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedColors={selectedColors}
        setSelectedColors={setSelectedColors}
        selectedPrices={selectedPrices}
        setSelectedPrices={setSelectedPrices}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
      />

      <div className="accessories-main">
        <div className="accessories-header">
          <h2>Results ({filterData.length})</h2>
          <select className="sort-select">
            <option>Sort by Position</option>
            <option>Price Low to High</option>
            <option>Price High to Low</option>
          </select>
        </div>

        {filterData.length === 0 ? (
          <p className="no-results">No products found.</p>
        ) : (
          <>
            <div className="accessories-grid">
              {currentItems.map((item, idx) => (
                <AccessoryCard key={idx} data={item} />
              ))}
            </div>

            <Pagination
              totalItems={filterData.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AccessoriesPage;
