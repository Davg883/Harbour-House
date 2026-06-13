/* -------------------------------------------------------------
   Harbour House Brand Showcase - Application Script
   Dual-Mode Architecture: Fetch Server API or Local Fallbacks
   ------------------------------------------------------------- */

// Global State
const BrandState = {
  isLocalFileMode: false,
  images: [],
  menu: [
      {
          "category": "Start by the Sea",
          "description": "Fresh, light coastal bites perfect for opening your meal.",
          "items": [
              {
                  "id": "item-calamari",
                  "name": "Crispy Salt & Pepper Calamari",
                  "price": 10.0,
                  "description": "Tender squid rings, seasoned salt & pepper crust, fresh chilli, spring onions, fresh lemon, house tartare.",
                  "markers": [
                      "Customer Favourite"
                  ],
                  "allergens": [
                      "Gluten",
                      "Molluscs",
                      "Egg"
                  ]
              },
              {
                  "id": "item-prawns",
                  "name": "Tempura Prawns",
                  "price": 8.0,
                  "description": "Crispy light tempura battered tiger prawns, served with a sweet chilli dipping sauce and fresh lime.",
                  "markers": [
                      "Coastal Pick"
                  ],
                  "allergens": [
                      "Gluten",
                      "Crustaceans"
                  ]
              },
              {
                  "id": "item-gambas",
                  "name": "Gambas Pil Pil",
                  "price": 12.0,
                  "description": "Sizzling king prawns cooked in rich garlic butter, onions, and spicy chorizo. Served with lemon.",
                  "markers": [
                      "Spicy",
                      "Chef Special"
                  ],
                  "allergens": [
                      "Milk",
                      "Crustaceans",
                      "Sulphites"
                  ]
              },
              {
                  "id": "item-peppers",
                  "name": "Blistered Padrón Peppers",
                  "price": 10.0,
                  "description": "Pan-seared Padrón peppers with sea salt, served alongside grilled Cypriot halloumi cheese.",
                  "markers": [
                      "Vegetarian"
                  ],
                  "allergens": [
                      "Milk"
                  ]
              }
          ]
      },
      {
          "category": "Made for Sharing",
          "description": "Social plates designed to be shared among friends on the harbour wall.",
          "items": [
              {
                  "id": "item-dirty-fries",
                  "name": "Dirty Fries",
                  "price": 8.0,
                  "description": "Crispy seasoned fries topped with smokey chopped bacon, red onion, garlic butter, fresh chilli, and melted cheddar.",
                  "markers": [
                      "Social Classic"
                  ],
                  "allergens": [
                      "Milk"
                  ]
              },
              {
                  "id": "item-lamb-fries",
                  "name": "Braised Lamb Fries",
                  "price": 14.0,
                  "description": "Rustic skin-on fries loaded with slow-cooked shoulder lamb, sweet mint oil, crumbled Greek feta, and roasted sweet peppers.",
                  "markers": [
                      "Customer Favourite",
                      "Premium Sharing"
                  ],
                  "allergens": [
                      "Milk",
                      "Sulphites"
                  ]
              },
              {
                  "id": "item-mushrooms",
                  "name": "Garlic Butter Mushrooms",
                  "price": 8.0,
                  "description": "Sautéed field mushrooms drenched in garlic, herbs, and local farm butter. Served hot.",
                  "markers": [
                      "Vegetarian",
                      "Local Supplier"
                  ],
                  "allergens": [
                      "Milk"
                  ]
              },
              {
                  "id": "item-mozzarella",
                  "name": "Mozzarella Sticks",
                  "price": 12.0,
                  "description": "Golden breaded mozzarella cheese sticks, melting centre, served with a rich tomato and herb dip.",
                  "markers": [
                      "Vegetarian"
                  ],
                  "allergens": [
                      "Gluten",
                      "Milk"
                  ]
              },
              {
                  "id": "item-meatballs",
                  "name": "Oven Baked Meatballs",
                  "price": 10.0,
                  "description": "Seasoned beef and pork meatballs, baked in a rich house garlic red pepper sauce, glazed with mozzarella.",
                  "markers": [
                      "Comfort Food"
                  ],
                  "allergens": [
                      "Gluten",
                      "Milk"
                  ]
              }
          ]
      },
      {
          "category": "Harbour House Favourites",
          "description": "Our signature dishes representing the heart of the Harbour House experience.",
          "items": [
              {
                  "id": "item-burger",
                  "name": "HH 6oz Burger",
                  "price": 18.0,
                  "description": "Prime beef patty, crispy pancetta, fresh lettuce, sliced beef tomato, house onion relish, served with seasoned chips, crispy onion rings, and homemade slaw.",
                  "markers": [
                      "Signature"
                  ],
                  "allergens": [
                      "Gluten",
                      "Milk",
                      "Egg",
                      "Mustard"
                  ]
              },
              {
                  "id": "item-sirloin",
                  "name": "HH 10oz Sirloin",
                  "price": 30.0,
                  "description": "Premium 10oz aged sirloin steak cooked to your liking, signature HH jus sauce, crispy onion rings, chunky chips, and a dressed garden side salad.",
                  "markers": [
                      "Premium Choice"
                  ],
                  "allergens": [
                      "Gluten",
                      "Sulphites",
                      "Mustard"
                  ]
              },
              {
                  "id": "item-skewer",
                  "name": "Malaysian Chicken Skewer",
                  "price": 18.0,
                  "description": "Marinated chicken thigh skewers in aromatic coconut, ginger, and lemongrass spices. Served with a crisp side salad and warm flatbread.",
                  "markers": [
                      "Spicy Accent"
                  ],
                  "allergens": [
                      "Gluten",
                      "Soya"
                  ]
              }
          ]
      },
      {
          "category": "From the Water",
          "description": "Fresh seafood landed locally and prepared by our kitchen team.",
          "items": [
              {
                  "id": "item-fish-chips",
                  "name": "Fish & Chips",
                  "price": 20.0,
                  "description": "Traditional battered local cod, double-cooked chunky chips, garden peas, fresh lemon wedge, and house tartare sauce.",
                  "markers": [
                      "Local Catch",
                      "Classic"
                  ],
                  "allergens": [
                      "Gluten",
                      "Fish",
                      "Egg"
                  ]
              },
              {
                  "id": "item-moules",
                  "name": "Moules marinière",
                  "price": 22.0,
                  "description": "Fresh Isle of Wight mussels steamed in a classic creamy white wine, garlic, and parsley broth. Served with toasted rustic sourdough bread.",
                  "markers": [
                      "Local Catch",
                      "Staff Choice"
                  ],
                  "allergens": [
                      "Molluscs",
                      "Milk",
                      "Gluten",
                      "Sulphites"
                  ]
              },
              {
                  "id": "item-curry-mussels",
                  "name": "Curry Mussels",
                  "price": 24.0,
                  "description": "Isle of Wight mussels steamed in a warm coconut curry, red chilli, and fresh coriander broth. Served with seasoned skin-on chips.",
                  "markers": [
                      "Spicy",
                      "Coastal Fusion"
                  ],
                  "allergens": [
                      "Molluscs",
                      "Fish",
                      "Soya"
                  ]
              }
          ]
      },
      {
          "category": "Alongside",
          "description": "Perfect accompaniments to complement your main dishes.",
          "items": [
              {
                  "id": "item-side-chips",
                  "name": "Chips",
                  "price": 4.5,
                  "description": "Double-cooked rustic chips seasoned with sea salt flakes.",
                  "markers": [
                      "Vegetarian",
                      "Vegan"
                  ],
                  "allergens": []
              },
              {
                  "id": "item-side-slaw",
                  "name": "Slaw",
                  "price": 4.5,
                  "description": "Freshly shredded red and white cabbage, carrots, bound in seasoned mayonnaise.",
                  "markers": [
                      "Vegetarian"
                  ],
                  "allergens": [
                      "Egg"
                  ]
              },
              {
                  "id": "item-side-salad",
                  "name": "Salad Bowl",
                  "price": 4.0,
                  "description": "Crisp mixed garden greens, cherry tomatoes, cucumber, house vinaigrette.",
                  "markers": [
                      "Vegetarian",
                      "Vegan"
                  ],
                  "allergens": [
                      "Mustard"
                  ]
              },
              {
                  "id": "item-side-sourdough",
                  "name": "Sourdough",
                  "price": 4.0,
                  "description": "Toasted local bakery sourdough bread served with soft salted butter.",
                  "markers": [
                      "Vegetarian"
                  ],
                  "allergens": [
                      "Gluten",
                      "Milk"
                  ]
              },
              {
                  "id": "item-side-rings",
                  "name": "Onion Rings",
                  "price": 4.5,
                  "description": "Giant beer-battered onion rings fried until golden and crispy.",
                  "markers": [
                      "Vegetarian"
                  ],
                  "allergens": [
                      "Gluten"
                  ]
              }
          ]
      },
      {
          "category": "Little Sailors",
          "description": "Smaller portions designed for children under 12.",
          "items": [
              {
                  "id": "item-kids-fish",
                  "name": "Kids Fish & Chips",
                  "price": 9.0,
                  "description": "Mini battered cod fillet, chips, and choice of garden peas or baked beans.",
                  "markers": [
                      "Kids Favourite"
                  ],
                  "allergens": [
                      "Gluten",
                      "Fish"
                  ]
              },
              {
                  "id": "item-kids-burger",
                  "name": "Kids Cheese Burger & Chips",
                  "price": 8.0,
                  "description": "4oz beef patty, melted cheddar cheese in a soft bun, served with chips.",
                  "markers": [],
                  "allergens": [
                      "Gluten",
                      "Milk"
                  ]
              },
              {
                  "id": "item-kids-nuggets",
                  "name": "Kids Chicken Nuggets & Chips",
                  "price": 7.0,
                  "description": "Crispy golden battered chicken breast chunks, served with chips and beans.",
                  "markers": [],
                  "allergens": [
                      "Gluten"
                  ]
              }
          ]
      },
      {
          "category": "Cocktails & Mocktails",
          "description": "Hand-crafted seaside cocktails (£10) and refreshing mocktails (£6).",
          "items": [
              {
                  "id": "item-cocktail-pornstar",
                  "name": "Pornstar Martini",
                  "price": "£10.00",
                  "description": "Vanilla vodka, passionfruit liqueur, fresh passionfruit juice, pineapple juice. Served with a shot of Prosecco.",
                  "markers": [
                      "Customer Favourite",
                      "Signature"
                  ],
                  "allergens": [
                      "Sulphites"
                  ]
              },
              {
                  "id": "item-cocktail-espresso",
                  "name": "Espresso Martini",
                  "price": "£10.00",
                  "description": "Vanilla vodka, Kahlúa coffee liqueur, double shot of fresh espresso, sugar syrup.",
                  "markers": [
                      "Signature"
                  ],
                  "allergens": []
              },
              {
                  "id": "item-cocktail-spicy-marg",
                  "name": "Spicy Margarita",
                  "price": "£10.00",
                  "description": "Premium tequila, triple-sec, fresh red chilli slices, lime juice, salted rim.",
                  "markers": [
                      "Spicy",
                      "Staff Pick"
                  ],
                  "allergens": []
              },
              {
                  "id": "item-cocktail-mojito",
                  "name": "Sunset Mojito",
                  "price": "£10.00 / £6.00",
                  "description": "White rum, muddled lime, fresh garden mint, sugar syrup, soda. Available as Mocktail. Flavours: Strawberry, Passionfruit, Mango, Raspberry.",
                  "markers": [
                      "Sunset Classic"
                  ],
                  "allergens": []
              },
              {
                  "id": "item-cocktail-pina-colada",
                  "name": "Piña Colada",
                  "price": "£10.00 / £6.00",
                  "description": "White rum, Malibu coconut rum, pineapple juice, coconut cream, fresh cream. Available as Mocktail.",
                  "markers": [
                      "Creamy"
                  ],
                  "allergens": [
                      "Milk"
                  ]
              },
              {
                  "id": "item-cocktail-hugo",
                  "name": "Hugo Spritz",
                  "price": "£10.00",
                  "description": "Gin, elderflower liqueur, Prosecco, fresh mint leaves, soda.",
                  "markers": [
                      "Light & Floral"
                  ],
                  "allergens": [
                      "Sulphites"
                  ]
              },
              {
                  "id": "item-cocktail-aperol",
                  "name": "Aperol Spritz",
                  "price": "£10.00",
                  "description": "Classic Italian Aperol, sparkling Prosecco, splash of soda, orange slice.",
                  "markers": [
                      "Aperitif"
                  ],
                  "allergens": [
                      "Sulphites"
                  ]
              },
              {
                  "id": "item-cocktail-amaretto-sour",
                  "name": "Amaretto Sour",
                  "price": "£10.00 / £6.00",
                  "description": "Disaronno Amaretto, fresh lemon juice, egg white, angostura bitters. Available as Mocktail.",
                  "markers": [],
                  "allergens": [
                      "Egg"
                  ]
              },
              {
                  "id": "item-cocktail-mermaid",
                  "name": "The Mermaid",
                  "price": "£10.00",
                  "description": "Vanilla vodka, triple-sec, fresh lime juice, cranberry juice.",
                  "markers": [
                      "Local Theme"
                  ],
                  "allergens": []
              }
          ]
      },
      {
          "category": "Beers & Ciders",
          "description": "Selection of ice-cold draught beers and premium bottled ciders.",
          "items": [
              {
                  "id": "item-beer-madri",
                  "name": "Madrí Exceptional (Draught)",
                  "price": "£6.00",
                  "description": "Crisp, clean Spanish lager, light golden color with a light floral aroma (4.6% ABV).",
                  "markers": [
                      "Pouring Premium"
                  ],
                  "allergens": [
                      "Gluten"
                  ]
              },
              {
                  "id": "item-beer-cruzcampo",
                  "name": "Cruzcampo (Draught)",
                  "price": "£6.00",
                  "description": "Traditional Andalusian lager, light and refreshing with a smooth finish (4.4% ABV).",
                  "markers": [
                      "Pouring Premium"
                  ],
                  "allergens": [
                      "Gluten"
                  ]
              },
              {
                  "id": "item-beer-apocalypse",
                  "name": "Alpacalypse IPA (Draught)",
                  "price": "£6.00",
                  "description": "Locally brewed punchy craft IPA, loaded with tropical citrus hops (6.3% ABV).",
                  "markers": [
                      "Local Brewery",
                      "Chef Recommendation"
                  ],
                  "allergens": [
                      "Gluten"
                  ]
              },
              {
                  "id": "item-beer-cold-river",
                  "name": "Sharp's Cold River Cider (Draught)",
                  "price": "£6.00",
                  "description": "Crisp and clean Somerset apple cider with a refreshing dry finish (4.5% ABV).",
                  "markers": [
                      "Refreshing"
                  ],
                  "allergens": [
                      "Sulphites"
                  ]
              },
              {
                  "id": "item-beer-corona",
                  "name": "Corona Extra (Bottle)",
                  "price": "£4.50",
                  "description": "Classic Mexican lager served with a wedge of fresh lime (4.5% ABV).",
                  "markers": [],
                  "allergens": [
                      "Gluten"
                  ]
              },
              {
                  "id": "item-beer-old-mout",
                  "name": "Old Mout Cider (Bottle)",
                  "price": "£6.00",
                  "description": "Premium kiwi and lime flavoured fruit cider (4% ABV).",
                  "markers": [],
                  "allergens": [
                      "Sulphites"
                  ]
              },
              {
                  "id": "item-beer-estrella-zero",
                  "name": "Estrella Galicia 0.0% (Bottle)",
                  "price": "£4.00",
                  "description": "Delicious non-alcoholic Spanish lager with full pilsner flavor.",
                  "markers": [
                      "Alcohol Free"
                  ],
                  "allergens": [
                      "Gluten"
                  ]
              },
              {
                  "id": "item-beer-guinness-zero",
                  "name": "Guinness 0.0% (Bottle)",
                  "price": "£5.00",
                  "description": "Non-alcoholic stout, dark ruby color with a creamy white head.",
                  "markers": [
                      "Alcohol Free"
                  ],
                  "allergens": [
                      "Gluten"
                  ]
              }
          ]
      },
      {
          "category": "Wine & Champagne",
          "description": "Curated wine list available by the glass (175ml/250ml) or bottle.",
          "items": [
              {
                  "id": "item-wine-picpoul",
                  "name": "Ormarine, Picpoul de Pinet (France)",
                  "price": "£9.00 / £13.00 / £33.00",
                  "description": "Zesty, dry white wine with lemon peel and mineral notes. Perfect with seafood (12.5% ABV).",
                  "markers": [
                      "Seafood Match",
                      "Staff Choice"
                  ],
                  "allergens": [
                      "Sulphites"
                  ]
              },
              {
                  "id": "item-wine-sauv-nz",
                  "name": "Seven Degrees, Sauvignon Blanc (NZ)",
                  "price": "£8.50 / £11.50 / £30.00",
                  "description": "Classic Marlborough Sauvignon Blanc with gooseberry and elderflower punch (12.5% ABV).",
                  "markers": [
                      "Premium Pick"
                  ],
                  "allergens": [
                      "Sulphites"
                  ]
              },
              {
                  "id": "item-wine-sauv-sa",
                  "name": "Brightwater Bay, Sauvignon Blanc (S.A)",
                  "price": "£7.50 / £9.00 / £24.00",
                  "description": "Crisp and fresh with grass and tropical fruit undertones (12.5% ABV).",
                  "markers": [],
                  "allergens": [
                      "Sulphites"
                  ]
              },
              {
                  "id": "item-wine-pinot-grigio",
                  "name": "Amori, Pinot Grigio (Italy)",
                  "price": "£7.50 / £9.00 / £24.00",
                  "description": "Light, dry, and easy drinking white wine with clean apple flavors (11% ABV).",
                  "markers": [],
                  "allergens": [
                      "Sulphites"
                  ]
              },
              {
                  "id": "item-wine-blush",
                  "name": "Amori Pinot Grigio Blush (Italy)",
                  "price": "£7.50 / £9.00 / £24.00",
                  "description": "Fruity and elegant rosé wine with strawberry and cherry accents (11% ABV).",
                  "markers": [
                      "Summer Vibe"
                  ],
                  "allergens": [
                      "Sulphites"
                  ]
              },
              {
                  "id": "item-wine-angel",
                  "name": "Whispering Angel, Cotes de Provence (France)",
                  "price": "£12.00 / £16.00 / £42.00",
                  "description": "World-class, dry and pale rosé with delicate red fruit and mineral notes (13% ABV).",
                  "markers": [
                      "Premium Pick",
                      "Sunset Favourite"
                  ],
                  "allergens": [
                      "Sulphites"
                  ]
              },
              {
                  "id": "item-wine-mirabeau",
                  "name": "Maison Mirabeau Azure, Provence (France)",
                  "price": "£12.50 / £16.50 / £44.00",
                  "description": "Stunningly fresh, aromatic and dry Provence rosé, ideal for sunset sipping (13% ABV).",
                  "markers": [
                      "Premium Pick"
                  ],
                  "allergens": [
                      "Sulphites"
                  ]
              },
              {
                  "id": "item-wine-malbec",
                  "name": "33 South, Malbec (Argentina)",
                  "price": "£7.50 / £9.00 / £24.00",
                  "description": "Rich, full-bodied red wine with dark plum, spice, and smooth oak (13.5% ABV).",
                  "markers": [
                      "Steak Match"
                  ],
                  "allergens": [
                      "Sulphites"
                  ]
              },
              {
                  "id": "item-wine-merlot",
                  "name": "Ladera Verde, Merlot (Chile)",
                  "price": "£7.50 / £9.00 / £24.00",
                  "description": "Smooth, medium-bodied red wine with soft plum and berry flavours (12.5% ABV).",
                  "markers": [],
                  "allergens": [
                      "Sulphites"
                  ]
              },
              {
                  "id": "item-wine-rioja",
                  "name": "Rioja Crianza, Rioja (Spain)",
                  "price": "£8.00 / £9.50 / £28.00",
                  "description": "Beautiful Spanish red, vanilla and toasted oak notes, smooth finish (13.5% ABV).",
                  "markers": [],
                  "allergens": [
                      "Sulphites"
                  ]
              },
              {
                  "id": "item-wine-prosecco",
                  "name": "Amori Prosecco Spumante (Italy)",
                  "price": "£7.50 / £24.00",
                  "description": "Crisp sparkling wine with fine bubbles and fresh apple aromas (11% ABV).",
                  "markers": [
                      "Sparkling"
                  ],
                  "allergens": [
                      "Sulphites"
                  ]
              },
              {
                  "id": "item-wine-moet",
                  "name": "Moët & Chandon Brut Champagne (France)",
                  "price": "£99.00",
                  "description": "Distinguished, elegant, and dry French champagne for celebrations (12% ABV).",
                  "markers": [
                      "Premium Luxury",
                      "Sparkling"
                  ],
                  "allergens": [
                      "Sulphites"
                  ]
              }
          ]
      },
      {
          "category": "Softs & Spirits",
          "description": "Selection of spirits and soft drinks available at the bar.",
          "items": [
              {
                  "id": "item-softs-generic",
                  "name": "Soft Drinks Selection",
                  "price": "Ask at bar",
                  "description": "Selection of soft and hot drinks available, including Coca-Cola, juices, tonic water, teas, and coffees.",
                  "markers": [],
                  "allergens": []
              },
              {
                  "id": "item-spirits-generic",
                  "name": "Spirits Selection",
                  "price": "Ask at bar",
                  "description": "Premium selection of gins, rums, vodkas, whiskeys, and liqueurs available at the bar.",
                  "markers": [],
                  "allergens": []
              }
          ]
      }
  ],
    pairings: pairings: [
    { "dishId": "item-moules", "dishName": "Moules marinière", "pairingType": "wine", "pairingName": "Ormarine, Picpoul de Pinet (France)", "description": "The crisp acidity and mineral undertones of Picpoul cut through the creaminess of the white wine and garlic sauce, highlighting the fresh Isle of Wight mussels.", "status": "proposed" },
    { "dishId": "item-calamari", "dishName": "Crispy Salt & Pepper Calamari", "pairingType": "wine", "pairingName": "Brightwater Bay, Sauvignon Blanc (SA)", "description": "Zesty tropical fruits and fresh grass notes complement the spicy kick of chilli and the salt & pepper batter.", "status": "proposed" },
    { "dishId": "item-sirloin", "dishName": "HH 10oz Sirloin", "pairingType": "wine", "pairingName": "32 South, Malbec (Argentina)", "description": "A full-bodied Malbec with plum and spice notes, providing structured tannins that pair beautifully with a medium-rare steak.", "status": "proposed" },
    { "dishId": "item-gambas", "dishName": "Gambas Pil Pil", "pairingType": "wine", "pairingName": "Amori, Pinot Grigio Blush (Italy)", "description": "A light, refreshing blush wine that balances the fiery chorizo heat and garlic butter richness without overpowering the prawns.", "status": "proposed" },
    { "dishId": "item-burger", "dishName": "HH 6oz Burger", "pairingType": "wine", "pairingName": "Ladera Verde, Merlot (Chile)", "description": "Smooth red fruits and soft tannins pair perfectly with grilled beef, pancetta, and sweet onion relish.", "status": "proposed" },
    { "dishId": "item-fish-chips", "dishName": "Fish & Chips", "pairingType": "beer", "pairingName": "Cruzcampo (Draught Beer, 4.4%)", "description": "A clean, crisp Spanish lager served ice-cold. The refreshing carbonation cleanses the palate after rich, crispy battered fish.", "status": "proposed" },
    { "dishId": "item-skewer", "dishName": "Malaysian Chicken Skewer", "pairingType": "beer", "pairingName": "Alpacalypse IPA (Draught Beer, 4.3%)", "description": "Hoppy and floral notes of local craft IPA cut through coconut and lemongrass aromatic spices.", "status": "proposed" },
    { "dishId": "item-meatballs", "dishName": "Oven Baked Meatballs", "pairingType": "wine", "pairingName": "Rioja Crianza, Rioja (Spain)", "description": "Medium-bodied with subtle oak and vanilla undertones, matching the baked garlic and red pepper tomato sauce.", "status": "proposed" }
  ],
  captions: [
    {
      "category": "Food Posts",
      "title": "Fresh Local Catch Features",
      "preferred": "Landed this morning, on your plate tonight. Our fresh local cod is double-battered, fried golden, and served with chunky chips right on the harbour wall. A Ryde Marina classic. 🐟✨\n\nBook your table: [Link]",
      "avoid": "Get our amazing Fish & Chips now! It is super cheap and delicious. Best food on the island! Buy 1 get 1 free. #food #yummy #cod #chips",
      "rationale": "Preferred tone focuses on origin, quality, and the marina setting (relaxed, local, premium). The 'Avoid' copy is overly promotional, loud, and feels like a fast-food franchise rather than an editorial coastal venue."
    },
    {
      "category": "Cocktails",
      "title": "Golden Hour Mojitos",
      "preferred": "Muddled lime, fresh garden mint, and premium white rum. Sip a classic Piña colada or a fresh Mojito as the sun slips below the Solent. Golden hour starts now at Ryde Marina. 🍹🌅",
      "avoid": "CHEAP DRINKS TONIGHT! Get wasted on Mojitos and Pina Coladas. Happy hour starts at 5. Best alcohol in town! #drinks #bar #party",
      "rationale": "Preferred copy paints a picture of sensory enjoyment and connects drinks to the sunset scenery. 'Avoid' copy promotes excessive drinking, uses low-rent phrasing ('cheap', 'get wasted'), and violates the premium brand positioning."
    },
    {
      "category": "Events",
      "title": "Live Acoustic Sessions",
      "preferred": "Unwind on the harbour wall with live acoustic sessions this Thursday. Ease into the weekend early with local sounds, fresh tapas, and waterfront views. Music begins at 6 PM. 🎸🌊",
      "avoid": "JAZZ EVENT ON THURSDAY! Loud music and heavy beats. Come party and dance all night long. Don't miss out! #livemusic #partytime",
      "rationale": "Preferred copy uses smooth, inviting words ('unwind', 'ease into', 'local sounds') that match a relaxed social environment. 'Avoid' copy uses high-intensity punctuation, caps lock, and exaggerates the volume/energy level."
    },
    {
      "category": "Group Bookings",
      "title": "Celebrations by the Water",
      "preferred": "Gather around the table for birthdays, family catch-ups, or corporate socials. With sharing boards, custom drinks packages, and the marina as your backdrop, let us host your next milestone. 🥂⚓️\n\nEnquire here: [Link]",
      "avoid": "BOOK YOUR WEDDING OR PARTY HERE! We fit 100 people. Cheap group deals. Inquire now or lose your slot.",
      "rationale": "Preferred copy focuses on hospitality, gathering, and the backdrop. It lists appropriate events without over-promising large-scale wedding services. 'Avoid' is high-pressure and transaction-oriented."
    },
    {
      "category": "Sundown Sessions",
      "title": "Sunset Vibe Announcements",
      "preferred": "The sky is turning orange, and the acoustic tunes are flowing. Our Sundown Sessions are running all weekend. Join us on the decking for ice-cold beers, fresh Rosé, and unmatched waterfront vibes. 🌅🎶",
      "avoid": "Sunset is at 8PM tonight! Come buy some food before the sun goes down! #sunset #isleofwight",
      "rationale": "Preferred copy describes the transition into evening (color, music, atmosphere) to create an experience. 'Avoid' is dry, purely informational, and sounds like a weather forecast."
    },
    {
      "category": "Weather Posts",
      "title": "Sunny Decking Weather",
      "preferred": "The Solent is flat, the yachts are sailing, and our deck is officially open. Grab a spot by the railings, soak up the sun, and enjoy a fresh Moules marinière with a glass of Picpoul de Pinet. ☀️⛵️",
      "avoid": "It's hot outside today. Come to Ryde Marina. We have shade and tables available.",
      "rationale": "Preferred copy ties the weather to specific sensory elements (flat Solent, yachts, cold wine, hot mussels) to create desire. 'Avoid' is flat and uninspiring."
    },
    {
      "category": "Call to Action (CTA)",
      "title": "Table Booking CTA",
      "preferred": "Book your harbour-side table: [Link]\nJoin us for sunsets & sharing plates: [Link]",
      "avoid": "CLICK HERE TO BUY A TABLE NOW!!! BOOK OR MISS OUT!!!",
      "rationale": "Preferred CTAs are direct, helpful, and describe what the customer will experience ('harbour-side table', 'sunsets & sharing plates'). 'Avoid' is aggressive, spammy, and cheapens the brand."
    }
  ]
};

