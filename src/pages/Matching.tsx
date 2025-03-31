
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Building, 
  Buildings, 
  MapPin, 
  Truck, 
  ShoppingBag,
  ArrowRight, 
  ArrowRightLeft, 
  Search, 
  Trash2, 
  MessageSquare 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

// Données de démonstration
const buyerCompanies = [
  {
    id: 1,
    name: "Métal Pro",
    location: "Lyon, France",
    distance: "45 km",
    matchScore: 95,
    interested: ["Acier inoxydable", "Aluminium", "Cuivre"],
    recentActivity: "A acheté 500kg d'aluminium il y a 2 semaines",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "ElectroTech",
    location: "Grenoble, France",
    distance: "120 km",
    matchScore: 87,
    interested: ["Composants électroniques", "Circuits imprimés", "Câblage"],
    recentActivity: "Recherche active de composants électroniques",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Emballage Plus",
    location: "Marseille, France",
    distance: "290 km",
    matchScore: 78,
    interested: ["Carton", "Plastique", "Film étirable"],
    recentActivity: "A consulté votre catalogue d'emballages",
    logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=200&h=200&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Industrie Connectée",
    location: "Paris, France",
    distance: "380 km",
    matchScore: 72,
    interested: ["Composants électroniques", "Connecteurs", "Capteurs"],
    recentActivity: "A acheté des capteurs similaires récemment",
    logo: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=200&h=200&auto=format&fit=crop"
  },
];

const sellerCompanies = [
  {
    id: 1,
    name: "MatériauxTech",
    location: "Nantes, France",
    distance: "520 km",
    matchScore: 91,
    selling: ["Acier inoxydable 316L", "Aluminium 6061", "Titane grade 5"],
    recentActivity: "A mis en vente 800kg d'acier inoxydable",
    logo: "https://images.unsplash.com/photo-1530906622963-8a60586a49c7?w=200&h=200&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "CompoElec",
    location: "Toulouse, France",
    distance: "230 km",
    matchScore: 84,
    selling: ["Microcontrôleurs", "Résistances", "Condensateurs"],
    recentActivity: "Liquidation de stock suite à changement de gamme",
    logo: "https://images.unsplash.com/photo-1610374792793-f016b77ca51a?w=200&h=200&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "AcierPremium",
    location: "Lille, France",
    distance: "650 km",
    matchScore: 79,
    selling: ["Acier inoxydable 304", "Acier S355", "Tôles galvanisées"],
    recentActivity: "Recherche clients pour stock excédentaire",
    logo: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=200&auto=format&fit=crop"
  },
];

const Matching = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Filtrage des entreprises
  const filteredBuyers = buyerCompanies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "" || company.interested.some(cat => cat.toLowerCase().includes(selectedCategory.toLowerCase())))
  );

  const filteredSellers = sellerCompanies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "" || company.selling.some(cat => cat.toLowerCase().includes(selectedCategory.toLowerCase())))
  );

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Matching Acheteurs/Vendeurs</h1>
        <p className="text-muted-foreground">
          Trouvez les meilleures correspondances pour vos stocks dormants
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-4">
          <CardTitle>Rechercher des entreprises</CardTitle>
          <CardDescription>
            Filtrez par nom ou catégorie de produit
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Rechercher une entreprise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-72">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Catégorie de produit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Toutes les catégories</SelectItem>
                <SelectItem value="acier">Acier</SelectItem>
                <SelectItem value="aluminium">Aluminium</SelectItem>
                <SelectItem value="composants">Composants électroniques</SelectItem>
                <SelectItem value="emballage">Emballages</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="buyers" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="buyers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Acheteurs potentiels</span>
          </TabsTrigger>
          <TabsTrigger value="sellers" className="flex items-center gap-2">
            <Buildings className="h-4 w-4" />
            <span>Vendeurs potentiels</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="buyers">
          {filteredBuyers.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <Trash2 className="h-12 w-12 mx-auto text-muted-foreground opacity-30 mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucun acheteur trouvé</h3>
                <p className="text-muted-foreground">
                  Aucun acheteur ne correspond à vos critères de recherche.<br />
                  Essayez de modifier vos filtres.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredBuyers.map((company) => (
                <Card key={company.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-64 h-32 md:h-auto">
                        <img 
                          src={company.logo} 
                          alt={company.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{company.name}</h3>
                            <div className="flex items-center text-muted-foreground mb-4">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{company.location}</span>
                              <span className="mx-2">•</span>
                              <Truck className="h-4 w-4 mr-1" />
                              <span>{company.distance}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="text-sm font-medium mb-1">Match</div>
                            <div className="flex items-center gap-2">
                              <Progress value={company.matchScore} className="w-24 h-2" />
                              <span className="text-sm font-bold text-valorize-600">{company.matchScore}%</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="text-sm font-medium mb-2">Intéressé par</div>
                          <div className="flex flex-wrap gap-2">
                            {company.interested.map((item, index) => (
                              <Badge key={index} variant="secondary">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="text-sm font-medium mb-1">Activité récente</div>
                          <div className="text-sm text-muted-foreground">
                            {company.recentActivity}
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-3 mt-4">
                          <Button variant="outline" className="flex items-center">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Contacter
                          </Button>
                          <Button className="bg-valorize-600 hover:bg-valorize-700">
                            <ArrowRightLeft className="mr-2 h-4 w-4" />
                            Proposer un match
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="sellers">
          {filteredSellers.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <Trash2 className="h-12 w-12 mx-auto text-muted-foreground opacity-30 mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucun vendeur trouvé</h3>
                <p className="text-muted-foreground">
                  Aucun vendeur ne correspond à vos critères de recherche.<br />
                  Essayez de modifier vos filtres.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredSellers.map((company) => (
                <Card key={company.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-64 h-32 md:h-auto">
                        <img 
                          src={company.logo} 
                          alt={company.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{company.name}</h3>
                            <div className="flex items-center text-muted-foreground mb-4">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{company.location}</span>
                              <span className="mx-2">•</span>
                              <Truck className="h-4 w-4 mr-1" />
                              <span>{company.distance}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="text-sm font-medium mb-1">Match</div>
                            <div className="flex items-center gap-2">
                              <Progress value={company.matchScore} className="w-24 h-2" />
                              <span className="text-sm font-bold text-valorize-600">{company.matchScore}%</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="text-sm font-medium mb-2">Produits disponibles</div>
                          <div className="flex flex-wrap gap-2">
                            {company.selling.map((item, index) => (
                              <Badge key={index} variant="secondary" className="flex items-center">
                                <ShoppingBag className="h-3 w-3 mr-1" />
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="text-sm font-medium mb-1">Activité récente</div>
                          <div className="text-sm text-muted-foreground">
                            {company.recentActivity}
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-3 mt-4">
                          <Button variant="outline" className="flex items-center">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Contacter
                          </Button>
                          <Button className="bg-valorize-600 hover:bg-valorize-700">
                            <ArrowRightLeft className="mr-2 h-4 w-4" />
                            Voir les stocks
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Matching;
