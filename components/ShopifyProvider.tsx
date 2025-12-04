import React, { createContext, useContext, useEffect, useRef } from 'react';

// =====================================================================
// ⚠️ IMPORTANT: REPLACE THESE VALUES WITH YOUR SHOPIFY STORE DETAILS
// =====================================================================
// You can get these from your Shopify Admin > Sales Channels > Buy Button
const SHOPIFY_CONFIG = {
  domain: 'southern-fry-kings.myshopify.com', 
  storefrontAccessToken: 'YOUR_ACCESS_TOKEN_HERE', // Needs to be updated for pop-up to work
  productId: '4362817261', // Updated to match user provided link
};

interface ShopifyContextType {
  openCheckout: () => void;
}

const ShopifyContext = createContext<ShopifyContextType>({
  openCheckout: () => console.log('Shopify not initialized'),
});

export const useShopify = () => useContext(ShopifyContext);

export const ShopifyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    
    // CRITICAL FIX: Check if we have a valid token before even trying to load/init
    // This prevents "Failed to fetch" errors on load if the user hasn't configured it yet
    if (SHOPIFY_CONFIG.storefrontAccessToken === 'YOUR_ACCESS_TOKEN_HERE') {
        console.log("Shopify SDK initialization skipped (Placeholder Token detected). Using fallback links.");
        return;
    }

    const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    
    // Check if script is already loaded by index.html or previous render
    if ((window as any).ShopifyBuy) {
      initShopify();
    } else {
      const script = document.createElement('script');
      script.src = scriptURL;
      script.async = true;
      script.onload = initShopify;
      document.head.appendChild(script);
    }

    function initShopify() {
      if (!(window as any).ShopifyBuy) return;

      try {
        const client = (window as any).ShopifyBuy.buildClient({
          domain: SHOPIFY_CONFIG.domain,
          storefrontAccessToken: SHOPIFY_CONFIG.storefrontAccessToken,
        });

        const ui = (window as any).ShopifyBuy.UI.init(client);

        // We render a hidden button that we can programmatically click
        // Setting iframe: false is crucial so we can access the button DOM node
        ui.createComponent('product', {
          id: SHOPIFY_CONFIG.productId,
          node: document.getElementById('shopify-hidden-container'),
          moneyFormat: '%24%7B%7Bamount%7D%7D',
          options: {
            product: {
              iframe: false, // Allows us to control the click event
              buttonDestination: 'checkout', // Opens checkout directly
              contents: {
                img: false,
                title: false,
                price: false,
                options: false,
                quantity: false,
                button: true, // We only need the button logic
              },
            },
            cart: {
              startOpen: false,
              popup: true, // Tries to open in popup/new window
            }
          },
        });

        isInitialized.current = true;
      } catch (e) {
        console.error("Failed to initialize Shopify Client:", e);
      }
    }
  }, []);

  const openCheckout = () => {
    // 1. Try to find the Shopify generated button within our hidden container
    const container = document.getElementById('shopify-hidden-container');
    const btn = container?.querySelector('.shopify-buy__btn') as HTMLElement;

    if (btn && isInitialized.current) {
      btn.click();
    } else {
      // Fallback if SDK fails, isn't initialized, or keys are wrong: Open checkout in new tab
      // This ensures the user isn't stuck if the integration isn't fully set up
      // Using the exact checkout link provided by the user
      const fallbackUrl = `https://${SHOPIFY_CONFIG.domain}/cart/${SHOPIFY_CONFIG.productId}:1?checkout`;
      window.location.href = fallbackUrl;
    }
  };

  return (
    <ShopifyContext.Provider value={{ openCheckout }}>
      {children}
      {/* Hidden container for the SDK to attach to */}
      <div id="shopify-hidden-container"></div>
    </ShopifyContext.Provider>
  );
};