// Compliance Auditor Checklist Items
const ChecklistItems = [
  {
    category: "Brand Standards",
    items: [
      { id: "chk-brand-logo", text: "Uses the official Primary Logo or Badge Seal", desc: "No unofficial, distorted, or outdated logos." },
      { id: "chk-brand-colors", text: "Applies Navy (#0E1A2B) or Ivory (#F5F1E8) base surfaces", desc: "Prevents high-saturation gradient background pollution." },
      { id: "chk-brand-fonts", text: "Playfair Display for headers, Montserrat for UI and body text", desc: "Maintains clear hierarchy. Script is restricted to decorative details." }
    ]
  },
  {
    category: "Copy & Voice",
    items: [
      { id: "chk-copy-spelling", text: "Uses correct British English spelling (Colour, Flavour, Centre)", desc: "Essential for local island authenticity." },
      { id: "chk-copy-names", text: "Correct spelling for Moules marinière, Piña colada, Rosé", desc: "Mandatory accents and lowercases must be preserved." },
      { id: "chk-copy-tone", text: "Tone is relaxed, premium, and coastal. Avoids aggressive selling.", desc: "No spammy CTAs or 'cheap/heavy discount' promotions." }
    ]
  },
  {
    category: "Photography Direction",
    items: [
      { id: "chk-photo-horizon", text: "The horizon line is strictly level and flat", desc: "Adjust crooked marina shots before publication." },
      { id: "chk-photo-labels", text: "Every image is tagged (Reference, Concept, Proposed, Approved)", desc: "Prevents generated concepts being mistaken for live venue assets." },
      { id: "chk-photo-light", text: "Emphasises natural daylight, golden sunset light, and warm string lights", desc: "No harsh flash photography or overly cold styling." }
    ]
  },
  {
    category: "Accessibility & Technical",
    items: [
      { id: "chk-acc-contrast", text: "Color combinations achieve WCAG AA contrast (4.5:1 minimum)", desc: "Audit text overlays before exporting social posts." },
      { id: "chk-acc-alt", text: "All interactive visuals carry descriptive alternative alt text", desc: "Crucial for screen-readers and SEO indexing." },
      { id: "chk-tech-specs", text: "Dimensions match export cheat sheet (e.g. 1080x1350 for IG portrait)", desc: "Prevents blurred crops or cut-off templates." }
    ]
  }
];

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  detectExecutionMode();
  loadDataAndStart();
  setupSmoothScrolling();
});

