
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Briefcase, FileBox, Recycle, ArrowRight, CircleDollarSign, Repeat, Factory, Building, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";

const recommendationCategories = [
  {
    id: "revente",
    title: "Revente B2B",
    description: "Vendez vos stocks dormants à des entreprises qui peuvent les utiliser",
    icon: Briefcase,
    color: "bg-valorize-100 text-valorize-700 border-valorize-300",
    valueTag: "68 000 €",
    roi: "+45%",
  },
  {
    id: "redistribution",
    title: "Redistribution interne",
    description: "Réorientez vos stocks vers d'autres sites ou divisions de votre entreprise",
    icon: Repeat,
    color: "bg-amber-100 text-amber-700 border-amber-300",
    valueTag: "42 000 €",
    roi: "+30%",
  },
  {
    id: "recyclage",
    title: "Don ou recyclage",
    description: "Donnez ou recyclez vos stocks pour réduire l'impact environnemental",
    icon: Recycle,
    color: "bg-eco-100 text-eco-700 border-eco-300",
    valueTag: "40 000 €",
    roi: "+10%",
  },
];

const stockRecommendations = [
  {
    id: 1,
    type: "revente",
    name: "Acier inoxydable 304",
    description: "Stock excédentaire de qualité industrielle",
    value: 12500,
    quantity: "250 kg",
    action: "Revendre à des entreprises de fabrication métallique",
    buyers: ["Métal Pro", "Industrie Plus", "AcierTech"],
    potentialValue: 18750,
    saving: 6250,
  },
  {
    id: 2,
    type: "revente",
    name: "Composants électroniques XB42",
    description: "Composants obsolètes pour ancienne gamme de produits",
    value: 7200,
    quantity: "180 unités",
    action: "Vendre à des revendeurs spécialisés en électronique",
    buyers: ["ElectroRecycl", "CompoTech"],
    potentialValue: 9360,
    saving: 2160,
  },
  {
    id: 3,
    type: "redistribution",
    name: "Connecteurs RJ45 renforcés",
    description: "Stock excédentaire pour projets réseau",
    value: 3750,
    quantity: "750 unités",
    action: "Redistribuer vers la division infrastructure",
    buyers: ["Division Infrastructure", "Division Télécom"],
    potentialValue: 5625,
    saving: 1875,
  },
  {
    id: 4,
    type: "recyclage",
    name: "Carton triple cannelure",
    description: "Emballages peu utilisés",
    value: 3000,
    quantity: "500 unités",
    action: "Donner à des associations ou recycler",
    buyers: ["RecycleMax", "EcoEmballage", "Association locale"],
    potentialValue: 0,
    saving: 3000,
  },
];

const Recommendations = () => {
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Recommandations de valorisation</h1>
        <p className="text-muted-foreground">
          Découvrez les meilleures options pour valoriser vos stocks dormants
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {recommendationCategories.map((category) => (
          <Card key={category.id} className={cn("border-2", category.color)}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className={`p-2 rounded-lg ${category.color.split(" ")[0]}`}>
                  <category.icon className="h-5 w-5" />
                </div>
                <Badge className={category.color.split(" ")[0] + " " + category.color.split(" ")[1]}>
                  {category.valueTag}
                </Badge>
              </div>
              <CardTitle className="mt-2">{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center gap-2 text-eco-600 font-medium">
                <LineChart className="h-4 w-4" />
                <span>ROI estimé: {category.roi}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Voir les opportunités</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">Opportunités détaillées</h2>

      <div className="space-y-6">
        {stockRecommendations.map((item) => {
          const category = recommendationCategories.find(c => c.id === item.type);
          
          return (
            <Card key={item.id} className="overflow-hidden">
              <div className={`h-2 w-full ${category?.color.split(" ")[0]}`} />
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </div>
                  <Badge variant="outline" className={category?.color || ""}>
                    {category?.title}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Valeur actuelle</div>
                    <div className="text-xl font-bold flex items-center gap-1">
                      <CircleDollarSign className="h-5 w-5 text-valorize-500" />
                      {item.value.toLocaleString()} €
                    </div>
                    <div className="text-sm text-muted-foreground">Quantité: {item.quantity}</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Action recommandée</div>
                    <div className="text-lg font-medium">{item.action}</div>
                    <div className="text-sm text-muted-foreground">
                      Gain potentiel: +{(item.saving).toLocaleString()} €
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Acheteurs potentiels</div>
                    <div className="flex flex-wrap gap-2">
                      {item.buyers.map((buyer, index) => (
                        <div key={index} className="flex items-center text-sm">
                          {item.type === "revente" ? (
                            <Building className="h-3 w-3 mr-1 text-valorize-500" />
                          ) : item.type === "redistribution" ? (
                            <Factory className="h-3 w-3 mr-1 text-amber-500" />
                          ) : (
                            <Recycle className="h-3 w-3 mr-1 text-eco-500" />
                          )}
                          {buyer}
                          {index < item.buyers.length - 1 ? ", " : ""}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">
                  Analyser
                  <BarChart className="ml-2 h-4 w-4" />
                </Button>
                <Button className={
                  item.type === "revente" 
                    ? "bg-valorize-600 hover:bg-valorize-700" 
                    : item.type === "redistribution"
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "bg-eco-600 hover:bg-eco-700"
                }>
                  Valoriser
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </MainLayout>
  );
};

export default Recommendations;
