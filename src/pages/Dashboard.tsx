
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";
import { PieChart, BarChart, ResponsiveContainer, Cell, Pie, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChevronUp, ChevronDown, AlertCircle, Briefcase, ShoppingBag } from "lucide-react";

// Données de démonstration
const stockData = [
  { name: "Matières premières", value: 42000, color: "#0ca5e9" },
  { name: "Produits finis", value: 68000, color: "#22c55e" },
  { name: "Pièces détachées", value: 28000, color: "#eab308" },
  { name: "Emballages", value: 12000, color: "#f97316" }
];

const valueByStatus = [
  { name: "Obsolète", valeur: 60000, color: "#f43f5e" },
  { name: "Peu utilisé", valeur: 50000, color: "#eab308" },
  { name: "Excédentaire", valeur: 40000, color: "#0ca5e9" }
];

const opportunitesData = [
  { name: "Revente B2B", valeur: 75000, gain: 45000 },
  { name: "Redistribution", valeur: 35000, gain: 25000 },
  { name: "Don/Recyclage", valeur: 40000, gain: 15000 }
];

const Dashboard = () => {
  const totalStock = stockData.reduce((acc, item) => acc + item.value, 0);
  const totalOpportunites = opportunitesData.reduce((acc, item) => acc + item.gain, 0);

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Vue d'ensemble de vos stocks dormants et opportunités de valorisation
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Valeur totale des stocks dormants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{totalStock.toLocaleString()} €</div>
              <div className="flex items-center text-red-500">
                <ChevronUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+12%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Valorisation potentielle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{totalOpportunites.toLocaleString()} €</div>
              <div className="flex items-center text-eco-500">
                <ChevronUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+8%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Catégories produits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stockData.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taux de valorisation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">45%</div>
              <div className="flex items-center text-eco-500">
                <ChevronUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Alert className="mb-8 border-valorize-200 bg-valorize-50">
        <AlertCircle className="h-4 w-4 text-valorize-600" />
        <AlertTitle className="text-valorize-700">Conseil de valorisation</AlertTitle>
        <AlertDescription className="text-valorize-600">
          Vous avez 150 000 € de stocks dormants. Nous recommandons de prioriser la valorisation
          des matières premières obsolètes qui représentent 35% de cette valeur.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Répartition par catégorie</CardTitle>
            <CardDescription>Valeur des stocks dormants par type de produit</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stockData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {stockData.map((entry, index) => (
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

        <Card>
          <CardHeader>
            <CardTitle>État des stocks</CardTitle>
            <CardDescription>Répartition par statut d'utilisation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={valueByStatus}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={(value) => `${value / 1000}k €`} />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip formatter={(value) => `${Number(value).toLocaleString()} €`} />
                  <Legend />
                  <Bar dataKey="valeur" name="Valeur (€)">
                    {valueByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Opportunités de valorisation</CardTitle>
          <CardDescription>
            Potentiel de gains par type de valorisation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={opportunitesData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `${value / 1000}k €`} />
                <Tooltip formatter={(value) => `${Number(value).toLocaleString()} €`} />
                <Legend />
                <Bar dataKey="valeur" name="Valeur stock" fill="#0ca5e9" />
                <Bar dataKey="gain" name="Gain potentiel" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Dashboard;