// Mode Detection: file:// mode checker (graceful degradation)
function detectExecutionMode() {
  const isLocal = window.location.protocol === "file:";
  BrandState.isLocalFileMode = isLocal;
  
  const banner = document.getElementById("file-mode-banner");
  if (isLocal && banner) {
    banner.style.display = "block";
    console.warn("Harbour House Showroom running in basic file:// mode. Dynamic fetch is disabled; using embedded fallback state.");
  }
}

async function loadSiteSettings() {
  if (BrandState.isLocalFileMode) {
    return {
      "paymentReceived": false,
      "watermarkText": "ISLECONNECT — CONCEPT PREVIEW",
      "watermarkSubtext": "Licensed artwork supplied following final approval and payment."
    };
  }
  try {
    const response = await fetch("data/site-settings.json");
    if (!response.ok) {
      throw new Error("Unable to load site settings.");
    }
    return await response.json();
  } catch (error) {
    console.warn("Using default settings due to: ", error);
    return {
      "paymentReceived": false,
      "watermarkText": "ISLECONNECT — CONCEPT PREVIEW",
      "watermarkSubtext": "Licensed artwork supplied following final approval and payment."
    };
  }
}

function applyAssetWatermarks() {
  const protectedAssets = document.querySelectorAll(
    ".watermarked-asset:not([data-watermark-applied])"
  );

  protectedAssets.forEach((asset) => {
    const watermark = document.createElement("div");
    watermark.className = "asset-watermark";
    watermark.setAttribute("aria-hidden", "true");

    watermark.innerHTML = `
      <span class="watermark-brand">${SiteSettings.watermarkText}</span>
      <span class="watermark-note">${SiteSettings.watermarkSubtext}</span>
    `;

    asset.appendChild(watermark);
    asset.dataset.watermarkApplied = "true";
  });
}

