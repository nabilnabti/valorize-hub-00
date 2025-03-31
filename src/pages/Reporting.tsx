
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, Line, Pie } from "recharts";
import { Download, Calendar, PieChart as PieChartIcon, BarChart as BarChartIcon, TrendingUp, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Données de démonstration
const monthlyData = [
  { month: "Jan", valorise: 25000, economise: 10000 },
  { month: "Fév", valorise: 32000, economise: 15000 },
  { month: "Mar", valorise: 28000, economise: 12000 },
  { month: "Avr", valorise: 40000, economise: 18000 },
  { month: "Mai", valorise: 45000, economise: 20000 },
  { month: "Juin", valorise: 52000, economise: 24000 },
];

const categoriesData = [
  { name: "Matières premières", value: 42000, color: "#0ca5e9" },
  { name: "Produits finis", value: 68000, color: "#22c55e" },
  { name: "Pièces détachées", value: 28000, color: "#eab308" },
  { name: "Emballages", value: 12000, color: "#f97316" }
];

const methodsData = [
  { name: "Revente B2B", value: 75000, color: "#0ca5e9" },
  { name: "Redistribution", value: 35000, color: "#eab308" },
  { name: "Don", value: 25000, color: "#22c55e" },
  { name: "Recyclage", value: 15000, color: "#f97316" }
];

const topProductsData = [
  { name: "Acier inoxydable", categorie: "Matières premières", valeur: 12500, pourcentage: 8.3 },
  { name: "Composants électroniques", categorie: "Pièces détachées", valeur: 7200, pourcentage: 4.8 },
  { name: "Connecteurs RJ45", categorie: "Pièces détachées", valeur: 3750, pourcentage: 2.5 },
  { name: "Carton triple cannelure", categorie: "Emballages", valeur: 3000, pourcentage: 2.0 },
  { name: "Aluminium 6061", categorie: "Matières premières", valeur: 5800, pourcentage: 3.9 },
];

const kpiCards = [
  { title: "Valeur totale valorisée", value: "150 000 €", change: "+24% vs. trimestre précédent", icon: TrendingUp, color: "text-valorize-500" },
  { title: "Économies réalisées", value: "85 000 €", change: "+18% vs. trimestre précédent", icon: TrendingUp, color: "text-eco-500" },
  { title: "Taux de valorisation", value: "45%", change: "+5 points vs. trimestre précédent", icon: PieChartIcon, color: "text-amber-500" },
  { title: "Produits valorisés", value: "47", change: "+12 vs. trimestre précédent", icon: BarChartIcon, color: "text-purple-500" },
];

const Reporting = () => {
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Reporting & Suivi</h1>
        <p className="text-muted-foreground">
          Analysez vos performances de valorisation des stocks dormants
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
          
          <Select defaultValue="toutes">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Catégories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="toutes">Toutes les catégories</SelectItem>
              <SelectItem value="matieres">Matières premières</SelectItem>
              <SelectItem value="produits">Produits finis</SelectItem>
              <SelectItem value="pieces">Pièces détachées</SelectItem>
              <SelectItem value="emballages">Emballages</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          <span>Exporter les données</span>
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

      <Tabs defaultValue="evolution" className="mb-8">
        <TabsList className="w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="evolution" className="flex-1">Évolution</TabsTrigger>
          <TabsTrigger value="categories" className="flex-1">Catégories</TabsTrigger>
          <TabsTrigger value="methodes" className="flex-1">Méthodes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="evolution">
          <Card>
            <CardHeader>
              <CardTitle>Évolution de la valorisation</CardTitle>
              <CardDescription>
                Suivi mensuel des montants valorisés et économisés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${value / 1000}k €`} />
                    <Tooltip formatter={(value) => `${Number(value).toLocaleString()} €`} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="valorise"
                      name="Montant valorisé"
                      stroke="#0ca5e9"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="economise"
                      name="Économies réalisées"
                      stroke="#22c55e"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Répartition par catégorie</CardTitle>
              <CardDescription>
                Valeur des stocks valorisés par type de produit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoriesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoriesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${Number(value).toLocaleString()} €`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="methodes">
          <Card>
            <CardHeader>
              <CardTitle>Méthodes de valorisation</CardTitle>
              <CardDescription>
                Répartition des gains par méthode de valorisation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={methodsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value / 1000}k €`} />
                    <Tooltip formatter={(value) => `${Number(value).toLocaleString()} €`} />
                    <Legend />
                    <Bar dataKey="value" name="Valeur (€)">
                      {methodsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Top 5 des produits valorisés</CardTitle>
            <CardDescription>
              Les produits ayant généré le plus de valeur
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Produit</th>
                    <th className="text-left p-3">Catégorie</th>
                    <th className="text-right p-3">Valeur</th>
                    <th className="text-right p-3">% du total</th>
                  </tr>
                </thead>
                <tbody>
                  {topProductsData.map((product, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-3 font-medium">{product.name}</td>
                      <td className="p-3 text-muted-foreground">{product.categorie}</td>
                      <td className="p-3 text-right">{product.valeur.toLocaleString()} €</td>
                      <td className="p-3 text-right">{product.pourcentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button variant="outline" className="flex items-center gap-2 mx-auto">
          <FileDown className="h-4 w-4" />
          <span>Télécharger le rapport complet (PDF)</span>
        </Button>
      </div>
    </MainLayout>
  );
};

export default Reporting;
