
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { 
  Building, 
  Search, 
  ArrowRight, 
  ArrowLeft,
  Filter,
  Users,
  ChevronUp,
  LineChart,
  Percent,
  Timer,
  FileBox,
  CircleDollarSign,
  BarChart
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { 
  findTopMatches, 
  findMatchesForProduct, 
  findMatchesForBuyer,
  sampleProducts,
  sampleBuyers
} from "@/lib/matchingAlgorithm";

const Matching = () => {
  const [activeTab, setActiveTab] = useState("auto");
  const [selectedEntity, setSelectedEntity] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [topMatches, setTopMatches] = useState<any[]>([]);
  const [filteredMatches, setFilteredMatches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      const initialMatches = findTopMatches(10);
      setTopMatches(initialMatches);
      setFilteredMatches(initialMatches);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredMatches(topMatches);
      return;
    }

    const filtered = topMatches.filter(match => 
      match.productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      match.buyerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredMatches(filtered);
  }, [searchTerm, topMatches]);

  // Handle product selection for detailed matching
  const handleProductSelect = (productId: number) => {
    setSelectedEntity(productId);
    const matches = findMatchesForProduct(productId);
    setFilteredMatches(matches);
    setActiveTab("product");
    
    toast.success("Analyse des acheteurs potentiels terminée", {
      description: `${matches.length} acheteurs potentiels trouvés pour ce produit.`
    });
  };

  // Handle buyer selection for detailed matching
  const handleBuyerSelect = (buyerId: number) => {
    setSelectedEntity(buyerId);
    const matches = findMatchesForBuyer(buyerId);
    setFilteredMatches(matches);
    setActiveTab("buyer");
    
    toast.success("Analyse des produits adaptés terminée", {
      description: `${matches.length} produits correspondent aux critères de cet acheteur.`
    });
  };

  // Reset to automatic matching
  const handleResetMatching = () => {
    setActiveTab("auto");
    setSelectedEntity(null);
    setSearchTerm("");
    setFilteredMatches(topMatches);
  };

  // Render match score badge with appropriate color
  const renderScoreBadge = (score: number) => {
    let colorClass = "";
    
    if (score >= 80) colorClass = "bg-green-100 text-green-800 border-green-300";
    else if (score >= 60) colorClass = "bg-valorize-100 text-valorize-700 border-valorize-300";
    else if (score >= 40) colorClass = "bg-amber-100 text-amber-700 border-amber-300";
    else colorClass = "bg-red-100 text-red-800 border-red-300";
    
    return (
      <Badge className={colorClass}>
        {score}/100
      </Badge>
    );
  };

  // Get entity details based on active tab and selected ID
  const getEntityDetails = () => {
    if (activeTab === "product" && selectedEntity) {
      const product = sampleProducts.find(p => p.id === selectedEntity);
      return product ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <Badge>{product.category}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{product.description}</p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Prix</p>
              <p className="font-medium">{product.price} €/{product.category === "Matières premières" ? "kg" : "unité"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Quantité</p>
              <p className="font-medium">{product.quantity} {product.category === "Matières premières" ? "kg" : "unités"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Localisation</p>
              <p className="font-medium">{product.location}</p>
            </div>
          </div>
        </div>
      ) : null;
    } else if (activeTab === "buyer" && selectedEntity) {
      const buyer = sampleBuyers.find(b => b.id === selectedEntity);
      return buyer ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{buyer.name}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Catégorie préférée</p>
              <p className="font-medium">{buyer.preferredCategory}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Localisation</p>
              <p className="font-medium">{buyer.location}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Budget</p>
              <p className="font-medium">{buyer.minPrice} - {buyer.maxPrice} €</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Quantité min.</p>
              <p className="font-medium">{buyer.minQuantity} unités</p>
            </div>
          </div>
        </div>
      ) : null;
    }
    return null;
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Matching</h1>
          <p className="text-muted-foreground">
            Trouvez des partenaires pour valoriser vos stocks dormants ou acquérir des ressources à moindre coût
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="auto" onClick={handleResetMatching}>Matching Automatique</TabsTrigger>
              <TabsTrigger value="product" disabled={activeTab !== "product"}>Recherche d'acheteurs</TabsTrigger>
              <TabsTrigger value="buyer" disabled={activeTab !== "buyer"}>Recherche de produits</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Input 
                placeholder="Rechercher..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="auto" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Produits disponibles</CardTitle>
                  <CardDescription>
                    Sélectionnez un produit pour trouver des acheteurs potentiels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {sampleProducts.map((product) => (
                      <Button 
                        key={product.id} 
                        variant="outline" 
                        className="w-full justify-between text-left h-auto py-2"
                        onClick={() => handleProductSelect(product.id)}
                      >
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                        <FileBox className="h-4 w-4 ml-2 shrink-0" />
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Meilleurs matchs automatiques</CardTitle>
                  <CardDescription>
                    Recommandations basées sur nos algorithmes de matching
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4 animate-pulse">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-muted h-24 rounded-md" />
                      ))}
                    </div>
                  ) : filteredMatches.length > 0 ? (
                    <div className="space-y-4">
                      {filteredMatches.slice(0, 5).map((match, index) => (
                        <div 
                          key={index} 
                          className="border rounded-md p-4 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-start gap-3">
                              <div className="bg-valorize-100 p-2 rounded-full">
                                <Building className="h-4 w-4 text-valorize-700" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium">{match.productName}</p>
                                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                                  <p className="font-medium">{match.buyerName}</p>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {match.matchReasons.slice(0, 2).map((reason: string, i: number) => (
                                    <Badge key={i} variant="outline" className="text-xs font-normal">
                                      {reason}
                                    </Badge>
                                  ))}
                                  {match.matchReasons.length > 2 && (
                                    <Badge variant="outline" className="text-xs font-normal">
                                      +{match.matchReasons.length - 2} autres
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            {renderScoreBadge(match.matchScore)}
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 mt-3">
                            <div className="flex items-center gap-1.5">
                              <Percent className="h-3.5 w-3.5 text-valorize-600" />
                              <span className="text-sm">
                                Probabilité: <strong>{match.prediction.probability}%</strong>
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Timer className="h-3.5 w-3.5 text-amber-600" />
                              <span className="text-sm">
                                Délai: <strong>{match.prediction.estimatedTimeframe}</strong>
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <CircleDollarSign className="h-3.5 w-3.5 text-green-600" />
                              <span className="text-sm">
                                Valeur: <strong>{Math.round(match.prediction.potentialValue)} €</strong>
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Aucun match trouvé pour cette recherche</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Statistiques de matching</CardTitle>
                <CardDescription>Analyse des opportunités par catégorie</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-valorize-100 p-1.5 rounded-sm">
                          <Building className="h-3.5 w-3.5 text-valorize-700" />
                        </div>
                        <span className="font-medium">Matières premières</span>
                      </div>
                      <span className="text-sm font-medium">75% d'opportunités</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-amber-100 p-1.5 rounded-sm">
                          <FileBox className="h-3.5 w-3.5 text-amber-700" />
                        </div>
                        <span className="font-medium">Électronique</span>
                      </div>
                      <span className="text-sm font-medium">60% d'opportunités</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-green-100 p-1.5 rounded-sm">
                          <FileBox className="h-3.5 w-3.5 text-green-700" />
                        </div>
                        <span className="font-medium">Emballage</span>
                      </div>
                      <span className="text-sm font-medium">45% d'opportunités</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="product" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mb-2"
                    onClick={handleResetMatching}
                  >
                    <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                    Retour
                  </Button>
                  <CardTitle className="text-xl">Détails du produit</CardTitle>
                </CardHeader>
                <CardContent>
                  {getEntityDetails()}
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Acheteurs potentiels</CardTitle>
                  <CardDescription>
                    Analyse de compatibilité et prédictions de vente
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Acheteur</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Probabilité</TableHead>
                        <TableHead>Délai</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMatches.map((match, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{match.buyerName}</p>
                              <p className="text-xs text-muted-foreground">
                                {match.matchReasons[0]}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {renderScoreBadge(match.matchScore)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              <Percent className="h-3.5 w-3.5 text-valorize-600" />
                              <span>{match.prediction.probability}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              <Timer className="h-3.5 w-3.5 text-amber-600" />
                              <span>{match.prediction.estimatedTimeframe}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button size="sm">Contacter</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="buyer" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mb-2"
                    onClick={handleResetMatching}
                  >
                    <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                    Retour
                  </Button>
                  <CardTitle className="text-xl">Détails de l'acheteur</CardTitle>
                </CardHeader>
                <CardContent>
                  {getEntityDetails()}
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Produits recommandés</CardTitle>
                  <CardDescription>
                    Produits compatibles avec les critères de l'acheteur
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produit</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Valeur</TableHead>
                        <TableHead>Disponibilité</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMatches.map((match, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{match.productName}</p>
                              <p className="text-xs text-muted-foreground">
                                {match.matchReasons[0]}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {renderScoreBadge(match.matchScore)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              <CircleDollarSign className="h-3.5 w-3.5 text-green-600" />
                              <span>{Math.round(match.prediction.potentialValue)} €</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              <Timer className="h-3.5 w-3.5 text-amber-600" />
                              <span>Immédiate</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button size="sm">Proposer</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Prédictions de marché</CardTitle>
                <CardDescription>
                  Analyse prédictive des tendances pour les produits recherchés
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <BarChart className="h-12 w-12 mx-auto text-valorize-500" />
                  <p className="text-muted-foreground">
                    Graphique prédictif des tendances de marché pour la catégorie sélectionnée
                  </p>
                  <Button variant="outline" size="sm">
                    Voir les détails
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Matching;