// Load JSON data files asynchronously, or fall back if offline/file mode
async function loadDataAndStart() {
  SiteSettings = await loadSiteSettings();
  
  if (BrandState.isLocalFileMode) {
    // Immediate fallback load
    BrandState.images = FallbackData.images;
    BrandState.images.forEach(img => {
      if (img.status === "concept" || img.status === "proposed") {
        img.watermark = true;
      }
    });
    BrandState.menu = FallbackData.menu;
    BrandState.pairings = FallbackData.pairings;
    BrandState.captions = FallbackData.captions;
    startControllers();
  } else {
    try {
      // Async fetching from server directories
      const [imagesRes, menuRes, pairingsRes, captionsRes] = await Promise.all([
        fetch("data/images.json").then(r => r.json()),
        fetch("data/menu.json").then(r => r.json()),
        fetch("data/pairings.json").then(r => r.json()),
        fetch("data/captions.json").then(r => r.json())
      ]);

      BrandState.images = imagesRes;
      BrandState.menu = menuRes;
      BrandState.pairings = pairingsRes;
      BrandState.captions = captionsRes;
      
      startControllers();
    } catch (err) {
      console.error("Failed to load JSON data manifests. Falling back to embedded brand data.", err);
      BrandState.images = FallbackData.images;
      BrandState.images.forEach(img => {
        if (img.status === "concept" || img.status === "proposed") {
          img.watermark = true;
        }
      });
      BrandState.menu = FallbackData.menu;
      BrandState.pairings = FallbackData.pairings;
      BrandState.captions = FallbackData.captions;
      startControllers();
    }
  }
}

