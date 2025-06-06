import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, ArrowLeft, CircleCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";

export default function Cart() {
  const { toast } = useToast();
  const [location, setLocation] = useLocation();
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment' | 'confirmation'>('cart');
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  // Fetch user data
  const { data: userData } = useQuery({
    queryKey: ['/api/auth/me'],
    queryFn: async () => {
      try {
        const res = await apiRequest('GET', '/api/auth/me');
        return res.json();
      } catch (error) {
        return { user: null };
      }
    }
  });

  // Fetch cart items
  const { data: cartData, isLoading } = useQuery({
    queryKey: ['/api/cart'],
    queryFn: async () => {
      try {
        const res = await apiRequest('GET', '/api/cart');
        return res.json();
      } catch (error) {
        return { cartItems: [] };
      }
    },
    enabled: !!userData?.user
  });

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: async (cartItemId: number) => {
      const res = await apiRequest('DELETE', `/api/cart/${cartItemId}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      });
    },
    onError: () => {
      toast({
        title: "Failed to remove item",
        description: "There was a problem removing this item from your cart.",
        variant: "destructive",
      });
    }
  });

  // Update cart item quantity mutation
  const updateCartItemMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: number, quantity: number }) => {
      const res = await apiRequest('PUT', `/api/cart/${id}`, { quantity });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    },
    onError: () => {
      toast({
        title: "Failed to update quantity",
        description: "There was a problem updating the item quantity.",
        variant: "destructive",
      });
    }
  });

  const isAuthenticated = !!userData?.user;
  const cartItems = cartData?.cartItems || [];

  // Calculate cart totals
  const subtotal = cartItems.reduce((total: number, item: any) => {
    return total + (item.product.price * item.quantity / 100);
  }, 0);
  
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.08;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal - discount + tax + shipping;

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to view your cart.",
      });
      setLocation("/auth/login");
    }
  }, [isLoading, isAuthenticated, setLocation, toast]);

  const handlePromoCode = () => {
    if (promoCode.toLowerCase() === "healthhub10") {
      setPromoApplied(true);
      toast({
        title: "Promo code applied",
        description: "10% discount has been applied to your order.",
      });
    } else {
      toast({
        title: "Invalid promo code",
        description: "The promo code you entered is invalid or expired.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCartMutation.mutate(id);
    } else {
      updateCartItemMutation.mutate({ id, quantity });
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Empty cart",
        description: "Your cart is empty. Add some items before checking out.",
        variant: "destructive",
      });
      return;
    }
    setCheckoutStep('shipping');
  };

  const handlePlaceOrder = () => {
    // In a real app, this would submit the order to the server
    setCheckoutStep('confirmation');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-neutral-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (checkoutStep === 'confirmation') {
    return (
      <div className="container mx-auto px-4 py-12">
        <Helmet>
          <title>Order Confirmation | HealthHub</title>
        </Helmet>
        <div className="max-w-lg mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <div className="h-20 w-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CircleCheck className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-neutral-600 mb-6">
              Your order has been received and is being processed. You will receive a confirmation email shortly.
            </p>
            <div className="bg-neutral-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Order Number:</span>
                <span>HH-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Total Amount:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Estimated Delivery:</span>
                <span>Within 24-48 hours</span>
              </div>
            </div>
            <div className="space-y-3">
              <Button onClick={() => setLocation("/")} className="w-full">
                Continue Shopping
              </Button>
              <Button variant="outline" onClick={() => setLocation("/profile")} className="w-full">
                View Order in Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Your Cart | HealthHub</title>
        <meta name="description" content="Review and manage items in your cart before checkout." />
      </Helmet>

      <div className="mb-8 flex items-center">
        <h1 className="text-3xl font-bold text-neutral-800">Your Cart</h1>
        {checkoutStep !== 'cart' && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-4"
            onClick={() => setCheckoutStep('cart')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <ShoppingCart className="h-16 w-16 mx-auto text-neutral-300 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-neutral-600 mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link href="/shop">Browse Organic Market</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/menu">Explore Restaurant Menu</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {checkoutStep === 'cart' && (
              <Card>
                <CardHeader>
                  <CardTitle>Shopping Cart</CardTitle>
                  <CardDescription>{cartItems.length} items in your cart</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cartItems.map((item: any) => (
                      <div key={item.id} className="flex border-b pb-4">
                        <div className="h-24 w-24 bg-neutral-100 rounded-md flex-shrink-0">
                          {item.product.imageUrl && (
                            <img 
                              src={item.product.imageUrl} 
                              alt={item.product.name} 
                              className="h-full w-full object-cover rounded-md"
                            />
                          )}
                        </div>
                        <div className="ml-4 flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{item.product.name}</h3>
                            <span className="font-bold">${((item.product.price * item.quantity) / 100).toFixed(2)}</span>
                          </div>
                          <p className="text-sm text-neutral-500 mt-1">{item.product.description}</p>
                          
                          <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center border rounded-md">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-0 h-8 w-8"
                              onClick={() => removeFromCartMutation.mutate(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href="/shop">Continue Shopping</Link>
                  </Button>
                  <Button onClick={handleCheckout}>Proceed to Checkout</Button>
                </CardFooter>
              </Card>
            )}

            {checkoutStep === 'shipping' && (
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                  <CardDescription>Enter your shipping details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue={userData?.user?.fullName.split(' ')[0] || ''} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue={userData?.user?.fullName.split(' ')[1] || ''} />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input id="address" placeholder="123 Main St" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="City" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" placeholder="State" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" placeholder="ZIP Code" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="Phone Number" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={userData?.user?.email || ''} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Delivery Options</Label>
                      <RadioGroup defaultValue="standard" className="space-y-2">
                        <div className="flex items-start space-x-2 border p-3 rounded-md">
                          <RadioGroupItem value="standard" id="standard" className="mt-1" />
                          <div className="grid gap-1.5 w-full">
                            <Label htmlFor="standard" className="font-medium">Standard Delivery (2-3 business days)</Label>
                            <p className="text-sm text-neutral-500">
                              Free for orders over $50, otherwise $5.99
                            </p>
                          </div>
                          <div className="text-right font-medium">
                            {subtotal > 50 ? 'Free' : '$5.99'}
                          </div>
                        </div>
                        <div className="flex items-start space-x-2 border p-3 rounded-md">
                          <RadioGroupItem value="express" id="express" className="mt-1" />
                          <div className="grid gap-1.5 w-full">
                            <Label htmlFor="express" className="font-medium">Express Delivery (1 business day)</Label>
                            <p className="text-sm text-neutral-500">
                              Faster delivery option for urgent orders
                            </p>
                          </div>
                          <div className="text-right font-medium">
                            $12.99
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setCheckoutStep('cart')}>
                    Back to Cart
                  </Button>
                  <Button onClick={() => setCheckoutStep('payment')}>
                    Continue to Payment
                  </Button>
                </CardFooter>
              </Card>
            )}

            {checkoutStep === 'payment' && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Choose how you want to pay</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="credit-card" value={paymentMethod} onValueChange={setPaymentMethod}>
                    <TabsList className="grid grid-cols-3 mb-6">
                      <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
                      <TabsTrigger value="paypal">PayPal</TabsTrigger>
                      <TabsTrigger value="apple-pay">Apple Pay</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="credit-card">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input id="cardName" placeholder="John Doe" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" />
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="paypal">
                      <div className="text-center py-12">
                        <div className="mx-auto w-16 h-16 bg-[#0070ba] rounded-full flex items-center justify-center mb-4">
                          <span className="font-bold text-white">P</span>
                        </div>
                        <p className="text-neutral-600 mb-4">
                          You will be redirected to PayPal to complete your purchase securely.
                        </p>
                        <Button>Continue with PayPal</Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="apple-pay">
                      <div className="text-center py-12">
                        <div className="mx-auto w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <path d="M12 1a11 11 0 0 0-11 11c0 6.075 4.925 11 11 11s11-4.925 11-11c0-6.075-4.925-11-11-11z" />
                          </svg>
                        </div>
                        <p className="text-neutral-600 mb-4">
                          Pay quickly and securely with Apple Pay.
                        </p>
                        <Button className="bg-black hover:bg-neutral-800">
                          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <path d="M12 1a11 11 0 0 0-11 11c0 6.075 4.925 11 11 11s11-4.925 11-11c0-6.075-4.925-11-11-11z" />
                          </svg>
                          Pay
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setCheckoutStep('shipping')}>
                    Back to Shipping
                  </Button>
                  <Button onClick={handlePlaceOrder}>
                    Place Order
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    {cartItems.map((item: any) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.quantity} × {item.product.name}</span>
                        <span>${((item.product.price * item.quantity) / 100).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    {promoApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount (10%)</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  {!promoApplied && checkoutStep === 'cart' && (
                    <div className="pt-4">
                      <Label htmlFor="promo" className="text-sm">Promo Code</Label>
                      <div className="flex gap-2 mt-1">
                        <Input 
                          id="promo" 
                          placeholder="Enter code" 
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <Button 
                          variant="outline" 
                          onClick={handlePromoCode}
                          disabled={!promoCode}
                        >
                          Apply
                        </Button>
                      </div>
                      <p className="text-xs text-neutral-500 mt-1">Try "HEALTHHUB10" for 10% off</p>
                    </div>
                  )}
                </div>
              </CardContent>
              
              {checkoutStep === 'cart' && (
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Proceed to Checkout
                  </Button>
                </CardFooter>
              )}
            </Card>
            
            {checkoutStep === 'cart' && (
              <div className="mt-4 bg-neutral-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">We Accept</h3>
                <div className="flex gap-2">
                  <div className="h-8 w-12 bg-neutral-200 rounded"></div>
                  <div className="h-8 w-12 bg-neutral-200 rounded"></div>
                  <div className="h-8 w-12 bg-neutral-200 rounded"></div>
                  <div className="h-8 w-12 bg-neutral-200 rounded"></div>
                </div>
                <div className="mt-4 text-sm text-neutral-600">
                  <p className="mb-2">
                    <span className="font-medium">Free Shipping</span> on orders over $50
                  </p>
                  <p>
                    <span className="font-medium">Secure Checkout</span> with encryption
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
