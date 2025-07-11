import React, { useState,useRef, useEffect } from 'react';
import './PhoneModels.css';
import { useNavigate } from 'react-router-dom';
import iphone3 from '../../assets/iphone3.png';
import ipad3 from '../../assets/ipad3.png';
import android3 from '../../assets/android3.png';
import laptop1 from '../../assets/laptop1.png';
import { useLocation, useNavigationType } from 'react-router-dom';





const devices = [
  { name: 'iPhone', Image: iphone3 },
  { name: 'iPad', Image: ipad3 },
  { name: 'Android', Image: android3 },
  { name: 'Laptop', Image: laptop1 }
];


const brands = {
  iPhone: ['Apple'],
  iPad: ['APPLE', 'Microsoft', 'Amazon', 'Lenovo', 'Huawei'],
  Android: ['ONEPLUS', 'POCO', 'Vivo', 'Samsung', 'Xiaomi', 'OPPO', 'Motorola', 'Infinix', 'Realme'],
  Laptop: ['APPLE', 'HP', 'DELL', 'ASUS', 'LENOVO', 'ACER']
};


const models = {
  Apple: [
    'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
  'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14',
  'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13 Mini', 'iPhone 13',
  'iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12 Mini', 'iPhone 12',
  'iPhone 11 Pro Max', 'iPhone 11 Pro', 'iPhone 11',
  'iPhone XS Max', 'iPhone XS', 'iPhone XR', 'iPhone X',
  'iPhone 8 Plus', 'iPhone 8',
  'iPhone 7 Plus', 'iPhone 7',
  'iPhone 6s Plus', 'iPhone 6s', 'iPhone 6 Plus', 'iPhone 6',
  'iPhone SE (3rd Gen)', 'iPhone SE (2nd Gen)', 'iPhone SE (1st Gen)'
  ],
  ONEPLUS: [
    'OnePlus Open', 'OnePlus 12', 'OnePlus 12R', 'OnePlus 11', 'OnePlus 11R',
  'OnePlus 10 Pro', 'OnePlus 10T', 'OnePlus 10R',
  'OnePlus 9 Pro', 'OnePlus 9', 'OnePlus 9R', 'OnePlus 9RT',
  'OnePlus 8 Pro', 'OnePlus 8T', 'OnePlus 8',
  'OnePlus 7 Pro', 'OnePlus 7T Pro', 'OnePlus 7T', 'OnePlus 7',
  'OnePlus 6T', 'OnePlus 6', 'OnePlus 5T', 'OnePlus 5',
  'OnePlus 3T', 'OnePlus 3', 'OnePlus X', 'OnePlus 2', 'OnePlus One',
  'OnePlus Nord CE 4', 'OnePlus Nord CE 3', 'OnePlus Nord CE 3 Lite',
  'OnePlus Nord 3', 'OnePlus Nord 2T', 'OnePlus Nord 2',
  'OnePlus Nord CE 2', 'OnePlus Nord CE', 'OnePlus Nord N300',
  'OnePlus Nord N200', 'OnePlus Nord N100', 'OnePlus Nord N10'
  ],
  POCO: ['POCO F1', 'POCO F2 Pro', 'POCO F3', 'POCO F4', 'POCO F5', 'POCO F5 Pro',
  'POCO X2', 'POCO X3', 'POCO X3 NFC', 'POCO X3 Pro', 'POCO X4 Pro 5G', 'POCO X5', 'POCO X5 Pro',
  'POCO M2', 'POCO M2 Pro', 'POCO M3', 'POCO M3 Pro', 'POCO M4', 'POCO M4 Pro', 'POCO M5', 'POCO M5s',
  'POCO C3', 'POCO C31', 'POCO C50', 'POCO C51', 'POCO C55'],

  Vivo: ['Vivo X100', 'Vivo X100 Pro', 'Vivo X90', 'Vivo X90 Pro', 'Vivo X80', 'Vivo X80 Pro',
  'Vivo V30', 'Vivo V30 Pro', 'Vivo V29', 'Vivo V29 Pro', 'Vivo V27', 'Vivo V27 Pro',
  'Vivo V25', 'Vivo V25 Pro', 'Vivo V23', 'Vivo V23 Pro', 'Vivo V21', 'Vivo V20', 'Vivo V20 SE',
  'Vivo T2', 'Vivo T2 Pro', 'Vivo T1', 'Vivo T1 Pro', 'Vivo Y200', 'Vivo Y100', 'Vivo Y73',
  'Vivo Y72', 'Vivo Y56', 'Vivo Y55', 'Vivo Y53', 'Vivo Y51', 'Vivo Y50', 'Vivo Y36',
  'Vivo Y33s', 'Vivo Y22', 'Vivo Y21', 'Vivo Y20', 'Vivo Y19', 'Vivo Y17',
  'Vivo S1', 'Vivo S1 Pro', 'Vivo Z1 Pro', 'Vivo Z1x', 'Vivo Nex', 'Vivo Nex Dual Display'],

  HP: ['HP Spectre x360 13', 'HP Spectre x360 14', 'HP Spectre x360 15', 'HP Spectre x360 16',
  'HP Spectre Foldable PC', 'HP Envy x360 13', 'HP Envy x360 15', 'HP Envy 13', 'HP Envy 14', 
  'HP Envy 16', 'HP Pavilion x360', 'HP Pavilion 14', 'HP Pavilion 15', 'HP Pavilion Gaming 15',
  'HP Pavilion Aero 13', 'HP Omen 15', 'HP Omen 16', 'HP Omen Transcend 16', 'HP Omen X',
  'HP Victus 15', 'HP Victus 16', 'HP EliteBook 840', 'HP EliteBook x360 1040', 'HP EliteBook 845', 
  'HP EliteBook 865', 'HP ProBook 450', 'HP ProBook 455', 'HP ProBook x360 435',
  'HP ZBook Firefly 14', 'HP ZBook Power G9', 'HP ZBook Fury 16','HP Chromebook x360', 
  'HP Chromebook 14', 'HP Chromebook 11a', 'HP Laptop 15s', 'HP Laptop 14s', 'HP Stream 11', 'HP Stream 14'],

  DELL: ['Dell XPS 13', 'Dell XPS 13 Plus', 'Dell XPS 15', 'Dell XPS 17',
'Dell Inspiron 14', 'Dell Inspiron 15', 'Dell Inspiron 16', 'Dell Inspiron 14 2-in-1', 'Dell Inspiron 16 2-in-1',
'Dell Latitude 3330', 'Dell Latitude 3440', 'Dell Latitude 3540', 'Dell Latitude 5430', 'Dell Latitude 5440',
'Dell Latitude 5530', 'Dell Latitude 5540', 'Dell Latitude 7430', 'Dell Latitude 7440', 'Dell Latitude 7640',
'Dell Vostro 14 3000', 'Dell Vostro 15 3000', 'Dell Vostro 14 5000', 'Dell Vostro 15 5000', 'Dell Vostro 16 5000',
'Dell Precision 3480', 'Dell Precision 3580', 'Dell Precision 3581', 'Dell Precision 5480', 'Dell Precision 5680',
'Dell Precision 7680', 'Dell Precision 7780', 'Alienware x14 R2', 'Alienware x16', 'Alienware m16 R2',
'Alienware m18', 'Alienware x17 R2', 'Dell G15 5530', 'Dell G16 7630',
'Dell Chromebook 3110', 'Dell Chromebook 3400', 'Dell Chromebook 3189'],

Samsung: ['Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24',
  'Galaxy S23 Ultra', 'Galaxy S23+', 'Galaxy S23', 'Galaxy S23 FE',
  'Galaxy S22 Ultra', 'Galaxy S22+', 'Galaxy S22', 'Galaxy S21 Ultra',
  'Galaxy S21+', 'Galaxy S21 FE', 'Galaxy S21',
  'Galaxy Z Fold5', 'Galaxy Z Flip5',
  'Galaxy Z Fold4', 'Galaxy Z Flip4',
  'Galaxy Z Fold3', 'Galaxy Z Flip3',
  'Galaxy Note 20 Ultra', 'Galaxy Note 20', 'Galaxy Note 10+', 'Galaxy Note 10',
  'Galaxy A15', 'Galaxy A25', 'Galaxy A14', 'Galaxy A24', 'Galaxy A23', 'Galaxy A13',
  'Galaxy A54', 'Galaxy A53', 'Galaxy A52', 'Galaxy A34', 'Galaxy A33', 'Galaxy A32',
  'Galaxy A73', 'Galaxy A72', 'Galaxy A71',
  'Galaxy M54', 'Galaxy M53', 'Galaxy M52', 'Galaxy M51', 'Galaxy M33', 'Galaxy M32',
  'Galaxy M14', 'Galaxy M13', 'Galaxy M04',
  'Galaxy F54', 'Galaxy F23', 'Galaxy F13', 'Galaxy F04',
  'Galaxy Xcover Pro', 'Galaxy Xcover 5', 'Galaxy Xcover 4s',
  'Galaxy J8', 'Galaxy J7 Prime', 'Galaxy J6+', 'Galaxy J5 Pro', 'Galaxy J4+',
  'Galaxy On Max', 'Galaxy On7 Pro', 'Galaxy On6', 'Galaxy On5',
  'Galaxy Core Prime', 'Galaxy Grand Neo', 'Galaxy Grand Prime',
'Galaxy C9 Pro', 'Galaxy C7 Pro', 'Galaxy C5 Pro'],

Xiaomi: [
  'Xiaomi 14 Ultra', 'Xiaomi 14 Pro', 'Xiaomi 14',
  'Xiaomi 13 Ultra', 'Xiaomi 13 Pro', 'Xiaomi 13',
  'Xiaomi 12S Ultra', 'Xiaomi 12 Pro', 'Xiaomi 12',
  'Xiaomi 11T Pro', 'Xiaomi 11T', 'Xiaomi 11i HyperCharge', 'Xiaomi 11i',
  'Xiaomi Mi 11 Ultra', 'Xiaomi Mi 11X Pro', 'Xiaomi Mi 11X', 'Xiaomi Mi 11 Lite',
  'Xiaomi Mi 10T Pro', 'Xiaomi Mi 10T', 'Xiaomi Mi 10i', 'Xiaomi Mi 10', 'Xiaomi Mi 10 Pro',
  'Xiaomi Mi 9T Pro', 'Xiaomi Mi 9T', 'Xiaomi Mi 9',
  'Xiaomi Redmi Note 13 Pro+', 'Xiaomi Redmi Note 13 Pro', 'Xiaomi Redmi Note 13',
  'Xiaomi Redmi Note 12 Pro+', 'Xiaomi Redmi Note 12 Pro', 'Xiaomi Redmi Note 12', 'Xiaomi Redmi Note 12 5G',
  'Xiaomi Redmi Note 11 Pro+', 'Xiaomi Redmi Note 11 Pro', 'Xiaomi Redmi Note 11', 'Xiaomi Redmi Note 11T 5G',
  'Xiaomi Redmi Note 10 Pro Max', 'Xiaomi Redmi Note 10 Pro', 'Xiaomi Redmi Note 10', 'Xiaomi Redmi Note 10T 5G',
  'Xiaomi Redmi Note 9 Pro Max', 'Xiaomi Redmi Note 9 Pro', 'Xiaomi Redmi Note 9', 'Xiaomi Redmi Note 9T 5G',
  'Xiaomi Redmi Note 8 Pro', 'Xiaomi Redmi Note 8', 'Xiaomi Redmi Note 7 Pro', 'Xiaomi Redmi Note 7',
  'Xiaomi Redmi K60 Ultra', 'Xiaomi Redmi K60 Pro', 'Xiaomi Redmi K60', 'Xiaomi Redmi K50 Pro', 'Xiaomi Redmi K50',
  'Xiaomi Redmi K40 Pro+', 'Xiaomi Redmi K40 Pro', 'Xiaomi Redmi K40', 'Xiaomi Redmi K30 Pro Zoom', 'Xiaomi Redmi K30 Pro',
  'Xiaomi Redmi K20 Pro', 'Xiaomi Redmi K20',
  'Xiaomi Civi 4 Pro', 'Xiaomi Civi 3', 'Xiaomi Civi 2', 'Xiaomi Civi',
  'Xiaomi Mix Fold 3', 'Xiaomi Mix Fold 2', 'Xiaomi Mix Fold', 'Xiaomi Mix 4', 'Xiaomi Mi Mix Alpha'
],

OPPO: [
  'OPPO Find X7 Ultra', 'OPPO Find X7', 'OPPO Find N3', 'OPPO Find N3 Flip',
  'OPPO Find X6 Pro', 'OPPO Find X6', 'OPPO Find X5 Pro', 'OPPO Find X5',
  'OPPO Reno11 Pro', 'OPPO Reno11', 'OPPO Reno10 Pro+', 'OPPO Reno10 Pro', 'OPPO Reno10',
  'OPPO Reno8 Pro', 'OPPO Reno8', 'OPPO Reno8 T 5G', 'OPPO Reno8 T', 'OPPO Reno7 Pro', 'OPPO Reno7',
  'OPPO Reno6 Pro+', 'OPPO Reno6 Pro', 'OPPO Reno6',
  'OPPO F25 Pro', 'OPPO F23 5G', 'OPPO F21 Pro 5G', 'OPPO F21 Pro', 'OPPO F19 Pro+', 'OPPO F19 Pro', 'OPPO F17 Pro',
  'OPPO A98 5G', 'OPPO A78 5G', 'OPPO A77s', 'OPPO A76', 'OPPO A74 5G', 'OPPO A74', 'OPPO A57', 'OPPO A54',
  'OPPO A53', 'OPPO A52', 'OPPO A31', 'OPPO A15', 'OPPO A12', 'OPPO A11K',
  'OPPO K11x', 'OPPO K11', 'OPPO K10 5G', 'OPPO K10', 'OPPO K9 Pro', 'OPPO K9s', 'OPPO K9'
],

Motorola:['Moto Edge 50 Ultra', 'Moto Edge 50 Pro', 'Moto Edge 50 Fusion',
  'Moto Edge 40 Neo', 'Moto Edge 40', 'Moto Edge 40 Pro', 'Moto Edge 30 Ultra', 'Moto Edge 30 Pro',
  'Moto Edge 30 Fusion', 'Moto Edge 30', 'Moto Edge 20 Pro', 'Moto Edge 20 Fusion', 'Moto Edge 20',
  'Moto G84', 'Moto G73', 'Moto G72', 'Moto G71 5G', 'Moto G70', 'Moto G62 5G', 'Moto G60', 'Moto G54 5G',
  'Moto G52', 'Moto G51', 'Moto G42', 'Moto G40 Fusion', 'Moto G31', 'Moto G30', 'Moto G22',
  'Moto G13', 'Moto G14', 'Moto G10 Power', 'Moto G9', 'Moto G8 Power Lite',
  'Moto E40', 'Moto E32', 'Moto E13', 'Moto E22s', 'Moto E7 Power',
  'Razr 50 Ultra', 'Razr 50', 'Razr 40 Ultra', 'Razr 40', 'Razr 2022',
  'Motorola One Fusion+', 'Motorola One Macro', 'Motorola One Vision', 'Motorola One Action',
  'Motorola Defy (2021)', 'Motorola Edge+ (2020)', 'Motorola P40', 'Motorola One Zoom'
],

Infinix:['Infinix Zero 30 5G', 'Infinix Zero 30 4G', 'Infinix Zero 5G 2023', 'Infinix Zero 5G',
  'Infinix Note 40 Pro+', 'Infinix Note 40 Pro', 'Infinix Note 40', 'Infinix Note 30 5G',
  'Infinix Note 30 Pro', 'Infinix Note 30', 'Infinix Note 12 Pro 5G', 'Infinix Note 12 VIP',
  'Infinix Note 12 Turbo', 'Infinix Note 12', 'Infinix Note 11', 'Infinix Note 11S',
  'Infinix Note 10', 'Infinix Note 10 Pro', 'Infinix Note 8', 'Infinix Note 7',
  'Infinix Hot 40i', 'Infinix Hot 40', 'Infinix Hot 30i', 'Infinix Hot 30', 'Infinix Hot 20',
  'Infinix Hot 20 Play', 'Infinix Hot 12', 'Infinix Hot 12 Pro', 'Infinix Hot 11',
  'Infinix Hot 10', 'Infinix Hot 9', 'Infinix Hot 8', 'Infinix Hot 7',
  'Infinix Smart 8 Plus', 'Infinix Smart 8', 'Infinix Smart 7 HD', 'Infinix Smart 7',
  'Infinix Smart 6', 'Infinix Smart 5', 'Infinix Smart 4'],

  Realme:['Realme GT 6', 'Realme GT 5 Pro', 'Realme GT 5', 'Realme GT 3', 'Realme GT 2 Pro', 'Realme GT 2',
  'Realme GT Neo 6', 'Realme GT Neo 5 SE', 'Realme GT Neo 5', 'Realme GT Neo 3T', 'Realme GT Neo 3',
  'Realme Narzo 70 Pro 5G', 'Realme Narzo 70 5G', 'Realme Narzo 60 Pro', 'Realme Narzo 60 5G',
  'Realme Narzo 60x', 'Realme Narzo 50', 'Realme Narzo 50A', 'Realme Narzo 50i', 'Realme Narzo 30',
  'Realme 12 Pro+', 'Realme 12 Pro', 'Realme 12+', 'Realme 12x 5G', 'Realme 11 Pro+', 'Realme 11 Pro',
  'Realme 11x 5G', 'Realme 11', 'Realme 10 Pro+', 'Realme 10 Pro', 'Realme 10',
  'Realme 9 Pro+', 'Realme 9 Pro', 'Realme 9i', 'Realme 9', 'Realme 8 Pro', 'Realme 8s 5G',
  'Realme 8i', 'Realme 8', 'Realme 7 Pro', 'Realme 7', 'Realme 7i', 'Realme 6 Pro', 'Realme 6',
  'Realme 6i', 'Realme 5 Pro', 'Realme 5', 'Realme 5i', 'Realme 3 Pro', 'Realme 3', 'Realme 2 Pro',
  'Realme C65 5G', 'Realme C53', 'Realme C55', 'Realme C51', 'Realme C33', 'Realme C35',
  'Realme C25Y', 'Realme C25', 'Realme C15', 'Realme C11', 'Realme C3', 'Realme C2'],

  APPLE:['iPad Pro 12.9-inch (6th Gen)', 'iPad Pro 11-inch (4th Gen)', 'iPad Air (5th Gen)', 'iPad (10th Gen)',
  'iPad Mini (6th Gen)', 'iPad Pro 12.9-inch (5th Gen)', 'iPad Pro 11-inch (3rd Gen)', 'iPad Air (4th Gen)',
  'iPad (9th Gen)', 'iPad Mini (5th Gen)', 'iPad (8th Gen)', 'iPad (7th Gen)', 'iPad Pro 10.5-inch',
  'iPad Pro 9.7-inch', 'iPad Air 2', 'iPad Mini 4', 'iPad (6th Gen)', 'iPad (5th Gen)'],

  Microsoft: [
  'Surface Pro 9', 'Surface Pro 8', 'Surface Pro 7', 'Surface Go 4', 'Surface Go 3',
  'Surface Book 3', 'Surface Laptop Studio', 'Surface Duo 2'],
 
  Amazon: [
  'Fire HD 10 (13th Gen)', 'Fire HD 8 (12th Gen)', 'Fire 7 (12th Gen)', 'Fire HD 10 Plus',
  'Fire HD 8 Plus', 'Fire Kids Edition'
],
Lenovo: [
  'Lenovo Tab P12 Pro', 'Lenovo Tab P11 Pro', 'Lenovo Tab M10 Plus', 'Lenovo Yoga Tab 13',
  'Lenovo Tab M8', 'Lenovo Tab M7', 'Lenovo Smart Tab M10'
],

Huawei: [
  'Huawei MatePad Pro 13.2', 'MatePad Air', 'MatePad 11.5', 'MatePad 10.4', 'MediaPad M6',
  'MediaPad T5', 'MatePad T10', 'MatePad SE'
],


  ASUS: ['ASUS VivoBook', 'ASUS ROG', 'ASUS ZenBook', 'ASUS TUF', 'ASUS ExpertBook'],
  LENOVO: ['Lenovo IdeaPad', 'Lenovo ThinkPad', 'Lenovo Legion', 'Lenovo Yoga'],
  ACER: ['Acer Aspire', 'Acer Predator', 'Acer Swift', 'Acer Spin']
};

