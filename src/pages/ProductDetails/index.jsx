import React, { useState } from 'react';
import Button from '../../components/ui/Button';

const ProductDetails = () => {
  const [selectedFlavor, setSelectedFlavor] = useState('chocolate');
  const [selectedSubscription, setSelectedSubscription] = useState('single');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const flavors = [
    { id: 'chocolate', name: 'Chocolate', selected: true, color: 'sepia(0.5) saturate(2) hue-rotate(15deg) brightness(0.8)' },
    { id: 'vanilla', name: 'Vanilla', selected: false, color: 'sepia(0.3) saturate(1.5) hue-rotate(40deg) brightness(1.1)' },
    { id: 'orange', name: 'Orange', selected: false, color: 'sepia(1) saturate(2) hue-rotate(320deg) brightness(1)' }
  ];

  // Add additional bottle color variants for the carousel
  const bottleVariants = [
    { id: 'chocolate', name: 'Chocolate', color: 'sepia(0.5) saturate(2) hue-rotate(15deg) brightness(0.8)' },
    { id: 'vanilla', name: 'Vanilla', color: 'sepia(0.3) saturate(1.5) hue-rotate(40deg) brightness(1.1)' },
    { id: 'orange', name: 'Orange', color: 'sepia(1) saturate(2) hue-rotate(320deg) brightness(1)' },
    { id: 'berry', name: 'Berry', color: 'sepia(0.7) saturate(2.5) hue-rotate(280deg) brightness(0.9)' },
    { id: 'mint', name: 'Mint', color: 'sepia(0.4) saturate(1.8) hue-rotate(80deg) brightness(1.1)' }
  ];

  const subscriptionOptions = [
    {
      id: 'single',
      name: 'Single Drink Subscription',
      price: '$6.00',
      originalPrice: '$10',
      selected: true
    },
    {
      id: 'double',
      name: 'Double Drink Subscription',
      price: '$12.00',
      originalPrice: '$20',
      selected: false
    },
    {
      id: 'once',
      name: 'Try Once',
      price: '$8.00',
      originalPrice: '$10',
      selected: false
    }
  ];

  const productImages = [
    '/images/img_imageremovebgpreview_1.png',
    '/images/img_imageremovebgpreview_1.png',
    '/images/img_imageremovebgpreview_1.png',
    '/images/img_imageremovebgpreview_1.png',
    '/images/img_imageremovebgpreview_1.png'
  ];

  const thumbnailImages = [
    '/images/img_imageremovebgpreview_1.png',
    '/images/img_imageremovebgpreview_1.png',
    '/images/img_imageremovebgpreview_1.png',
    '/images/img_imageremovebgpreview_1.png',
    '/images/img_imageremovebgpreview_1.png',
    '/images/img_imageremovebgpreview_1.png',
    '/images/img_imageremovebgpreview_1.png',
    '/images/img_imageremovebgpreview_1.png',
    '/images/img_imageremovebgpreview_1.png',
    '/images/img_imageremovebgpreview_1.png'
  ];

  const handleFlavorSelect = (flavorId) => {
    setSelectedFlavor(flavorId);
    // Also update the current image index to show the selected flavor bottle
    const flavorIndex = bottleVariants.findIndex(variant => variant.id === flavorId);
    if (flavorIndex !== -1) {
      setCurrentImageIndex(flavorIndex);
    }
  };

  const handleBottleSelect = (index) => {
    setCurrentImageIndex(index);
    // Update flavor selection based on bottle selection
    const selectedVariant = bottleVariants[index];
    if (selectedVariant && flavors.find(f => f.id === selectedVariant.id)) {
      setSelectedFlavor(selectedVariant.id);
    }
  };

  const handleSubscriptionSelect = (subscriptionId) => {
    setSelectedSubscription(subscriptionId);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : productImages.length - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev < productImages.length - 1 ? prev + 1 : 0));
  };

  const handleAddToCart = () => {
    const selectedFlavorName = flavors.find(f => f.id === selectedFlavor)?.name;
    const selectedSubscriptionData = subscriptionOptions.find(s => s.id === selectedSubscription);
    
    alert(`Added to cart: ${selectedSubscriptionData?.name} - ${selectedFlavorName} flavor for ${selectedSubscriptionData?.price}`);
  };

  const renderStars = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star} className="relative">
            <div className="w-3 h-3 bg-black" style={{
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
            }}></div>
            {star === 5 && (
              <img 
                src="/images/img_mask_group.svg" 
                alt="Half star" 
                className="absolute top-0 left-0 w-3 h-3"
              />
            )}
          </div>
        ))}
        <span className="text-sm font-roboto font-normal text-secondary ml-2">
          4.6 (2,000+ reviews)
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8 p-16">
        {/* Left Section - Product Images */}
        <div className="flex-1 max-w-2xl">
          {/* Main Product Image */}
          <div className="relative bg-light-2 rounded-2xl p-16 mb-8">
            <img 
              src={productImages[currentImageIndex]}
              alt="Product"
              className="w-full h-auto max-h-96 object-contain mx-auto"
              style={{ 
                filter: bottleVariants[currentImageIndex]?.color || 'none',
                transition: 'filter 0.3s ease'
              }}
            />
            
            {/* Navigation Arrows */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <button 
                onClick={handlePreviousImage}
                className="w-10 h-10 rounded-full border border-secondary flex items-center justify-center bg-white hover:bg-gray-50 transition-colors"
              >
                <img src="/images/img_arrowleft.svg" alt="Previous" className="w-3 h-3" />
              </button>
              
              {/* Dots Indicator */}
              <div className="flex gap-2">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleBottleSelect(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-black' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              
              <button 
                onClick={handleNextImage}
                className="w-10 h-10 rounded-full border border-secondary flex items-center justify-center bg-white hover:bg-gray-50 transition-colors"
              >
                <img src="/images/img_arrowleft.svg" alt="Next" className="w-3 h-3 rotate-180" />
              </button>
            </div>
          </div>

          {/* Thumbnail Images Grid */}
          <div className="grid grid-cols-5 gap-4 mb-4">
            {thumbnailImages.slice(0, 5).map((image, index) => (
              <div 
                key={index}
                className={`aspect-square bg-cover bg-center rounded-lg cursor-pointer hover:opacity-80 transition-all ${
                  index === currentImageIndex 
                    ? 'ring-2 ring-black ring-offset-2' :'hover:ring-1 hover:ring-gray-300 hover:ring-offset-1'
                }`}
                style={{ backgroundImage: `url(/images/img_rectangle_6723.svg)` }}
                onClick={() => handleBottleSelect(index)}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <img 
                    src={image}
                    alt={`${bottleVariants[index]?.name || 'Bottle'} ${index + 1}`}
                    className="w-3/4 h-auto object-contain transition-transform hover:scale-105"
                    style={{ 
                      filter: bottleVariants[index]?.color || 'none',
                      transition: 'filter 0.3s ease, transform 0.2s ease'
                    }}
                  />
                </div>
                {/* Color indicator dot */}
                <div 
                  className="absolute bottom-1 right-1 w-3 h-3 rounded-full border border-white shadow-sm"
                  style={{ 
                    background: `hsl(${index * 60}, 60%, 50%)`,
                    filter: bottleVariants[index]?.color || 'none'
                  }}
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-5 gap-4">
            {thumbnailImages.slice(5, 10).map((image, index) => (
              <div 
                key={index + 5}
                className={`aspect-square bg-cover bg-center rounded-lg cursor-pointer hover:opacity-80 transition-all ${
                  index + 5 === currentImageIndex 
                    ? 'ring-2 ring-black ring-offset-2' :'hover:ring-1 hover:ring-gray-300 hover:ring-offset-1'
                }`}
                style={{ backgroundImage: `url(/images/img_rectangle_6723.svg)` }}
                onClick={() => handleBottleSelect(index + 5)}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <img 
                    src={image}
                    alt={`${bottleVariants[index + 5]?.name || 'Bottle'} ${index + 6}`}
                    className="w-3/4 h-auto object-contain transition-transform hover:scale-105"
                    style={{ 
                      filter: bottleVariants[index]?.color || 'sepia(0.6) saturate(1.5) hue-rotate(200deg)',
                      transition: 'filter 0.3s ease, transform 0.2s ease'
                    }}
                  />
                </div>
                {/* Color indicator dot */}
                <div 
                  className="absolute bottom-1 right-1 w-3 h-3 rounded-full border border-white shadow-sm"
                  style={{ 
                    background: `hsl(${(index + 5) * 40}, 65%, 55%)`,
                    filter: bottleVariants[index]?.color || 'sepia(0.6) saturate(1.5) hue-rotate(200deg)'
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Product Details */}
        <div className="flex-1 max-w-2xl">
          {/* Product Title and Rating */}
          <h1 className="text-4xl font-roboto font-bold text-secondary mb-4">
            Lorem Ipsum
          </h1>
          
          {renderStars()}

          {/* Product Description */}
          <p className="text-lg font-roboto font-normal text-secondary leading-relaxed mt-4 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu felis vel ex aliquam interdum id nec orci. Fusce eu neque non elit efficitur dapibus quis in erat.
          </p>

          {/* Subscription Options Container */}
          <div className="border border-muted-3 rounded-lg overflow-hidden">
            {/* Recommended Header */}
            <div className="bg-tertiary px-6 py-3 border-b border-muted-3">
              <span className="text-xl font-roboto font-bold text-white">
                Recommended
              </span>
            </div>

            {/* Single Drink Subscription */}
            <div className="p-6 border-b border-muted-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full border-2 border-black bg-black flex items-center justify-center">
                    <img src="/images/img_group_1000003911.svg" alt="Selected" className="w-2 h-2" />
                  </div>
                  <span className="text-xl font-roboto font-light text-secondary">
                    Single Drink Subscription
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-roboto font-bold text-secondary">
                    $6.00
                  </span>
                  <span className="text-xl font-roboto font-light text-muted-3 line-through">
                    $10
                  </span>
                </div>
              </div>

              <div className="h-px bg-muted-2 mb-4"></div>

              {/* Choose Flavor */}
              <div className="mb-6">
                <h3 className="text-base font-roboto font-normal text-secondary mb-4">
                  Choose Flavor
                </h3>
                
                <div className="flex gap-4">
                  {flavors.map((flavor) => (
                    <div key={flavor.id} className="relative">
                      <div 
                        className={`w-32 h-36 bg-light-2 rounded border cursor-pointer transition-all ${
                          selectedFlavor === flavor.id 
                            ? 'border-black ring-2 ring-black ring-offset-2' :'border-white hover:border-gray-300'
                        }`}
                        onClick={() => handleFlavorSelect(flavor.id)}
                      >
                        <div className="p-2">
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-2 h-2 rounded transition-colors ${
                              selectedFlavor === flavor.id ? 'bg-black' : 'bg-light-1 border border-muted-2'
                            }`}></div>
                            <span className={`text-sm font-roboto font-light transition-colors ${
                              selectedFlavor === flavor.id ? 'text-black' : 'text-muted-2'
                            }`}>
                              {flavor.name}
                            </span>
                          </div>
                          <div className="flex justify-center mt-4">
                            <img 
                              src="/images/img_imageremovebgpreview_1.png"
                              alt={flavor.name}
                              className="w-20 h-8 object-contain transition-all hover:scale-105"
                              style={{ 
                                filter: flavor.color,
                                transition: 'filter 0.3s ease, transform 0.2s ease'
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      {flavor.id === 'chocolate' && (
                        <div className="absolute -top-1 -right-1 bg-tertiary text-white text-xs font-bold px-2 py-1 rounded-l">
                          BEST-SELLER
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included */}
              <div className="mb-6">
                <h3 className="text-base font-roboto font-normal text-secondary mb-4">
                  What's Included:
                </h3>
                
                <div className="flex gap-4">
                  {/* Every 30 Days */}
                  <div className="flex-1 border border-muted-2 rounded-lg p-4">
                    <div className="text-base font-roboto font-light text-muted-1 mb-4">
                      Every 30 Days
                    </div>
                    <div className="flex justify-center">
                      <img 
                        src="/images/img_imageremovebgpreview_1.png"
                        alt="Every 30 days"
                        className="w-36 h-14 object-contain"
                        style={{ 
                          filter: selectedFlavor ? flavors.find(f => f.id === selectedFlavor)?.color : 'none',
                          transition: 'filter 0.3s ease'
                        }}
                      />
                    </div>
                  </div>

                  {/* One Time (Free) */}
                  <div className="flex-1 border border-muted-2 rounded-lg p-4">
                    <div className="text-base font-roboto font-light text-muted-1 mb-4">
                      <span>One Time </span>
                      <span className="font-bold text-tertiary">(Free)</span>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <img 
                        src="/images/img_imageremovebgpreview_1.png"
                        alt="Free item 1"
                        className="w-36 h-14 object-contain"
                        style={{ 
                          filter: 'sepia(0.3) saturate(1.2) hue-rotate(180deg) brightness(1.1)',
                          transition: 'filter 0.3s ease'
                        }}
                      />
                      <img 
                        src="/images/img_imageremovebgpreview_1.png"
                        alt="Free item 2"
                        className="w-36 h-14 object-contain"
                        style={{ 
                          filter: 'sepia(0.8) saturate(1.8) hue-rotate(60deg) brightness(1)',
                          transition: 'filter 0.3s ease'
                        }}
                      />
                      <img 
                        src="/images/img_imageremovebgpreview_1.png"
                        alt="Free item 3"
                        className="w-36 h-14 object-contain"
                        style={{ 
                          filter: 'sepia(0.6) saturate(2) hue-rotate(300deg) brightness(0.9)',
                          transition: 'filter 0.3s ease'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits List */}
              <div className="space-y-3">
                {[
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <img 
                      src="/images/img_vector.svg" 
                      alt="Check" 
                      className="w-2 h-3 mt-1 flex-shrink-0"
                    />
                    <span className={`text-sm font-roboto ${
                      index === 1 || index === 2 ? 'font-bold' : 'font-normal'
                    } text-secondary capitalize leading-relaxed`}>
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Double Drink Subscription */}
            <div className="p-6 border-b border-muted-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-lg border border-black bg-light-1"></div>
                  <span className="text-xl font-roboto font-light text-secondary">
                    Double Drink Subscription
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-roboto font-bold text-secondary">
                    $12.00
                  </span>
                  <span className="text-xl font-roboto font-light text-muted-3 line-through">
                    $20
                  </span>
                </div>
              </div>
            </div>

            {/* Try Once */}
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-lg border border-black bg-light-1"></div>
                  <span className="text-xl font-roboto font-light text-secondary">
                    Try Once
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-roboto font-bold text-secondary">
                    $8.00
                  </span>
                  <span className="text-xl font-roboto font-light text-muted-3 line-through">
                    $10
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-8">
            <Button 
              onClick={handleAddToCart}
              variant="primary"
              size="lg"
              className="w-full py-6 text-lg font-bold rounded-3xl"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;