// Start all modular UI controllers
function startControllers() {
  initLogoSelector();
  initColorPalette();
  initMenuExplorer();
  initPairingAssistant();
  initGroupSimulator();
  initSocialStudio();
  initAssetLibrary();
  initComplianceAuditor();
  initAccessibilitySettings();
}

// Smooth scrolling and navigation link tracking
function setupSmoothScrolling() {
  const links = document.querySelectorAll("#menu-nav-links a");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId.startsWith("#")) {
        e.preventDefault();
        const el = document.querySelector(targetId);
        if (el) {
          window.scrollTo({
            top: el.offsetTop - 75,
            behavior: "smooth"
          });
        }
        
        links.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  });

  // Track active section on scroll
  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + 100;
    const sections = document.querySelectorAll("section");
    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop && scrollPos < (sec.offsetTop + sec.offsetHeight)) {
        const id = sec.getAttribute("id");
        links.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  });
}

/* -------------------------------------------------------------
   1. Logo Selector Controller
   ------------------------------------------------------------- */
function initLogoSelector() {
  const btns = document.querySelectorAll(".logo-toggle-btn");
  const img = document.getElementById("selected-logo-img");

  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const logoName = btn.getAttribute("data-logo");
      img.src = `assets/brand/${logoName}.svg`;
      img.alt = `Harbour House ${btn.textContent}`;
    });
  });
}

/* -------------------------------------------------------------
   2. Color Palette Controller
   ------------------------------------------------------------- */
function initColorPalette() {
  const container = document.getElementById("color-palette-container");
  if (!container) return;

  const colors = [
    { name: "Navy", hex: "#0E1A2B", rgb: "rgb(14, 26, 43)", hsl: "hsl(215, 51%, 11%)", use: "Primary background, text headings." },
    { name: "Ivory", hex: "#F5F1E8", rgb: "rgb(245, 241, 232)", hsl: "hsl(43, 32%, 94%)", use: "Primary canvas backdrop, body backgrounds." },
    { name: "Sand", hex: "#DCC9A6", rgb: "rgb(220, 201, 166)", hsl: "hsl(40, 41%, 76%)", use: "Dividers, thin borders, structural boxes." },
    { name: "Gold", hex: "#C9A35A", rgb: "rgb(201, 163, 90)", hsl: "hsl(39, 52%, 57%)", use: "Primary accent, links, buttons, highlight borders." },
    { name: "Coral", hex: "#E07A5F", rgb: "rgb(224, 122, 95)", hsl: "hsl(13, 68%, 62%)", use: "Warm sunset highlight fills. (Not for text)." },
    { name: "Berry", hex: "#D40087", rgb: "rgb(212, 0, 135)", hsl: "hsl(322, 100%, 42%)", use: "Live music acoustic sessions & events campaign accent." },
    { name: "Orange", hex: "#FF9A3C", rgb: "rgb(255, 154, 60)", hsl: "hsl(29, 100%, 62%)", use: "Summer special announcements accent." },
    { name: "Sage", hex: "#7C8F73", rgb: "rgb(124, 143, 115)", hsl: "hsl(100, 12%, 51%)", use: "Local organic, seafood sourcing, green credentials accent." }
  ];

  container.innerHTML = colors.map(col => `
    <div class="color-swatch" style="cursor: pointer;" data-hex="${col.hex}">
      <div class="swatch-fill" style="background-color: ${col.hex};"></div>
      <div class="swatch-info">
        <div class="swatch-name">${col.name}</div>
        <div class="swatch-hex">${col.hex}</div>
        <div style="font-size: 0.65rem; color: #666; margin-top: 3px;">${col.use}</div>
      </div>
    </div>
  `).join("");

  // Copy hex code on click
  container.querySelectorAll(".color-swatch").forEach(swatch => {
    swatch.addEventListener("click", () => {
      const hex = swatch.getAttribute("data-hex");
      navigator.clipboard.writeText(hex).then(() => {
        showFeedbackToast(`Copied ${hex} to clipboard!`);
      }).catch(err => {
        console.error("Clipboard copy failed.", err);
      });
    });
  });
}

