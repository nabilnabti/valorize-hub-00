
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BarChart, ListChecks, Users, Upload, PieChart } from "lucide-react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";

const features = [
  {
    title: "Tableau de bord",
    description: "Visualisez en temps réel vos stocks dormants par catégorie, valeur et état",
    icon: BarChart,
    href: "/dashboard",
    color: "bg-valorize-100 text-valorize-700"
  },
  {
    title: "Import de stocks",
    description: "Importez vos stocks manuellement depuis Excel ou via une API ERP",
    icon: Upload,
    href: "/upload",
    color: "bg-blue-100 text-blue-700"
  },
  {
    title: "Recommandations",
    description: "Obtenez des recommandations de valorisation pour vos stocks dormants",
    icon: ListChecks,
    href: "/recommendations",
    color: "bg-eco-100 text-eco-700"
  },
  {
    title: "Matching",
    description: "Trouvez des acheteurs ou vendeurs pour vos stocks grâce à notre algorithme",
    icon: Users,
    href: "/matching",
    color: "bg-amber-100 text-amber-700"
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            <span className="text-valorize-600">Valorize</span>
            <span className="text-eco-600">Hub</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Plateforme de valorisation des stocks dormants pour une économie circulaire efficace
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-valorize-600 hover:bg-valorize-700">
              <Link to="/dashboard">
                Commencer maintenant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className={`p-2 w-12 h-12 rounded-lg flex items-center justify-center ${feature.color} mb-2`}>
                  <feature.icon className="h-6 w-6" />
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
