
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileUp, Database, Check, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez sélectionner un fichier à importer",
      });
      return;
    }

    setIsUploading(true);

    // Simulation d'un chargement
    setTimeout(() => {
      setIsUploading(false);
      setIsSuccess(true);
      toast({
        title: "Import réussi",
        description: `Le fichier ${file.name} a été importé avec succès.`,
      });
    }, 2000);
  };

  const sampleData = [
    { id: "PRD-001", nom: "Acier inoxydable 304", categorie: "Matières premières", quantite: 250, valeur: 12500, etat: "Excédentaire" },
    { id: "PRD-002", nom: "Composant électronique XB42", categorie: "Pièces détachées", quantite: 180, valeur: 7200, etat: "Obsolète" },
    { id: "PRD-003", nom: "Carton triple cannelure", categorie: "Emballages", quantite: 500, valeur: 3000, etat: "Peu utilisé" },
    { id: "PRD-004", nom: "Connecteur RJ45 renforcé", categorie: "Pièces détachées", quantite: 750, valeur: 3750, etat: "Excédentaire" },
    { id: "PRD-005", nom: "Coussin de protection", categorie: "Emballages", quantite: 320, valeur: 1920, etat: "Peu utilisé" },
  ];

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Import de stocks</h1>
        <p className="text-muted-foreground">
          Importez vos stocks dormants pour identifier les opportunités de valorisation
        </p>
      </div>

      <Tabs defaultValue="file" className="max-w-5xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="file" className="flex items-center gap-2">
            <FileUp className="h-4 w-4" />
            <span>Import de fichier</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span>Connexion API</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="file">
          <Card>
            <CardHeader>
              <CardTitle>Import par fichier</CardTitle>
              <CardDescription>
                Importez vos données via un fichier CSV ou Excel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file">Fichier (CSV, XLS, XLSX)</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".csv,.xls,.xlsx"
                  onChange={handleFileChange}
                />
                <p className="text-sm text-muted-foreground">
                  Formats supportés: CSV, Excel (.xls, .xlsx)
                </p>
              </div>

              {isSuccess && (
                <Alert className="border-eco-200 bg-eco-50">
                  <Check className="h-4 w-4 text-eco-600" />
                  <AlertTitle className="text-eco-700">Import réussi</AlertTitle>
                  <AlertDescription className="text-eco-600">
                    Votre fichier a été importé avec succès. Vous pouvez consulter les données ci-dessous.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleUpload} 
                disabled={!file || isUploading}
                className="bg-valorize-600 hover:bg-valorize-700"
              >
                {isUploading ? "Importation en cours..." : "Importer"}
              </Button>
            </CardFooter>
          </Card>

          {isSuccess && (
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Aperçu des données</CardTitle>
                  <CardDescription>
                    Les données importées ont été analysées avec succès
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption>Liste des stocks dormants importés</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Référence</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Catégorie</TableHead>
                        <TableHead>Quantité</TableHead>
                        <TableHead className="text-right">Valeur (€)</TableHead>
                        <TableHead>État</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleData.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.id}</TableCell>
                          <TableCell>{item.nom}</TableCell>
                          <TableCell>{item.categorie}</TableCell>
                          <TableCell>{item.quantite}</TableCell>
                          <TableCell className="text-right">{item.valeur.toLocaleString()}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              item.etat === "Excédentaire" ? "bg-valorize-100 text-valorize-700" :
                              item.etat === "Obsolète" ? "bg-red-100 text-red-700" :
                              "bg-amber-100 text-amber-700"
                            }`}>
                              {item.etat}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>Connexion API</CardTitle>
              <CardDescription>
                Connectez votre ERP ou système de gestion de stock via API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-url">URL de l'API</Label>
                <Input id="api-url" placeholder="https://api.votresysteme.com/stocks" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-key">Clé API</Label>
                <Input id="api-key" type="password" placeholder="Votre clé API" />
              </div>
              <Alert className="border-amber-200 bg-amber-50">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertTitle className="text-amber-700">Important</AlertTitle>
                <AlertDescription className="text-amber-600">
                  Assurez-vous que votre API est configurée pour fournir les données dans un format compatible.
                  Consultez notre documentation pour plus d'informations.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button className="bg-valorize-600 hover:bg-valorize-700">
                Connecter
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Upload;