export default function PhoneModels() {
  const navigate = useNavigate();
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModel, setSelectedModel] = useState(null);

  const modelListRef = useRef(null);
  useEffect(() => {
  window.scrollTo(0, 0);
  setSearchTerm('');
}, []);

  useEffect(() => {
    if (modelListRef.current) {
      modelListRef.current.scrollTop = 0;
    }
    setSearchTerm(''); 
  }, [selectedBrand]);

  const handleRepairs = () => {
  if (!selectedBrand) {
    alert('Please select the brand and proceed');
    return;
  }
  if (!selectedModel || !models[selectedBrand]?.includes(selectedModel)) {
    alert('Please select the model and proceed');
    return;
  }

  navigate('/Repair');
};




  const handleDeviceClick = (device) => {
  setSelectedDevice(device.name);
  setSelectedBrand(null);     
  setSelectedModel(null);      
  setSearchTerm('');           
};


  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
  };

  const filteredModels = models[selectedBrand]?.filter(model =>
    model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="device-selector">
      <h2>What Kind of device are you having Trouble with?</h2>
      <p>Our experts will assess your device and get it back to you — refreshed, restored, reliable.</p>

      <div className="device-grid">
        {[
          { name: 'iPhone', Image: iphone3 },
          { name: 'iPad', Image: ipad3 },
          { name: 'Android', Image: android3 },
          { name: 'Laptop', Image: laptop1 }
        ].map(device => (
          <div
            key={device.name}
            className={`device-card ${selectedDevice === device.name ? 'active' : ''}`}
            onClick={() => handleDeviceClick(device)}>
            <img src={device.Image} alt={device.name} className="device-img" />
            <p>{device.name}</p>
          </div>
        ))}
      </div>

      {selectedDevice && (
        <div className="brands">
          <h4>Select your brand</h4>
          <div className="brand-buttons">
            {brands[selectedDevice]?.map(brand => (
              <button
                key={brand}
                className={`brand-btn ${selectedBrand === brand ? 'active' : ''}`}
                onClick={() => handleBrandClick(brand)}
              >
                {brand}
              </button>
            ))}
          </div>

          {selectedBrand && (
            <>
              <input
                type="text"
                placeholder="Search model..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="model-search"
              />

              <div className="model-list" ref={modelListRef}>
  {filteredModels.length > 0 ? (
    filteredModels.map((model, idx) => (
      <p
        key={idx}
        onClick={() => setSelectedModel(model)}
        className={selectedModel === model ? 'model-item active' : 'model-item'}
      >
        {model}
      </p>
    ))
  ) : (
    <p>No models found</p>
  )}
</div>
            </>
          )}
        </div>
      )}

      {selectedBrand && selectedModel && (
        <button onClick={handleRepairs} className="next-btn">
          Next
        </button>
      )}
    </div>
  );
}