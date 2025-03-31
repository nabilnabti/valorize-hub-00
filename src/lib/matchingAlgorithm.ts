
// Matching score calculation
export const calculateMatchingScore = (
  product: any,
  buyer: any
): { score: number; reasons: string[] } => {
  let score = 0;
  const reasons: string[] = [];

  // Category matching (0-40 points)
  if (product.category === buyer.preferredCategory) {
    score += 40;
    reasons.push("Catégorie parfaitement adaptée");
  } else if (buyer.alternativeCategories?.includes(product.category)) {
    score += 20;
    reasons.push("Catégorie alternative acceptable");
  }

  // Location proximity (0-20 points)
  if (product.location === buyer.location) {
    score += 20;
    reasons.push("Proximité géographique idéale");
  } else if (calculateDistance(product.location, buyer.location) < 100) {
    score += 10;
    reasons.push("Distance raisonnable");
  }

  // Price range (0-30 points)
  if (product.price <= buyer.maxPrice && product.price >= buyer.minPrice) {
    score += 30;
    reasons.push("Prix dans la fourchette idéale");
  } else if (product.price <= buyer.maxPrice * 1.2) {
    score += 15;
    reasons.push("Prix légèrement au-dessus des attentes");
  }

  // Volume needed (0-10 points)
  if (product.quantity >= buyer.minQuantity) {
    score += 10;
    reasons.push("Quantité suffisante");
  } else if (product.quantity >= buyer.minQuantity * 0.8) {
    score += 5;
    reasons.push("Quantité proche du minimum requis");
  }

  return { score, reasons };
};

