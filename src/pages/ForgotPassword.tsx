
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// Define the form schema with validation
const forgotPasswordSchema = z.object({
  email: z.string().email("Adresse e-mail invalide"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  // Initialize react-hook-form with zod validation
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // Form submission handler
  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    
    try {
      // This is a placeholder for actual password reset logic
      console.log("Password reset request for:", data.email);
      
      // Mock successful password reset email
      setTimeout(() => {
        toast.success("Instructions envoyées par e-mail");
        setEmailSent(true);
      }, 1000);
    } catch (error) {
      toast.error("Échec de l'envoi de l'e-mail. Veuillez réessayer.");
      console.error("Password reset error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="text-primary">RE</span>
            <span className="text-eco-600">ENX</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Réinitialisation du mot de passe
          </p>
        </div>
        
        <Card className="glass-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Mot de passe oublié</CardTitle>
            <CardDescription className="text-center">
              {emailSent 
                ? "Consultez votre e-mail pour les instructions de réinitialisation"
                : "Entrez votre adresse e-mail pour recevoir un lien de réinitialisation"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!emailSent ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adresse e-mail</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="nom@exemple.com" 
                              className="pl-10" 
                              type="email"
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full eco-gradient" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Envoi en cours..." : "Envoyer les instructions"}
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="text-center py-4">
                <p className="mb-4 text-sm text-muted-foreground">
                  Un e-mail avec les instructions de réinitialisation a été envoyé à l'adresse fournie, 
                  si elle correspond à un compte existant.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setEmailSent(false)}
                >
                  Essayer une autre adresse e-mail
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <div className="text-center w-full text-sm">
              <Link 
                to="/login" 
                className="text-primary hover:underline underline-offset-4"
              >
                Retour à la connexion
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
