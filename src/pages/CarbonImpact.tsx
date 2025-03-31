
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { PieChart, BarChart, ResponsiveContainer, Cell, Pie, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { AlertCircle, ChevronUp, Leaf, RefreshCcw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";

// Données des impacts CO2 par catégorie de matériau
const materialCO2Impact = {
  "metal": 5.8, // kg CO2e / kg
  "plastic": 3.1, // kg CO2e / kg
  "electronic": 15.5, // kg CO2e / kg
  "textile": 10.2, // kg CO2e / kg
  "paper": 1.2, // kg CO2e / kg
  "wood": 0.6, // kg CO2e / kg
};

// Données des impacts CO2 par méthode de valorisation
const valorisationType = {
  "reuse": 0.95, // % réduction
  "recycling": 0.75, // % réduction
  "donation": 0.85, // % réduction
  "resale": 0.9, // % réduction
};

// Fonction pour calculer l'empreinte CO2 évitée
const calculateCO2Savings = (
  materialType: string,
  quantity: number,
  valorisationMethod: string,
  transportDistance: number
) => {
  // Impact de base du matériau
  const baseCO2 = materialCO2Impact[materialType as keyof typeof materialCO2Impact] || 1;
  
  // Impact de la production évitée
  const productionCO2 = baseCO2 * quantity;
  
  // Économie de CO2 grâce à la valorisation
  const savingRate = valorisationType[valorisationMethod as keyof typeof valorisationType] || 0.5;
  const savedCO2 = productionCO2 * savingRate;
  
  // Émissions dues au transport (approximation: 0.1 kg CO2e / km / tonne)
  const transportCO2 = (transportDistance * quantity / 1000) * 0.1;
  
  // CO2 net économisé
  const netSavedCO2 = savedCO2 - transportCO2;
  
  return {
    production: productionCO2,
    transport: transportCO2,
    saved: netSavedCO2,
    equivalent: {
      trees: Math.round(netSavedCO2 / 20), // 1 arbre absorbe environ 20kg de CO2 par an
      carKm: Math.round(netSavedCO2 / 0.2), // 0.2kg de CO2 par km en voiture moyenne
      flights: (netSavedCO2 / 400).toFixed(1), // 400kg de CO2 pour un vol Paris-Londres
    }
  };
};

const savedCO2Data = [
  { name: "Matériaux métalliques", value: 12500, color: "#0ca5e9" },
  { name: "Plastiques", value: 8200, color: "#22c55e" },
  { name: "Composants électroniques", value: 15300, color: "#eab308" },
  { name: "Textiles", value: 5600, color: "#f97316" },
  { name: "Papier et carton", value: 3200, color: "#8b5cf6" },
];

const comparativeData = [
  { name: "Méthode traditionnelle", emission: 45000 },
  { name: "Avec REENX", emission: 12500 },
];

const CarbonImpact = () => {
  const [materialType, setMaterialType] = useState("metal");
  const [quantity, setQuantity] = useState(100);
  const [valorisationMethod, setValorisationMethod] = useState("reuse");
  const [transportDistance, setTransportDistance] = useState(50);
  const [calculatedCO2, setCalculatedCO2] = useState<any>(null);

  const handleCalculate = () => {
    const result = calculateCO2Savings(
      materialType, 
      quantity, 
      valorisationMethod, 
      transportDistance
    );
    setCalculatedCO2(result);
  };

  const totalCO2Saved = savedCO2Data.reduce((acc, item) => acc + item.value, 0);

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Impact carbone</h1>
        <p className="text-muted-foreground">
          Calculez et visualisez l'empreinte carbone évitée grâce à la valorisation de vos stocks dormants
        </p>
      </div>

      <Alert className="mb-8 border-eco-200 bg-eco-50">
        <AlertCircle className="h-4 w-4 text-eco-600" />
        <AlertTitle className="text-eco-700">Réduction de l'impact environnemental</AlertTitle>
        <AlertDescription className="text-eco-600">
          Votre entreprise a déjà permis d'éviter l'émission de {totalCO2Saved.toLocaleString()} kg de CO2
          grâce à la valorisation de vos stocks dormants. Cela équivaut à {Math.round(totalCO2Saved / 20).toLocaleString()} arbres plantés.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Calculateur d'impact CO2</CardTitle>
            <CardDescription>
              Estimez l'empreinte carbone évitée pour vos stocks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="material-type">Type de matériau</Label>
                <Select 
                  value={materialType} 
                  onValueChange={setMaterialType}
                >
                  <SelectTrigger id="material-type">
                    <SelectValue placeholder="Sélectionnez un matériau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metal">Métaux</SelectItem>
                    <SelectItem value="plastic">Plastiques</SelectItem>
                    <SelectItem value="electronic">Électronique</SelectItem>
                    <SelectItem value="textile">Textiles</SelectItem>
                    <SelectItem value="paper">Papier et carton</SelectItem>
                    <SelectItem value="wood">Bois</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantité (kg)</Label>
                <Input 
                  id="quantity" 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="valorisation">Méthode de valorisation</Label>
                <Select 
                  value={valorisationMethod} 
                  onValueChange={setValorisationMethod}
                >
                  <SelectTrigger id="valorisation">
                    <SelectValue placeholder="Sélectionnez une méthode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reuse">Réutilisation</SelectItem>
                    <SelectItem value="recycling">Recyclage</SelectItem>
                    <SelectItem value="donation">Don</SelectItem>
                    <SelectItem value="resale">Revente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="distance">Distance de transport (km)</Label>
                  <span className="text-sm text-muted-foreground">{transportDistance} km</span>
                </div>
                <Slider 
                  id="distance"
                  value={[transportDistance]} 
                  min={0} 
                  max={500} 
                  step={10}
                  onValueChange={(value) => setTransportDistance(value[0])}
                />
              </div>

              <Button onClick={handleCalculate} className="w-full bg-eco-600 hover:bg-eco-700">
                Calculer l'impact
              </Button>
            </div>

            {calculatedCO2 && (
              <div className="mt-6 border-t pt-4">
                <h3 className="font-medium mb-2">Résultats :</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Production évitée :</span>
                    <span className="font-medium">{calculatedCO2.production.toFixed(1)} kg CO2e</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Émissions transport :</span>
                    <span className="font-medium">{calculatedCO2.transport.toFixed(1)} kg CO2e</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span>CO2 net économisé :</span>
                    <span className="text-eco-600">{calculatedCO2.saved.toFixed(1)} kg CO2e</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <p className="text-sm mb-1">Cela équivaut à :</p>
                    <ul className="text-sm space-y-1">
                      <li className="flex justify-between">
                        <span>🌳 Arbres plantés :</span>
                        <span>{calculatedCO2.equivalent.trees}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>🚗 Kilomètres en voiture :</span>
                        <span>{calculatedCO2.equivalent.carKm}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>✈️ Vols Paris-Londres :</span>
                        <span>{calculatedCO2.equivalent.flights}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>CO2 évité par catégorie</CardTitle>
            <CardDescription>
              Répartition des émissions de CO2 évitées par type de matériau
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={savedCO2Data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {savedCO2Data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${Number(value).toLocaleString()} kg CO2e`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Comparaison avec méthodes traditionnelles</CardTitle>
            <CardDescription>
              Émissions de CO2 avec et sans valorisation des stocks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparativeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'kg CO2e', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => `${Number(value).toLocaleString()} kg CO2e`} />
                  <Bar 
                    dataKey="emission" 
                    name="Émissions CO2" 
                    fill="#0ca5e9"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Objectifs d'impact</CardTitle>
              <CardDescription>
                Progression vers vos objectifs de réduction d'empreinte carbone
              </CardDescription>
            </div>
            <div className="bg-eco-100 p-3 rounded-full">
              <Leaf className="h-6 w-6 text-eco-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Objectif annuel</span>
                  <span className="text-sm text-muted-foreground">{Math.round((totalCO2Saved / 50000) * 100)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-eco-600 h-2.5 rounded-full" style={{ width: `${Math.min(100, Math.round((totalCO2Saved / 50000) * 100))}%` }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-muted-foreground">{totalCO2Saved.toLocaleString()} kg</span>
                  <span className="text-xs text-muted-foreground">Objectif: 50 000 kg</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Moyenne mensuelle</p>
                  <p className="text-xl font-bold">2 450 kg</p>
                  <div className="flex items-center justify-center text-eco-600 text-xs mt-1">
                    <ChevronUp className="h-3 w-3 mr-1" />
                    <span>+12% ce mois</span>
                  </div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Estimation annuelle</p>
                  <p className="text-xl font-bold">29 400 kg</p>
                  <div className="flex items-center justify-center text-eco-600 text-xs mt-1">
                    <ChevronUp className="h-3 w-3 mr-1" />
                    <span>+8% vs objectif</span>
                  </div>
                </div>
              </div>

              <Button className="w-full flex items-center bg-eco-600 hover:bg-eco-700">
                <RefreshCcw className="mr-2 h-4 w-4" />
                Mettre à jour les objectifs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CarbonImpact;