// Mock function for calculating distance between locations
const calculateDistance = (locationA: string, locationB: string): number => {
  // In a real implementation, this would use geocoding and actual distance calculation
  const locations: Record<string, {lat: number, lng: number}> = {
    "Paris": {lat: 48.8566, lng: 2.3522},
    "Lyon": {lat: 45.7578, lng: 4.8320},
    "Marseille": {lat: 43.2965, lng: 5.3698},
    "Bordeaux": {lat: 44.8378, lng: -0.5792},
    "Lille": {lat: 50.6292, lng: 3.0573},
  };

  if (!locations[locationA] || !locations[locationB]) return 500; // Default large distance

  const latA = locations[locationA].lat;
  const lngA = locations[locationA].lng;
  const latB = locations[locationB].lat;
  const lngB = locations[locationB].lng;
  
  // Haversine formula for distance calculation
  const R = 6371; // Earth radius in km
  const dLat = (latB - latA) * Math.PI / 180;
  const dLng = (lngB - lngA) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(latA * Math.PI / 180) * Math.cos(latB * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  return distance;
};

// Sales prediction algorithm
export const predictSalesProbability = (matchScore: number, marketTrends: any): {
  probability: number;
  estimatedTimeframe: string;
  potentialValue: number;
} => {
  // Base probability from match score (0-100%)
  let probability = matchScore;
  
  // Adjust based on market trends
  if (marketTrends.demandLevel === 'high') {
    probability += 15;
  } else if (marketTrends.demandLevel === 'low') {
    probability -= 15;
  }
  
  // Cap probability between 0% and 100%
  probability = Math.min(100, Math.max(0, probability));
  
  // Estimate timeframe based on probability
  let estimatedTimeframe = "";
  if (probability > 80) {
    estimatedTimeframe = "< 1 mois";
  } else if (probability > 60) {
    estimatedTimeframe = "1-3 mois";
  } else if (probability > 40) {
    estimatedTimeframe = "3-6 mois";
  } else {
    estimatedTimeframe = "> 6 mois";
  }
  
  // Calculate potential value
  const potentialValue = marketTrends.averagePrice * (probability / 100);
  
  return { probability, estimatedTimeframe, potentialValue };
};

// Sample data for testing
export const sampleProducts = [
  {
    id: 1,
    name: "Acier inoxydable 304",
    category: "Matières premières",
    description: "Stock excédentaire de qualité industrielle",
    price: 50, // prix par kg
    quantity: 250, // kg
    location: "Lyon",
    status: "Excédentaire"
  },
  {
    id: 2,
    name: "Composants électroniques XB42",
    category: "Électronique",
    description: "Composants obsolètes pour ancienne gamme de produits",
    price: 40, // prix par unité
    quantity: 180, // unités
    location: "Paris",
    status: "Obsolète"
  },
  {
    id: 3,
    name: "Connecteurs RJ45 renforcés",
    category: "Électronique",
    description: "Stock excédentaire pour projets réseau",
    price: 5, // prix par unité
    quantity: 750, // unités
    location: "Marseille",
    status: "Excédentaire"
  },
  {
    id: 4,
    name: "Carton triple cannelure",
    category: "Emballage",
    description: "Emballages peu utilisés",
    price: 6, // prix par unité
    quantity: 500, // unités
    location: "Bordeaux",
    status: "Peu utilisé"
  },
  {
    id: 5,
    name: "Granulés plastique recyclé",
    category: "Matières premières",
    description: "Plastique recyclé de haute qualité",
    price: 25, // prix par kg
    quantity: 400, // kg
    location: "Lille",
    status: "Excédentaire"
  }
];

export const sampleBuyers = [
  {
    id: 1,
    name: "Enterprise SA",
    preferredCategory: "Matières premières",
    alternativeCategories: ["Emballage"],
    minPrice: 20,
    maxPrice: 60,
    minQuantity: 100,
    location: "Lyon",
    preferredStatuses: ["Excédentaire", "Peu utilisé"]
  },
  {
    id: 2,
    name: "Ressourceco",
    preferredCategory: "Électronique",
    alternativeCategories: [],
    minPrice: 0,
    maxPrice: 50,
    minQuantity: 150,
    location: "Paris",
    preferredStatuses: ["Obsolète", "Excédentaire"]
  },
  {
    id: 3,
    name: "ValorEco",
    preferredCategory: "Matières premières",
    alternativeCategories: ["Électronique"],
    minPrice: 10,
    maxPrice: 30,
    minQuantity: 200,
    location: "Marseille",
    preferredStatuses: ["Excédentaire"]
  },
  {
    id: 4,
    name: "EcoCircular",
    preferredCategory: "Emballage",
    alternativeCategories: ["Matières premières"],
    minPrice: 0,
    maxPrice: 15,
    minQuantity: 300,
    location: "Bordeaux",
    preferredStatuses: ["Peu utilisé", "Excédentaire"]
  },
  {
    id: 5,
    name: "GreenRecycl",
    preferredCategory: "Matières premières",
    alternativeCategories: ["Emballage", "Électronique"],
    minPrice: 0,
    maxPrice: 40,
    minQuantity: 100,
    location: "Lille",
    preferredStatuses: ["Obsolète", "Excédentaire", "Peu utilisé"]
  }
];

export const marketTrends = {
  "Matières premières": { demandLevel: "high", averagePrice: 45, growthRate: 5 },
  "Électronique": { demandLevel: "medium", averagePrice: 35, growthRate: 2 },
  "Emballage": { demandLevel: "low", averagePrice: 8, growthRate: -1 }
};

// Find matches for a specific product
export const findMatchesForProduct = (productId: number) => {
  const product = sampleProducts.find(p => p.id === productId);
  if (!product) return [];
  
  return sampleBuyers.map(buyer => {
    const { score, reasons } = calculateMatchingScore(product, buyer);
    const prediction = predictSalesProbability(score, marketTrends[product.category as keyof typeof marketTrends] || { demandLevel: "medium", averagePrice: 30, growthRate: 0 });
    
    return {
      buyerId: buyer.id,
      buyerName: buyer.name,
      matchScore: score,
      matchReasons: reasons,
      prediction
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
};

// Find matches for a specific buyer
export const findMatchesForBuyer = (buyerId: number) => {
  const buyer = sampleBuyers.find(b => b.id === buyerId);
  if (!buyer) return [];
  
  return sampleProducts.map(product => {
    const { score, reasons } = calculateMatchingScore(product, buyer);
    const prediction = predictSalesProbability(score, marketTrends[product.category as keyof typeof marketTrends] || { demandLevel: "medium", averagePrice: 30, growthRate: 0 });
    
    return {
      productId: product.id,
      productName: product.name,
      matchScore: score,
      matchReasons: reasons,
      prediction
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
};

// Find top matches across all products and buyers
export const findTopMatches = (limit: number = 5) => {
  const allMatches: any[] = [];
  
  sampleProducts.forEach(product => {
    sampleBuyers.forEach(buyer => {
      const { score, reasons } = calculateMatchingScore(product, buyer);
      if (score > 40) { // Only include meaningful matches
        const prediction = predictSalesProbability(score, marketTrends[product.category as keyof typeof marketTrends] || { demandLevel: "medium", averagePrice: 30, growthRate: 0 });
        
        allMatches.push({
          productId: product.id,
          productName: product.name,
          buyerId: buyer.id,
          buyerName: buyer.name,
          matchScore: score,
          matchReasons: reasons,
          prediction
        });
      }
    });
  });
  
  return allMatches.sort((a, b) => b.matchScore - a.matchScore).slice(0, limit);
};