function showFeedbackToast(msg) {
  // Remove existing
  const old = document.getElementById("toast-msg");
  if (old) old.remove();

  const toast = document.createElement("div");
  toast.id = "toast-msg";
  toast.style.cssText = "position:fixed; bottom: 20px; right: 20px; background-color: #0E1A2B; color: #F5F1E8; padding: 10px 20px; border-radius: 4px; border: 1px solid #C9A35A; z-index: 2500; font-size: 0.85rem; box-shadow: 0 4px 12px rgba(0,0,0,0.25);";
  toast.textContent = msg;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2500);
}

/* -------------------------------------------------------------
   3. Menu Explorer Controller
   ------------------------------------------------------------- */
function initMenuExplorer() {
  const tabContainer = document.getElementById("menu-categories-tabs");
  const itemsContainer = document.getElementById("menu-items-list-container");
  if (!tabContainer || !itemsContainer) return;

  const categories = BrandState.menu;

  // Render Tabs
  tabContainer.innerHTML = categories.map((cat, idx) => `
    <button class="menu-tab-btn ${idx === 0 ? 'active' : ''}" role="tab" aria-selected="${idx === 0 ? 'true' : 'false'}" data-index="${idx}">
      ${cat.category}
    </button>
  `).join("");

  // Render Items for first category
  renderCategoryItems(0);

  // Tab Events
  tabContainer.querySelectorAll(".menu-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      tabContainer.querySelectorAll(".menu-tab-btn").forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      const idx = parseInt(btn.getAttribute("data-index"), 10);
      renderCategoryItems(idx);
    });
  });

  function renderCategoryItems(catIdx) {
    const cat = categories[catIdx];
    if (!cat) return;

    itemsContainer.innerHTML = cat.items.map(item => `
      <div class="menu-item-card" data-id="${item.id}">
        <div class="menu-item-header">
          <div class="menu-item-name">${item.name}</div>
          <div class="menu-item-price">£${item.price.toFixed(2)}</div>
        </div>
        <div class="menu-item-desc">${item.description}</div>
        ${item.markers && item.markers.length ? `
          <div class="item-markers">
            ${item.markers.map(m => `<span class="item-marker-badge">${m}</span>`).join("")}
          </div>
        ` : ''}
        ${item.allergens && item.allergens.length ? `
          <div class="item-allergens">Allergens: ${item.allergens.join(", ")}</div>
        ` : ''}
      </div>
    `).join("");
  }
}

/* -------------------------------------------------------------
   4. Food-and-Drink Pairing Assistant Controller
   ------------------------------------------------------------- */
function initPairingAssistant() {
  const select = document.getElementById("dish-pairing-select");
  const resultBox = document.getElementById("pairing-results-container");
  const dishName = document.getElementById("pair-dish-name");
  const beverageName = document.getElementById("pair-beverage-name");
  const beverageDesc = document.getElementById("pair-beverage-desc");
  
  if (!select || !resultBox) return;

  // Flatten all menu items to populate select
  const allDishes = [];
  BrandState.menu.forEach(cat => {
    // Only fetch food categories (skip Alongside sides or kids where pairings aren't set)
    if (cat.category !== "Alongside" && cat.category !== "Little Sailors") {
      cat.items.forEach(item => {
        allDishes.push({ id: item.id, name: item.name });
      });
    }
  });

  select.innerHTML = `<option value="">-- Choose a dish --</option>` + allDishes.map(d => `
    <option value="${d.id}">${d.name}</option>
  `).join("");

  select.addEventListener("change", () => {
    const selectedId = select.value;
    if (!selectedId) {
      resultBox.style.display = "none";
      return;
    }

    const match = BrandState.pairings.find(p => p.dishId === selectedId);
    if (match) {
      dishName.textContent = match.dishName;
      beverageName.textContent = match.pairingName;
      beverageDesc.textContent = match.description;
      resultBox.style.display = "block";
    } else {
      // Default fallback if no specific pairing is loaded
      dishName.textContent = select.options[select.selectedIndex].text;
      beverageName.textContent = "Picpoul de Pinet or Local Draught Lager";
      beverageDesc.textContent = "A crisp, clean beverage is recommended to complement this light seafood or sharing plate. Enjoy by the sea.";
      resultBox.style.display = "block";
    }
  });
}

/* -------------------------------------------------------------
   5. Group Journey Booking Simulator Controller
   ------------------------------------------------------------- */
