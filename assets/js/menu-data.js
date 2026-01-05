const SITE_CONFIG = {
  whatsappNumber: '+62881038101787',
  mapsUrl: 'https://maps.google.com/?q=The+Meat+Emporium+Bali',
};

const MENU_DATA = {
  butcher: [
    {
      title: 'Premium Beef',
      badge: 'Signature Cuts',
      description: 'Black Angus and Wagyu favourites cut to order.',
      items: [
        { name: 'Beef Tenderloin Black Angus', price: '995k / kg' },
        { name: 'Beef Wagyu Flat Iron', price: '682k / kg' },
        { name: 'Rib-Eye Black Angus', price: '865k / kg' },
        { name: 'Beef Rump Black Angus', price: '500k / kg' },
        { name: 'Striploin Grass Fed', price: '583k / kg' },
        { name: 'Striploin Black Angus', price: '668k / kg' },
        { name: 'Pork Neck', price: '190k / kg' },
      ],
    },
    {
      title: 'Sausages',
      badge: 'House Made',
      description: 'Small batch sausages with real ingredients.',
      items: [
        { name: 'Beef Thick Sausages', price: '235k / kg + 10% tax' },
        { name: 'Beef Thin Sausages', price: '255k / kg + 10% tax' },
        { name: 'Beef Bratwurst Sausages', price: '265k / kg + 10% tax' },
        { name: 'Beef Tomato Onion Sausages', price: '265k / kg + 10% tax' },
        { name: 'Spicy Chorizo Sausages', price: '265k / kg + 10% tax' },
        { name: 'Irish Pork Sausages', price: '230k / kg + 10% tax' },
      ],
    },
    {
      title: 'Seafood',
      badge: 'From the Coast',
      description: 'Norwegian salmon and smoked favourites.',
      items: [
        { name: 'Salmon Norwegian Fillet', price: '600k / kg' },
        { name: 'Smoked Salmon', price: '850k / kg + 10% tax' },
      ],
    },
    {
      title: 'Specialty Products',
      badge: 'Pantry & Deli',
      description: 'Ready condiments and charcuterie essentials.',
      items: [
        { name: 'Beef Tallow', price: '45k / jar + 10% tax' },
        { name: 'Tomato Pickle', price: '45k / jar + 10% tax' },
        { name: 'Pizza Bacon', price: '50k / pack + 10% tax' },
        { name: 'Beef Pastrami', price: '280k / kg + 10% tax' },
        { name: 'Eye Bacon', price: '275k / kg + 10% tax' },
      ],
    },
    {
      title: 'Frozen & Ready',
      badge: 'Comfort Favourites',
      description: 'Bake-at-home classics for easy feasts.',
      items: [
        { name: 'Sausage Roll', price: '30k / pc + 10% tax' },
        { name: 'Chunky Beef Red Wine Pie', price: '50k / pc + 10% tax' },
        { name: 'Aussie Minced Pie', price: '45k / pc + 10% tax' },
        { name: 'Apple & Cinnamon Pie', price: '50k / pc + 10% tax' },
      ],
    },
    {
      title: 'Minced & Poultry',
      badge: 'Everyday Essentials',
      description: 'Crowd-pleasers for burgers, bolognese, and grills.',
      items: [
        { name: 'Beef Burger Patty', price: '232k / kg + 10% tax' },
        { name: 'Beef Chuck Tenderloin', price: '227.5k / kg' },
        { name: 'Minced Beef', price: '225k / kg' },
        { name: 'Chicken Breast', price: '98.5k / kg' },
      ],
    },
  ],
  steakhouse: [
    {
      title: 'Sides',
      icon: '🥗',
      description: 'Bright, buttery, and made for sharing.',
      items: [
        { name: 'Garden Salad', price: '30k++' },
        { name: 'Coleslaw', price: '30k++' },
        { name: 'Steamed Vegetables', price: '30k++' },
        { name: 'Mashed Potato', price: '30k++' },
        { name: 'Baked Potato', price: '35k++' },
        { name: 'Potato Wedges', price: '45k++' },
        { name: 'French Fries (in Beef Tallow)', price: '45k++' },
        { name: 'Sweet Potato Scallop (Beef Tallow)', price: '45k++' },
        { name: 'Gourmet Salad', description: 'See display', price: '45k++' },
      ],
    },
    {
      title: 'Condiments & Sauces',
      icon: '🧈',
      description: 'Elevate your steak with house-made sauces.',
      items: [
        { name: 'Garlic Butter / Anchovies Butter / Cowboy Butter', price: '15k++' },
        { name: 'Grassfed Butter', price: '10k++' },
        { name: 'Gravy / Pepper Sauce / Mushroom Sauce / Chimichurri', price: 'included' },
      ],
    },
    {
      title: 'Burgers',
      icon: '🍔',
      description: 'Stacked, juicy, and built on our own patties.',
      items: [
        { name: 'The Best Burger in Town', description: 'Beef Burger, Cowboy Sauce, Bacon, Lettuce, Tomato, Onion, Pickles, Beetroot Bun', price: '110k' },
        { name: 'Cheese Burger', description: 'Beef Patty, Cheese, Cowboy Sauce, Bacon, Charcoal Bun', price: '90k' },
        { name: 'Double Cheeseburger', description: '2 Patties, Extra Cheese, Extra Bacon, Cowboy Sauce, Charcoal Bun', price: '160k' },
      ],
    },
    {
      title: 'Kids Menu - 50k each',
      icon: '🧒',
      description: 'Little crowd-pleasers with greens where it counts.',
      items: [
        { name: 'Spaghetti Bolognese', price: '50k' },
        { name: 'Bangers & Mash', description: 'With some greens', price: '50k' },
        { name: 'Chicken Nuggets & Chips', price: '50k' },
      ],
    },
    {
      title: 'Dessert',
      icon: '🍰',
      description: 'Sweet finishes made in-house.',
      items: [
        { name: 'Apple & Cinnamon Pie with Vanilla Ice Cream', price: '50k' },
        { name: 'Ice Cream by Leoni', description: 'Selection see display', price: '-' },
      ],
    },
    {
      title: 'Drinks – Beers',
      icon: '🍺',
      description: 'Ice-cold classics and craft favourites.',
      items: [
        { name: 'Bintang Beer 330ml', price: '34k' },
        { name: 'Bintang Crystal 330ml', price: '36k' },
        { name: 'Coopers Original Pale Ale 375ml', price: '85k' },
        { name: 'Bintang Bucket', description: '6 × 330ml', price: '195k' },
      ],
    },
    {
      title: 'Wine (750ml)',
      icon: '🍷',
      description: 'Cellar picks to pair with your steak.',
      items: [
        { name: 'Tallhorse Merlot', description: 'South Africa', price: '420k', badge: 'Red' },
        { name: 'Douglas Green (Pinotage / Shiraz / Cabernet)', price: '450k', badge: 'Red' },
        { name: 'FLM Barrel Select Malbec', description: 'Argentina', price: '574k', badge: 'Red' },
        { name: 'Ulisse Amaranta Montepulciano', description: 'Italy', price: '650k', badge: 'Red' },
        { name: 'Haha Sauvignon Blanc', description: 'New Zealand', price: '440k', badge: 'White' },
        { name: 'Red Wines (by the glass 150ml)', price: '155k', badge: 'Glass' },
        { name: 'White Wine (by the glass 150ml)', price: '155k', badge: 'Glass' },
      ],
    },
    {
      title: 'Spirits – Cocktail & Single Mixer',
      icon: '🥃',
      description: 'Classic highballs and top-shelf pours.',
      items: [
        { name: 'House Gin & Tonic', price: '75k' },
        { name: 'Bombay Gin & Tonic', price: '98k' },
        { name: "Hendrick's Gin & Tonic", price: '125k' },
        { name: 'Tanqueray Gin & Tonic', price: '138k' },
        { name: 'Monkey Splash Whiskey', description: 'Soda / Coke', price: '105k' },
        { name: 'Whiskey Highball', price: '105k' },
        { name: 'Glenfiddich Single Malt', description: 'Soda / Coke', price: '120k' },
        { name: 'Premium Vodka', description: 'Grey Goose / Ketel One', price: '115k' },
        { name: 'Rum & Coke', description: 'Spiced Rum', price: '98k' },
      ],
    },
    {
      title: 'Aperitivo Cocktails',
      icon: '🍸',
      description: 'Sunset-ready bitters and citrus.',
      items: [
        { name: 'Garibaldi', description: 'Campari & Orange', price: '100k' },
        { name: 'Negroni Classic', price: '120k' },
        { name: 'Americano', price: '120k' },
      ],
    },
    {
      title: 'Soft Drinks',
      icon: '🥤',
      description: 'Refreshing staples and sodas.',
      items: [
        { name: 'Coke 330ml', price: '22k' },
        { name: 'Coke Zero 330ml', price: '23k' },
        { name: 'Sprite / Fanta 330ml', price: '21k' },
        { name: 'Polaris Soda Water', price: '16k' },
        { name: 'Schweppes Tonic', price: '21k' },
        { name: 'Hot / Iced Tea', price: '20k' },
        { name: 'Hot / Iced Lemon Tea', price: '22k' },
        { name: 'Equil Mineral Water 380ml', price: '27k' },
        { name: 'Equil Mineral Water 760ml', price: '45k' },
        { name: 'Equil Sparkling 380ml', price: '29k' },
        { name: 'Equil Sparkling 760ml', price: '47k' },
        { name: 'Sosro Tea Bottle', price: '9.5k' },
      ],
    },
    {
      title: 'Juices',
      icon: '🧃',
      description: 'Freshly pressed and tropical.',
      items: [
        { name: 'Fresh Watermelon', price: '30k' },
        { name: 'Fresh Orange', price: '35k' },
        { name: 'Fresh Coconut', price: '35k' },
      ],
    },
  ],
};

export { MENU_DATA, SITE_CONFIG };
