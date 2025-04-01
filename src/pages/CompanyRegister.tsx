
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Mail, Phone, User, Briefcase, Users, MapPin } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

// Définition du schéma de validation
const companySchema = z.object({
  name: z.string().min(2, "Le nom de l'entreprise doit contenir au moins 2 caractères"),
  address: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  zipCode: z.string().regex(/^\d{5}$/, "Le code postal doit contenir 5 chiffres"),
  city: z.string().min(2, "Le nom de la ville doit contenir au moins 2 caractères"),
  activity: z.string().min(3, "L'activité doit contenir au moins 3 caractères"),
  siret: z.string().regex(/^\d{14}$/, "Le numéro SIRET doit contenir 14 chiffres"),
  email: z.string().email("Adresse e-mail invalide"),
  phone: z.string().regex(/^0\d{9}$/, "Le numéro de téléphone doit être au format 0XXXXXXXXX"),
  contactName: z.string().min(2, "Le nom du contact doit contenir au moins 2 caractères"),
  contactRole: z.string().min(2, "La fonction doit contenir au moins 2 caractères"),
  employeesCount: z.string(),
});

type CompanyFormValues = z.infer<typeof companySchema>;

const employeeCountOptions = [
  { value: "1-9", label: "1 à 9 employés" },
  { value: "10-49", label: "10 à 49 employés" },
  { value: "50-249", label: "50 à 249 employés" },
  { value: "250+", label: "250 employés et plus" },
];

const CompanyRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Initialisation du formulaire avec validation Zod
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      address: "",
      zipCode: "",
      city: "",
      activity: "",
      siret: "",
      email: "",
      phone: "",
      contactName: "",
      contactRole: "",
      employeesCount: "1-9",
    },
  });

  // Fonction de soumission du formulaire
  const onSubmit = async (data: CompanyFormValues) => {
    setIsLoading(true);
    
    try {
      // Simulation d'une inscription réussie
      console.log("Données d'inscription:", data);
      
      setTimeout(() => {
        toast.success("Entreprise enregistrée avec succès");
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      toast.error("Une erreur s'est produite lors de l'inscription");
      console.error("Erreur d'inscription:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="text-primary">RE</span>
            <span className="text-eco-600">ENX</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Inscription de votre entreprise
          </p>
        </div>
        
        <Card className="glass-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Données de l'entreprise</CardTitle>
            <CardDescription className="text-center">
              Complétez les informations ci-dessous pour inscrire votre entreprise
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Information d'entreprise */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Informations générales</h3>
                    
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom de l'entreprise</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="Nom de l'entreprise" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="activity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Activité principale</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="Secteur d'activité" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="siret"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Numéro SIRET</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="14 chiffres" 
                              {...field} 
                              onChange={(e) => {
                                // Ne permet que les chiffres
                                const value = e.target.value.replace(/\D/g, '');
                                field.onChange(value);
                              }}
                              maxLength={14}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="employeesCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre de salariés</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <div className="relative">
                                <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                                <SelectTrigger className="pl-10">
                                  <SelectValue placeholder="Sélectionnez une tranche" />
                                </SelectTrigger>
                              </div>
                            </FormControl>
                            <SelectContent>
                              {employeeCountOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Adresse */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Adresse</h3>
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Textarea 
                                placeholder="Numéro et nom de rue" 
                                className="pl-10 min-h-24" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Code postal</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Code postal" 
                                {...field} 
                                onChange={(e) => {
                                  // Ne permet que les chiffres
                                  const value = e.target.value.replace(/\D/g, '');
                                  field.onChange(value);
                                }}
                                maxLength={5}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ville</FormLabel>
                            <FormControl>
                              <Input placeholder="Ville" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Coordonnées */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Coordonnées</h3>
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse e-mail</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="nom@exemple.com" className="pl-10" type="email" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Numéro de téléphone</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input 
                                placeholder="0XXXXXXXXX" 
                                className="pl-10" 
                                {...field} 
                                onChange={(e) => {
                                  // Ne permet que les chiffres
                                  const value = e.target.value.replace(/\D/g, '');
                                  field.onChange(value);
                                }}
                                maxLength={10}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Contact principal */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Contact principal</h3>
                    
                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom du contact</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="Prénom et nom" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactRole"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fonction</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="Poste occupé" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center pt-4">
                  <Button 
                    type="submit" 
                    className="w-full max-w-md eco-gradient" 
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Traitement en cours..." : "Inscrire l'entreprise"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          
          <CardFooter className="flex flex-col items-center">
            <div className="text-center text-sm mt-2">
              Vous avez déjà un compte ?{" "}
              <Link 
                to="/login" 
                className="text-primary hover:underline underline-offset-4"
              >
                Se connecter
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CompanyRegister;