function initGroupSimulator() {
  const occasionContainer = document.getElementById("occasion-options-container");
  const styleContainer = document.getElementById("style-options-container");
  const summaryText = document.getElementById("journey-summary-text");
  const copyBtn = document.getElementById("btn-copy-summary");

  if (!occasionContainer || !styleContainer || !summaryText) return;

  const occasions = [
    { value: "birthday", label: "Birthday" },
    { value: "family", label: "Family Gathering" },
    { value: "team", label: "Team Social" },
    { value: "anniversary", label: "Anniversary" },
    { value: "engagement", label: "Engagement" },
    { value: "informal", label: "Informal Celebration" },
    { value: "other", label: "Other Celebration" }
  ];

  const partyOptions = [
    { step: "size", value: "2-6", label: "Small (2 - 6)" },
    { step: "size", value: "7-15", label: "Medium (7 - 15)" },
    { step: "size", value: "16+", label: "Large Group (16+)" },
    { step: "food", value: "sharing", label: "Sharing Tapas Plates" },
    { step: "food", value: "mains", label: "Seafood Mains" },
    { step: "drinks", value: "cocktail", label: "Cocktail Package" },
    { step: "drinks", value: "beer-wine", label: "Beer & Wine cellar" },
    { step: "time", value: "sunset", label: "Sunset (Golden Hour)" },
    { step: "time", value: "evening", label: "Evening (Acoustic sessions)" }
  ];

  // Render Occasions
  occasionContainer.innerHTML = occasions.map(occ => `
    <div class="step-option-card" data-step="occasion" data-value="${occ.value}">
      ${occ.label}
    </div>
  `).join("");

  // Render Party Options (Grouped logically)
  styleContainer.innerHTML = `
    <div style="grid-column: 1 / -1; font-weight: bold; margin-top: 5px; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; color: var(--gold);">Group Size</div>
    ${partyOptions.filter(o => o.step === "size").map(o => `<div class="step-option-card" data-step="size" data-value="${o.value}">${o.label}</div>`).join("")}
    
    <div style="grid-column: 1 / -1; font-weight: bold; margin-top: 10px; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; color: var(--gold);">Food Style</div>
    ${partyOptions.filter(o => o.step === "food").map(o => `<div class="step-option-card" data-step="food" data-value="${o.value}">${o.label}</div>`).join("")}
    
    <div style="grid-column: 1 / -1; font-weight: bold; margin-top: 10px; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; color: var(--gold);">Drinks Package</div>
    ${partyOptions.filter(o => o.step === "drinks").map(o => `<div class="step-option-card" data-step="drinks" data-value="${o.value}">${o.label}</div>`).join("")}
    
    <div style="grid-column: 1 / -1; font-weight: bold; margin-top: 10px; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; color: var(--gold);">Preferred Timing</div>
    ${partyOptions.filter(o => o.step === "time").map(o => `<div class="step-option-card" data-step="time" data-value="${o.value}">${o.label}</div>`).join("")}
  `;

  // Bind clicks
  document.querySelectorAll("#group-simulator-panel .step-option-card").forEach(card => {
    card.addEventListener("click", () => {
      const step = card.getAttribute("data-step");
      const val = card.getAttribute("data-value");

      // Deselect siblings
      document.querySelectorAll(`#group-simulator-panel .step-option-card[data-step="${step}"]`).forEach(c => {
        c.classList.remove("selected");
      });

      card.classList.add("selected");
      BrandState.selectedJourney[step] = val;

      updateJourneySummary();
    });
  });

  function updateJourneySummary() {
    const j = BrandState.selectedJourney;
    if (!j.occasion || !j.size || !j.food || !j.drinks || !j.time) {
      summaryText.textContent = "Select one option from each section above to compile the sheet...";
      return;
    }

    const output = `HARBOUR HOUSE GROUP ENQUIRY
============================
Occasion:          ${capitalize(j.occasion)}
Party Size:        ${j.size} guests
Food Style:        ${j.food === "sharing" ? "Sharing Tapas Plates" : "Seafood Mains"}
Drinks Package:    ${j.drinks === "cocktail" ? "Cocktail Package" : "Beer & Wine Cellar Selection"}
Preferred Time:    ${j.time === "sunset" ? "Sunset (Golden Hour)" : "Evening (Acoustic sessions)"}
Location:          Ryde Marina (Waterfront Decking Requested)
============================
Status:            Simulated Summary Generated
This demonstration does not submit or confirm a booking.`;

    summaryText.textContent = output;
  }

  copyBtn.addEventListener("click", () => {
    const text = summaryText.textContent;
    if (text.startsWith("Select")) {
      showFeedbackToast("Please select all options before copying!");
      return;
    }

    navigator.clipboard.writeText(text).then(() => {
      showFeedbackToast("Copied booking summary to clipboard!");
    }).catch(err => {
      console.error("Clipboard copy failed.", err);
    });
  });

  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

/* -------------------------------------------------------------
   6. Social Media Studio Controller
   ------------------------------------------------------------- */
function initSocialStudio() {
  const imageSelect = document.getElementById("canvas-image-select");
  const ratioBtns = document.querySelectorAll(".canvas-ratio-btn");
  const captionSelect = document.getElementById("caption-category-select");
  const captionDisplay = document.getElementById("selected-caption-box");
  const copyCaptionBtn = document.getElementById("btn-copy-caption");
  
  const simFrame = document.getElementById("canvas-simulator-frame");
  const simImg = document.getElementById("canvas-simulated-img");
  const simCaptionOverlay = document.getElementById("canvas-caption-overlay-text");

  // Grid Toggles
  const thirdsChk = document.getElementById("toggle-guide-thirds");
  const horizonChk = document.getElementById("toggle-guide-horizon");
  const safeChk = document.getElementById("toggle-guide-safe");
  const focalChk = document.getElementById("toggle-guide-focal");

  const thirdsEl = document.getElementById("guide-grid-element");
  const horizonEl = document.getElementById("guide-horizon-element");
  const safeEl = document.getElementById("guide-safe-element");
  const focalEl = document.getElementById("guide-focal-element");
  const overlayWrapper = document.getElementById("canvas-overlay-wrapper");

  if (!imageSelect || !simFrame || !simImg) return;

  // Load Images into dropdown
  const conceptImages = BrandState.images;
  imageSelect.innerHTML = conceptImages.map(img => `
    <option value="${img.src}">${img.title} (${capitalize(img.status)})</option>
  `).join("");

  // Select first item
  if (conceptImages.length > 0) {
    imageSelect.value = conceptImages[8].src; // Selects 'social_find_us.png' as nice default
    simImg.src = conceptImages[8].src;
    updateSimulatedImageProtection();
  }

  // Load Captions into dropdown
  captionSelect.innerHTML = BrandState.captions.map((cap, idx) => `
    <option value="${idx}">${cap.category} - ${cap.title}</option>
  `).join("");

  updateSelectedCaption(0);

  function updateSimulatedImageProtection() {
    const currentSrc = imageSelect.value;
    const currentAsset = BrandState.images.find(img => img.src === currentSrc);
    const shouldProtect = currentAsset && currentAsset.watermark && !SiteSettings.paymentReceived;
    
    if (simFrame) {
      simFrame.classList.toggle("watermarked-asset", shouldProtect);
      if (shouldProtect) {
        simFrame.removeAttribute("data-watermark-applied");
        const oldWM = simFrame.querySelector(".asset-watermark");
        if (oldWM) oldWM.remove();
      } else {
        const oldWM = simFrame.querySelector(".asset-watermark");
        if (oldWM) oldWM.remove();
      }
    }
    applyAssetWatermarks();
  }

  // Bind Control Events
  imageSelect.addEventListener("change", () => {
    simImg.src = imageSelect.value;
    updateSimulatedImageProtection();
  });

  const studioPrevBtn = document.getElementById("btn-studio-prev");
  const studioNextBtn = document.getElementById("btn-studio-next");
  if (studioPrevBtn && studioNextBtn) {
    studioPrevBtn.addEventListener("click", () => {
      let currentIdx = imageSelect.selectedIndex;
      currentIdx = (currentIdx - 1 + imageSelect.options.length) % imageSelect.options.length;
      imageSelect.selectedIndex = currentIdx;
      simImg.src = imageSelect.value;
      updateSimulatedImageProtection();
    });

    studioNextBtn.addEventListener("click", () => {
      let currentIdx = imageSelect.selectedIndex;
      currentIdx = (currentIdx + 1) % imageSelect.options.length;
      imageSelect.selectedIndex = currentIdx;
      simImg.src = imageSelect.value;
      updateSimulatedImageProtection();
    });
  }

  ratioBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      ratioBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const ratio = btn.getAttribute("data-ratio");
      simFrame.className = `simulator-frame ratio-${ratio}`;
    });
  });

  captionSelect.addEventListener("change", () => {
    updateSelectedCaption(parseInt(captionSelect.value, 10));
  });

  copyCaptionBtn.addEventListener("click", () => {
    const text = captionDisplay.textContent;
    navigator.clipboard.writeText(text).then(() => {
      showFeedbackToast("Copied caption to clipboard!");
    }).catch(err => {
      console.error("Clipboard copy failed.", err);
    });
  });

  // Safe Overlays Toggle
  [thirdsChk, horizonChk, safeChk, focalChk].forEach(chk => {
    chk.addEventListener("change", () => {
      // If any is checked, show wrapper
      const anyChecked = thirdsChk.checked || horizonChk.checked || safeChk.checked || focalChk.checked;
      overlayWrapper.style.display = anyChecked ? "block" : "none";

      thirdsEl.style.display = thirdsChk.checked ? "grid" : "none";
      horizonEl.style.display = horizonChk.checked ? "block" : "none";
      safeEl.style.display = safeChk.checked ? "block" : "none";
      focalEl.style.display = focalChk.checked ? "block" : "none";
    });
  });

  function updateSelectedCaption(idx) {
    const cap = BrandState.captions[idx];
    if (cap) {
      captionDisplay.textContent = cap.preferred;
      simCaptionOverlay.textContent = cap.preferred;
    }
  }

  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

/* -------------------------------------------------------------
   7. Photography & Asset Library Controller
   ------------------------------------------------------------- */
