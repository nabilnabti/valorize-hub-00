
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BarChart, ListChecks, Users, Upload, PieChart, Leaf, LogIn, Building } from "lucide-react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";

const features = [
  {
    title: "Tableau de bord",
    description: "Visualisez en temps réel vos stocks dormants par catégorie, valeur et état",
    icon: BarChart,
    href: "/dashboard",
    color: "bg-primary/10 text-primary"
  },
  {
    title: "Import de stocks",
    description: "Importez vos stocks manuellement depuis Excel ou via une API ERP",
    icon: Upload,
    href: "/upload",
    color: "bg-secondary/10 text-secondary"
  },
  {
    title: "Recommandations",
    description: "Obtenez des recommandations de valorisation pour vos stocks dormants",
    icon: ListChecks,
    href: "/recommendations",
    color: "bg-eco-500/10 text-eco-600"
  },
  {
    title: "Matching",
    description: "Trouvez des acheteurs ou vendeurs pour vos stocks grâce à notre algorithme",
    icon: Users,
    href: "/matching",
    color: "bg-amber-100 text-amber-700"
  },
  {
    title: "Impact CO2",
    description: "Calculez l'empreinte carbone économisée grâce à la valorisation de vos stocks",
    icon: Leaf,
    href: "/carbon-impact",
    color: "bg-green-100 text-green-700"
  },
  {
    title: "Reporting & Suivi",
    description: "Analysez vos statistiques de valorisation pour mesurer votre ROI",
    icon: PieChart,
    href: "/reporting",
    color: "bg-purple-100 text-purple-700"
  }
];

const Index = () => {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            <span className="text-primary">RE</span>
            <span className="text-eco-600">ENX</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Plateforme de valorisation des stocks dormants pour une économie circulaire efficace
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" variant="outline" className="hover-scale">
              <Link to="/login" className="flex items-center">
                <LogIn className="mr-2 h-5 w-5" />
                Connexion
              </Link>
            </Button>
            <Button asChild size="lg" variant="eco" className="hover-scale">
              <Link to="/company-register" className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                S'inscrire / Inscrire une entreprise
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="overflow-hidden hover-scale glass-card">
              <CardHeader className="pb-2">
                <div className={`p-3 w-14 h-14 rounded-xl flex items-center justify-center ${feature.color} mb-3`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" asChild className="group p-0">
                  <Link to={feature.href} className="flex items-center">
                    Découvrir
                    <ArrowRight className="ml-2 h-4 w-4 transition-all group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
