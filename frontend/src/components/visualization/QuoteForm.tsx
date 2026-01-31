import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { submitQuoteRequest } from '@/lib/openrouter';

const quoteFormSchema = z.object({
  name: z.string().trim().min(1, 'Név megadása kötelező').max(100, 'A név legfeljebb 100 karakter lehet'),
  email: z.string().trim().email('Kérjük, adjon meg érvényes email címet').max(255, 'Az email legfeljebb 255 karakter lehet'),
  phone: z.string().trim().min(1, 'Telefonszám megadása kötelező').max(20, 'A telefonszám legfeljebb 20 karakter lehet'),
  address: z.string().trim().min(1, 'Cím megadása kötelező').max(500, 'A cím legfeljebb 500 karakter lehet'),
  message: z.string().trim().max(1000, 'Az üzenet legfeljebb 1000 karakter lehet').optional(),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

interface QuoteFormProps {
  originalImage?: string;
  generatedImage?: string;
  selectedStone?: string;
}

export function QuoteForm({ originalImage, generatedImage, selectedStone }: QuoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      message: '',
    },
  });

  const onSubmit = async (data: QuoteFormValues) => {
    setIsSubmitting(true);
    
    try {
      await submitQuoteRequest({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        message: data.message || '',
        originalImageUrl: originalImage,
        generatedImageUrl: generatedImage,
        selectedStone,
      });
      setIsSuccess(true);
    } catch (error) {
      console.error('Failed to submit quote:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">Árajánlat Kérés Elküldve!</h3>
              <p className="text-muted-foreground mt-2">
                Köszönjük érdeklődését. 24-48 órán belül részletes árajánlattal jelentkezünk.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Árajánlat Kérése</CardTitle>
        <CardDescription>
          Tetszik amit lát? Töltse ki az alábbi űrlapot, és személyre szabott árajánlattal jelentkezünk.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Név</FormLabel>
                    <FormControl>
                      <Input placeholder="Kovács János" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefonszám</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+36 30 123 4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ingatlan Címe</FormLabel>
                    <FormControl>
                      <Input placeholder="1234 Budapest, Fő utca 1." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                  <FormItem>
                    <FormLabel>További Részletek (Opcionális)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Meséljen többet a projektről, határidőről vagy különleges igényekről..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
              )}
            />
            
            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Küldés...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Árajánlat Kérése
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