function initAssetLibrary() {
  const grid = document.getElementById("asset-library-grid-container");
  const filterBtns = document.querySelectorAll(".filter-tab-btn");
  if (!grid) return;

  // Render Grid
  renderGridItems("all");

  // Bind filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      renderGridItems(filter);
    });
  });

  // Lightbox detail controls
  const lightbox = document.getElementById("image-lightbox-popup");
  const closeBtn = document.getElementById("btn-close-lightbox");
  const fullImg = document.getElementById("lightbox-fullres-img");
  const lbBadge = document.getElementById("lightbox-status-badge");
  const lbTitle = document.getElementById("lightbox-title-text");
  const lbDesc = document.getElementById("lightbox-desc-text");
  const lbWhy = document.getElementById("lightbox-why-works-text");
  const lbUsage = document.getElementById("lightbox-usage-tags-container");

  let activeLightboxList = [];
  let activeLightboxIndex = -1;

  function showLightboxAsset(index) {
    if (activeLightboxList.length === 0) return;
    if (index < 0) index = activeLightboxList.length - 1;
    if (index >= activeLightboxList.length) index = 0;

    activeLightboxIndex = index;
    const asset = activeLightboxList[activeLightboxIndex];
    if (!asset) return;

    fullImg.src = asset.src;
    fullImg.alt = asset.alt;

    lbBadge.className = `asset-badge badge-${asset.status}`;
    lbBadge.textContent = asset.status;

    lbTitle.textContent = asset.title;
    lbDesc.textContent = asset.alt;
    lbWhy.textContent = asset.whyItWorks;

    lbUsage.innerHTML = asset.usage.map(u => `
      <span class="meta-tag">${u}</span>
    `).join("");

    const shouldProtect = asset.watermark && !SiteSettings.paymentReceived;
    const mediaWrapper = document.querySelector(".lightbox-img-area");
    if (mediaWrapper) {
      mediaWrapper.classList.toggle("watermarked-asset", shouldProtect);
      if (shouldProtect) {
        mediaWrapper.removeAttribute("data-watermark-applied");
        const oldWM = mediaWrapper.querySelector(".asset-watermark");
        if (oldWM) oldWM.remove();
      } else {
        const oldWM = mediaWrapper.querySelector(".asset-watermark");
        if (oldWM) oldWM.remove();
      }
    }

    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden"; // Stop scrolling background
    applyAssetWatermarks();
  }

  // Grid Image click opens lightbox
  grid.addEventListener("click", (e) => {
    const imgEl = e.target.closest(".asset-img-container");
    if (!imgEl) return;

    const assetId = imgEl.getAttribute("data-id");
    const activeFilter = document.querySelector(".filter-tab-btn.active")?.getAttribute("data-filter") || "all";

    let items = BrandState.images;
    if (activeFilter !== "all") {
      items = BrandState.images.filter(img => img.status === activeFilter);
    }
    activeLightboxList = items;
    const idx = activeLightboxList.findIndex(img => img.id === assetId);
    if (idx !== -1) {
      showLightboxAsset(idx);
    }
  });

  // Reference Menu Images in Section 2 click opens lightbox
  document.querySelectorAll(".place-card img").forEach(img => {
    img.addEventListener("click", () => {
      const assetId = img.getAttribute("data-id");
      activeLightboxList = BrandState.images.filter(item => item.status === "reference");
      const idx = activeLightboxList.findIndex(item => item.id === assetId);
      if (idx !== -1) {
        showLightboxAsset(idx);
      }
    });
  });

  // Lightbox navigation button events
  const lbPrevBtn = document.getElementById("btn-lightbox-prev");
  const lbNextBtn = document.getElementById("btn-lightbox-next");
  if (lbPrevBtn) {
    lbPrevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showLightboxAsset(activeLightboxIndex - 1);
    });
  }
  if (lbNextBtn) {
    lbNextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showLightboxAsset(activeLightboxIndex + 1);
    });
  }

  // Close Lightbox
  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard events: Escape & arrow keys
  window.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        showLightboxAsset(activeLightboxIndex - 1);
      } else if (e.key === "ArrowRight") {
        showLightboxAsset(activeLightboxIndex + 1);
      }
    }
  });

  function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
  }

  function renderGridItems(filter) {
    let items = BrandState.images;
    if (filter !== "all") {
      items = BrandState.images.filter(img => img.status === filter);
    }

    grid.innerHTML = items.map(img => {
      const shouldProtect = img.watermark && !SiteSettings.paymentReceived;
      return `
        <div class="asset-card" data-status="${img.status}">
          <div class="asset-img-container ${shouldProtect ? 'watermarked-asset' : ''}" data-id="${img.id}">
            <span class="asset-badge badge-${img.status}">${img.status}</span>
            <img src="${img.thumbnail}" alt="${img.title}" loading="lazy">
          </div>
          <div class="asset-info">
            <div class="asset-title">${img.title}</div>
            <div class="asset-desc">${truncate(img.alt, 80)}</div>
            <div class="asset-why-works">"${truncate(img.whyItWorks, 90)}"</div>
            <div class="asset-meta-tags">
              ${img.usage.map(tag => `<span class="meta-tag">${tag}</span>`).join("")}
            </div>
          </div>
        </div>
      `;
    }).join("");

    applyAssetWatermarks();
  }

  function truncate(str, len) {
    if (!str) return '';
    return str.length > len ? str.substring(0, len) + "..." : str;
  }
}

/* -------------------------------------------------------------
   8. Quality Control Auditor Checklist Controller
   ------------------------------------------------------------- */
function initComplianceAuditor() {
  const container = document.getElementById("compliance-checklist-container");
  if (!container) return;

  // Render Auditor
  container.innerHTML = ChecklistItems.map((cat, catIdx) => `
    <div class="checklist-category-box">
      <div class="checklist-title-bar">${cat.category}</div>
      ${cat.items.map((item, itemIdx) => {
        const key = `audit-${item.id}`;
        const checked = localStorage.getItem(key) === "true" ? "checked" : "";
        
        return `
          <div class="checklist-item">
            <div class="checklist-checkbox-container">
              <input type="checkbox" id="${item.id}" data-key="${key}" ${checked}>
            </div>
            <div>
              <label for="${item.id}" class="checklist-label">
                <strong>${item.text}</strong>
              </label>
              <div class="checklist-desc">${item.desc}</div>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `).join("");

  // Save changes to localStorage
  container.querySelectorAll("input[type='checkbox']").forEach(chk => {
    chk.addEventListener("change", () => {
      const key = chk.getAttribute("data-key");
      localStorage.setItem(key, chk.checked);
      
      // Flash success visual cues
      if (chk.checked) {
        chk.closest(".checklist-item").style.backgroundColor = "rgba(46,125,50,0.04)";
      } else {
        chk.closest(".checklist-item").style.backgroundColor = "transparent";
      }
    });
    
    // Initial color flash on load
    if (chk.checked) {
      chk.closest(".checklist-item").style.backgroundColor = "rgba(46,125,50,0.04)";
    }
  });
}

/* -------------------------------------------------------------
   9. Accessibility Settings Controller (reduced motion/high contrast)
   ------------------------------------------------------------- */
function initAccessibilitySettings() {
  const contrastToggle = document.getElementById("toggle-high-contrast");
  const quickContrast = document.getElementById("quick-contrast-toggle");
  const motionToggle = document.getElementById("toggle-reduced-motion");

  if (!contrastToggle || !motionToggle) return;

  // Load Initial Settings
  const contrastState = localStorage.getItem("contrast-preference") === "true";
  const motionState = localStorage.getItem("motion-preference") === "true";

  contrastToggle.checked = contrastState;
  quickContrast.classList.toggle("active", contrastState);
  document.body.classList.toggle("high-contrast", contrastState);

  motionToggle.checked = motionState;
  document.body.classList.toggle("reduced-motion", motionState);

  // Bind Events
  contrastToggle.addEventListener("change", () => {
    const val = contrastToggle.checked;
    localStorage.setItem("contrast-preference", val);
    document.body.classList.toggle("high-contrast", val);
    quickContrast.classList.toggle("active", val);
  });

  quickContrast.addEventListener("click", () => {
    const val = !contrastToggle.checked;
    contrastToggle.checked = val;
    localStorage.setItem("contrast-preference", val);
    document.body.classList.toggle("high-contrast", val);
    quickContrast.classList.toggle("active", val);
  });

  motionToggle.addEventListener("change", () => {
    const val = motionToggle.checked;
    localStorage.setItem("motion-preference", val);
    document.body.classList.toggle("reduced-motion", val);
  });
}
