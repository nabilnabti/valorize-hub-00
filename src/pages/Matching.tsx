
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Building, 
  Search, 
  ArrowRight, 
  ArrowLeft,
  Filter,
  Users
} from "lucide-react";

const Matching = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Matching</h1>
          <p className="text-muted-foreground">
            Trouvez des partenaires pour valoriser vos stocks dormants ou acquérir des ressources à moindre coût
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Recherche de partenaires</CardTitle>
              <CardDescription>
                Filtrez par secteur d'activité, localisation et type de stock
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Input placeholder="Rechercher des partenaires..." />
                  <Button size="icon" variant="ghost">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Building className="h-3.5 w-3.5" />
                    <span>Industrie</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    <span>Distributeurs</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Filter className="h-3.5 w-3.5" />
                    <span>Filtres</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Match récents</CardTitle>
              <CardDescription>
                Dernières entreprises qui correspondent à vos besoins
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enterprise SA</p>
                    <p className="text-sm text-muted-foreground">Matières premières textiles</p>
                  </div>
                  <Button size="sm" variant="outline" className="gap-1">
                    <span>Contact</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Ressourceco</p>
                    <p className="text-sm text-muted-foreground">Équipement électronique</p>
                  </div>
                  <Button size="sm" variant="outline" className="gap-1">
                    <span>Contact</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Demandes entrantes</CardTitle>
              <CardDescription>
                Entreprises intéressées par vos stocks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">ValorEco</p>
                    <p className="text-sm text-muted-foreground">Intéressé par vos matériaux</p>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <ArrowLeft className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">EcoCircular</p>
                    <p className="text-sm text-muted-foreground">Intéressé par vos produits</p>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <ArrowLeft className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Matching;
