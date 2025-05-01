
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(1, { message: "Please select a subject." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      form.reset();
      toast.success("Your message has been sent successfully!");
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-hotel-blue to-hotel-dark-blue text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Have questions or need assistance? We're here to help.
            </p>
          </div>
        </section>
        
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Contact Information */}
              <div className="lg:w-1/3">
                <h2 className="text-2xl font-semibold text-hotel-blue mb-6">Get in Touch</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Customer Support</h3>
                    <p className="text-gray-600 mb-1">For booking assistance and general inquiries:</p>
                    <p className="text-hotel-blue">support@stayaweigh.com</p>
                    <p className="text-hotel-blue">+1 (800) 555-1234</p>
                    <p className="text-gray-600 mt-2">Available 24/7</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Business Inquiries</h3>
                    <p className="text-gray-600 mb-1">For partnership and business opportunities:</p>
                    <p className="text-hotel-blue">partnerships@stayaweigh.com</p>
                    <p className="text-hotel-blue">+1 (800) 555-5678</p>
                    <p className="text-gray-600 mt-2">Monday - Friday: 9AM - 5PM EST</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Headquarters</h3>
                    <p className="text-gray-600">123 Hospitality Lane</p>
                    <p className="text-gray-600">San Francisco, CA 94105</p>
                    <p className="text-gray-600">United States</p>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((platform) => (
                      <a 
                        key={platform} 
                        href="#" 
                        className="bg-hotel-light-blue text-hotel-blue px-4 py-2 rounded-full text-sm hover:bg-hotel-blue hover:text-white transition-colors"
                      >
                        {platform}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="lg:w-2/3">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-semibold text-hotel-blue mb-6">Send Us a Message</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your full name" {...field} />
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
                                <Input placeholder="Your email address" type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a subject" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="booking-inquiry">Booking Inquiry</SelectItem>
                                <SelectItem value="cancellation">Cancellation Request</SelectItem>
                                <SelectItem value="feedback">Feedback</SelectItem>
                                <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                                <SelectItem value="support">Technical Support</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="How can we help you?" 
                                className="min-h-32" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Please provide as much detail as possible so we can best assist you.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-hotel-blue hover:bg-hotel-dark-blue"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-16 px-4 bg-hotel-light-gray">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-semibold text-hotel-blue mb-2">Our Location</h2>
              <p className="text-gray-600">Visit our headquarters in downtown San Francisco</p>
            </div>
            
            <div className="h-96 bg-gray-300 rounded-lg overflow-hidden">
              {/* In a real implementation, this would be a Google Maps or other map component */}
              <div className="w-full h-full flex items-center justify-center bg-blue-50">
                <p className="text-gray-500">Interactive Map Would Be Displayed Here</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-semibold text-hotel-blue mb-2">Frequently Asked Questions</h2>
              <p className="text-gray-600">Find quick answers to common questions</p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "How do I modify or cancel my reservation?",
                  answer: "You can modify or cancel your reservation by logging into your account, navigating to 'My Bookings', and selecting the reservation you wish to change. Please note that cancellation policies vary by hotel."
                },
                {
                  question: "Is there a fee for using StayAweigh's booking service?",
                  answer: "No, our booking service is completely free for travelers. We don't charge any booking fees or hidden charges."
                },
                {
                  question: "How do I become a hotel partner?",
                  answer: "If you'd like to list your property on StayAweigh, please contact our partnerships team at partnerships@stayaweigh.com or fill out the contact form with the subject 'Partnership Opportunity'."
                },
                {
                  question: "What happens if I arrive at the hotel and my room is not available?",
                  answer: "In the rare event that your reserved room is not available upon arrival, please contact our 24/7 customer support immediately. We'll work with the hotel to find a suitable alternative and may provide compensation depending on the circumstances."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-hotel-blue mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
