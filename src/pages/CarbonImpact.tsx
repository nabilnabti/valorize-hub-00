
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, Line } from "recharts";
import { Download, Leaf, FileText, BarChart as BarChartIcon, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Données de démonstration pour les économies CO2
const monthlyData = [
  { month: "Jan", co2: 750, economie: 15000 },
  { month: "Fév", co2: 920, economie: 18400 },
  { month: "Mar", co2: 840, economie: 16800 },
  { month: "Avr", co2: 1200, economie: 24000 },
  { month: "Mai", co2: 1350, economie: 27000 },
  { month: "Juin", co2: 1560, economie: 31200 },
];

const methodsData = [
  { name: "Revente B2B", value: 2500, color: "#0ca5e9" },
  { name: "Redistribution", value: 1800, color: "#eab308" },
  { name: "Don", value: 800, color: "#22c55e" },
  { name: "Recyclage", value: 520, color: "#f97316" }
];

const kpiCards = [
  { title: "CO2 total économisé", value: "5 620 kg", change: "+24% vs. trimestre précédent", icon: Leaf, color: "text-green-500" },
  { title: "Équivalent en arbres", value: "256 arbres", change: "+18% vs. trimestre précédent", icon: Leaf, color: "text-green-600" },
  { title: "Économies générées", value: "112 400 €", change: "+5% vs. trimestre précédent", icon: TrendingUp, color: "text-eco-500" },
  { title: "Produits réutilisés", value: "47", change: "+12 vs. trimestre précédent", icon: BarChartIcon, color: "text-purple-500" },
];

const CarbonImpact = () => {
  const [weight, setWeight] = useState("");
  const [material, setMaterial] = useState("plastic");
  const [calculatedCO2, setCalculatedCO2] = useState<number | null>(null);

  // Facteurs d'émission CO2 en kg CO2e par kg de matériau (données simplifiées)
  const co2Factors = {
    plastic: 6.3, // kg CO2e/kg
    steel: 2.8,
    aluminum: 11.0,
    paper: 1.1,
    electronics: 50.0,
    glass: 0.9,
    textile: 15.0,
    wood: 0.6
  };

  const calculateCO2Impact = () => {
    const weightNum = parseFloat(weight);
    if (isNaN(weightNum) || weightNum <= 0) {
      return;
    }
    
    const factor = co2Factors[material as keyof typeof co2Factors];
    const co2Saved = weightNum * factor;
    setCalculatedCO2(co2Saved);
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Impact Carbone</h1>
        <p className="text-muted-foreground">
          Calculez et visualisez l'empreinte carbone économisée grâce à la valorisation de vos stocks
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select defaultValue="trimestre">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mois">Mois en cours</SelectItem>
              <SelectItem value="trimestre">Trimestre en cours</SelectItem>
              <SelectItem value="annee">Année en cours</SelectItem>
              <SelectItem value="custom">Période personnalisée</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          <span>Exporter le rapport CO2</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{card.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Calculateur d'impact CO2</CardTitle>
            <CardDescription>
              Estimez l'empreinte carbone économisée en valorisant vos stocks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="weight">Poids du matériau (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Ex: 100"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="material">Type de matériau</Label>
                <Select value={material} onValueChange={setMaterial}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un matériau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plastic">Plastique</SelectItem>
                    <SelectItem value="steel">Acier</SelectItem>
                    <SelectItem value="aluminum">Aluminium</SelectItem>
                    <SelectItem value="paper">Papier/Carton</SelectItem>
                    <SelectItem value="electronics">Électronique</SelectItem>
                    <SelectItem value="glass">Verre</SelectItem>
                    <SelectItem value="textile">Textile</SelectItem>
                    <SelectItem value="wood">Bois</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={calculateCO2} className="w-full bg-green-600 hover:bg-green-700">
                <Leaf className="mr-2 h-4 w-4" />
                Calculer l'impact CO2
              </Button>
              
              {calculatedCO2 !== null && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                  <h3 className="font-semibold text-green-800 mb-2">Résultats du calcul</h3>
                  <p className="text-green-700">CO2 économisé: <span className="font-bold">{calculatedCO2.toFixed(2)} kg</span></p>
                  <p className="text-green-700 text-sm mt-1">
                    Équivalent à environ {(calculatedCO2 / 22).toFixed(0)} arbres pendant un an
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Pourquoi c'est important</CardTitle>
            <CardDescription>
              L'impact de la valorisation des stocks sur l'environnement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Leaf className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Réduction des émissions de CO2</h4>
                  <p className="text-sm text-muted-foreground">
                    En réutilisant les stocks existants, vous évitez la production de nouveaux produits, 
                    ce qui réduit significativement les émissions de CO2 liées à la fabrication.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Bilan carbone amélioré</h4>
                  <p className="text-sm text-muted-foreground">
                    Intégrez ces économies de CO2 dans votre rapport RSE et améliorez 
                    votre score environnemental auprès de vos parties prenantes.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Double bénéfice</h4>
                  <p className="text-sm text-muted-foreground">
                    Économisez de l'argent tout en réduisant votre impact environnemental.
                    C'est une situation gagnant-gagnant pour votre entreprise et la planète.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="evolution" className="mb-8">
        <TabsList className="w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="evolution" className="flex-1">Évolution</TabsTrigger>
          <TabsTrigger value="methodes" className="flex-1">Par méthode</TabsTrigger>
        </TabsList>
        
        <TabsContent value="evolution">
          <Card>
            <CardHeader>
              <CardTitle>Évolution de l'impact CO2</CardTitle>
              <CardDescription>
                Suivi mensuel du CO2 économisé et de la valeur économique générée
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ChartContainer config={{}} className="h-96">
                  <LineChart
                    data={monthlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" tickFormatter={(value) => `${value} kg`} />
                    <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value / 1000}k €`} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="co2"
                      name="CO2 économisé (kg)"
                      stroke="#22c55e"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="economie"
                      name="Économies (€)"
                      stroke="#0ca5e9"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="methodes">
          <Card>
            <CardHeader>
              <CardTitle>Impact CO2 par méthode de valorisation</CardTitle>
              <CardDescription>
                Répartition des économies de CO2 selon la méthode de valorisation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ChartContainer config={{}} className="h-96">
                  <BarChart
                    data={methodsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value} kg`} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="value" name="CO2 économisé (kg)">
                      {methodsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="text-center">
        <Button variant="outline" className="flex items-center gap-2 mx-auto">
          <Download className="h-4 w-4" />
          <span>Télécharger le rapport d'impact carbone (PDF)</span>
        </Button>
      </div>
    </MainLayout>
  );
};

export default CarbonImpact;
