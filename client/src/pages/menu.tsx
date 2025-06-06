import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Search, Filter, ShoppingCart, Plus, Minus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

const categories = [
  { id: "all", name: "All Categories" },
  { id: "main", name: "Main Dishes" },
  { id: "appetizer", name: "Appetizers" },
  { id: "salad", name: "Salads" },
  { id: "soup", name: "Soups" },
  { id: "dessert", name: "Desserts" },
  { id: "beverage", name: "Beverages" }
];

const dietaryTags = [
  { id: "vegan", name: "Vegan" },
  { id: "vegetarian", name: "Vegetarian" },
  { id: "gluten-free", name: "Gluten-Free" },
  { id: "dairy-free", name: "Dairy-Free" },
  { id: "high-protein", name: "High Protein" },
  { id: "keto", name: "Keto-Friendly" },
  { id: "low-carb", name: "Low Carb" },
  { id: "paleo", name: "Paleo" }
];

export default function Menu() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [itemQuantity, setItemQuantity] = useState<Record<number, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  // Fetch menu items
  const { data: menuData, isLoading } = useQuery({
    queryKey: ['/api/menu'],
    queryFn: async () => {
      const res = await fetch('/api/menu');
      if (!res.ok) throw new Error('Failed to fetch menu items');
      return res.json();
    }
  });

  // Fetch cart items
  const { data: cartData, isLoading: cartLoading } = useQuery({
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

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: number, quantity: number }) => {
      const res = await apiRequest('POST', '/api/cart', { productId, quantity });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      toast({
        title: "Added to cart",
        description: "Item has been added to your cart.",
      });
      setItemQuantity({});
    },
    onError: () => {
      toast({
        title: "Failed to add item",
        description: "There was a problem adding this item to your cart.",
        variant: "destructive",
      });
    }
  });

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: async (cartItemId: number) => {
      const res = await apiRequest('DELETE', `/api/cart/${cartItemId}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
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
  const menuItems = menuData?.menuItems || [];
  const cartItems = cartData?.cartItems || [];

  // Filter menu items
  const filteredMenuItems = menuItems.filter((item: any) => {
    const matchesSearch = searchQuery === "" || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    
    const matchesTag = selectedTag === null || 
      (item.tags && item.tags.some((tag: string) => tag.toLowerCase() === selectedTag.toLowerCase()));
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  // Group menu items by category
  const menuItemsByCategory = filteredMenuItems.reduce((acc: any, item: any) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  // Calculate cart total
  const cartTotal = cartItems.reduce((total: number, item: any) => {
    return total + (item.product.price * item.quantity / 100);
  }, 0);

  const handleAddToCart = (item: any) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to add items to your cart.",
        variant: "destructive",
      });
      return;
    }
    
    const quantity = itemQuantity[item.id] || 1;
    addToCartMutation.mutate({ productId: item.id, quantity });
  };

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    setItemQuantity(prev => ({
      ...prev,
      [itemId]: Math.max(1, newQuantity)
    }));
  };

  return (
    <>
      <Helmet>
        <title>Restaurant Menu | HealthHub</title>
        <meta name="description" content="Browse our healthy restaurant menu featuring nutritious, delicious meals crafted with organic ingredients to support your wellness journey." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800">Restaurant Menu</h1>
          <p className="text-neutral-600">Nutritious, delicious meals crafted with organic ingredients</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters & Cart */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Filter Menu</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-neutral-500" />
                      <Input
                        placeholder="Search menu items"
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Dietary Preference</Label>
                      <Select value={selectedTag || ""} onValueChange={(value) => setSelectedTag(value || null)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any preference</SelectItem>
                          {dietaryTags.map((tag) => (
                            <SelectItem key={tag.id} value={tag.id}>{tag.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("all");
                        setSelectedTag(null);
                      }}
                    >
                      <Filter className="h-4 w-4 mr-2" /> Reset Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    My Cart
                    <Badge variant="outline" className="ml-2">
                      {cartItems.reduce((total: number, item: any) => total + item.quantity, 0)} items
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!isAuthenticated ? (
                    <div className="text-center py-6">
                      <ShoppingCart className="h-10 w-10 mx-auto text-neutral-400 mb-2" />
                      <p className="text-neutral-600 mb-4">Please log in to view your cart</p>
                      <Button asChild variant="outline">
                        <a href="/auth/login">Log In</a>
                      </Button>
                    </div>
                  ) : cartLoading ? (
                    <div className="text-center py-4">
                      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <p className="text-sm text-neutral-500 mt-2">Loading cart...</p>
                    </div>
                  ) : cartItems.length > 0 ? (
                    <div>
                      <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                        {cartItems.slice(0, 3).map((item: any) => (
                          <div key={item.id} className="flex items-center justify-between bg-neutral-50 p-2 rounded-md">
                            <div className="flex items-center">
                              <div className="h-10 w-10 bg-neutral-200 rounded mr-2"></div>
                              <div>
                                <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                                <p className="text-xs text-neutral-500">${(item.product.price / 100).toFixed(2)} × {item.quantity}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => {
                                  if (item.quantity > 1) {
                                    updateCartItemMutation.mutate({ id: item.id, quantity: item.quantity - 1 });
                                  } else {
                                    removeFromCartMutation.mutate(item.id);
                                  }
                                }}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm mx-1">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => {
                                  updateCartItemMutation.mutate({ id: item.id, quantity: item.quantity + 1 });
                                }}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        
                        {cartItems.length > 3 && (
                          <div className="text-center text-sm text-neutral-500">
                            +{cartItems.length - 3} more items
                          </div>
                        )}
                      </div>
                      
                      <div className="border-t pt-3">
                        <div className="flex justify-between mb-4">
                          <span className="font-medium">Total</span>
                          <span className="font-bold">${cartTotal.toFixed(2)}</span>
                        </div>
                        
                        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                          <SheetTrigger asChild>
                            <Button className="w-full">View Cart & Checkout</Button>
                          </SheetTrigger>
                          <SheetContent side="right" className="sm:max-w-md">
                            <SheetHeader>
                              <SheetTitle>Your Cart</SheetTitle>
                              <SheetDescription>
                                Review your items before checkout
                              </SheetDescription>
                            </SheetHeader>
                            <div className="py-6">
                              {cartItems.length > 0 ? (
                                <div className="space-y-6">
                                  <div className="space-y-3">
                                    {cartItems.map((item: any) => (
                                      <div key={item.id} className="flex justify-between items-start border-b pb-3">
                                        <div className="flex items-start">
                                          <div className="h-14 w-14 bg-neutral-200 rounded mr-3 flex-shrink-0"></div>
                                          <div>
                                            <p className="font-medium">{item.product.name}</p>
                                            <div className="flex items-center mt-1">
                                              <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-6 w-6 rounded-full"
                                                onClick={() => {
                                                  if (item.quantity > 1) {
                                                    updateCartItemMutation.mutate({ id: item.id, quantity: item.quantity - 1 });
                                                  } else {
                                                    removeFromCartMutation.mutate(item.id);
                                                  }
                                                }}
                                              >
                                                <Minus className="h-3 w-3" />
                                              </Button>
                                              <span className="mx-2">{item.quantity}</span>
                                              <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-6 w-6 rounded-full"
                                                onClick={() => {
                                                  updateCartItemMutation.mutate({ id: item.id, quantity: item.quantity + 1 });
                                                }}
                                              >
                                                <Plus className="h-3 w-3" />
                                              </Button>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="text-right">
                                          <p className="font-medium">${((item.product.price * item.quantity) / 100).toFixed(2)}</p>
                                          <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => removeFromCartMutation.mutate(item.id)}
                                          >
                                            Remove
                                          </Button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  
                                  <div className="bg-neutral-50 p-4 rounded-lg">
                                    <div className="flex justify-between mb-2">
                                      <span className="text-neutral-600">Subtotal</span>
                                      <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                      <span className="text-neutral-600">Tax</span>
                                      <span>${(cartTotal * 0.08).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                      <span className="text-neutral-600">Delivery</span>
                                      <span>$3.99</span>
                                    </div>
                                    <div className="border-t my-2 pt-2 flex justify-between font-bold">
                                      <span>Total</span>
                                      <span>${(cartTotal + (cartTotal * 0.08) + 3.99).toFixed(2)}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <Button className="w-full">Proceed to Checkout</Button>
                                    <Button 
                                      variant="outline" 
                                      className="w-full"
                                      onClick={() => setIsCartOpen(false)}
                                    >
                                      Continue Shopping
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center py-10">
                                  <ShoppingCart className="h-12 w-12 mx-auto text-neutral-400 mb-2" />
                                  <p className="text-neutral-600 mb-4">Your cart is empty</p>
                                  <Button 
                                    variant="outline"
                                    onClick={() => setIsCartOpen(false)}
                                  >
                                    Browse Menu
                                  </Button>
                                </div>
                              )}
                            </div>
                          </SheetContent>
                        </Sheet>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <ShoppingCart className="h-10 w-10 mx-auto text-neutral-400 mb-2" />
                      <p className="text-neutral-600">Your cart is empty</p>
                      <p className="text-sm text-neutral-500 mt-1">Add items to get started</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content - Menu Items */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle>Our Menu</CardTitle>
                    <CardDescription>Nutritionally balanced meals for your wellness journey</CardDescription>
                  </div>
                  <Tabs defaultValue="lunch" className="mt-4 md:mt-0">
                    <TabsList>
                      <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
                      <TabsTrigger value="lunch">Lunch</TabsTrigger>
                      <TabsTrigger value="dinner">Dinner</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-neutral-600 mt-4">Loading menu items...</p>
                  </div>
                ) : filteredMenuItems.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="h-12 w-12 mx-auto text-neutral-400 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <p className="text-neutral-600">No menu items found matching your filters</p>
                    <Button 
                      variant="outline" 
                      className="mt-4" 
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("all");
                        setSelectedTag(null);
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {Object.keys(menuItemsByCategory).map((category) => {
                      const readableCategory = categories.find(c => c.id === category)?.name || category.charAt(0).toUpperCase() + category.slice(1);
                      
                      return (
                        <div key={category}>
                          <h3 className="text-lg font-medium mb-4">{readableCategory}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {menuItemsByCategory[category].map((item: any) => (
                              <div key={item.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition">
                                <div className="relative">
                                  {item.imageUrl && (
                                    <img 
                                      src={item.imageUrl} 
                                      alt={item.name} 
                                      className="w-full h-48 object-cover"
                                    />
                                  )}
                                  <div className="absolute top-2 right-2">
                                    <Badge variant="secondary">${(item.price / 100).toFixed(2)}</Badge>
                                  </div>
                                </div>
                                <div className="p-4">
                                  <h4 className="font-medium text-lg">{item.name}</h4>
                                  <p className="text-sm text-neutral-600 mt-1">{item.description}</p>
                                  
                                  {item.tags && item.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-3">
                                      {item.tags.map((tag: string, index: number) => (
                                        <Badge key={index} variant="outline" className="bg-accent/5 hover:bg-accent/10">
                                          {tag}
                                        </Badge>
                                      ))}
                                    </div>
                                  )}
                                  
                                  {item.nutritionalInfo && (
                                    <div className="grid grid-cols-4 gap-2 mt-3 text-xs text-neutral-500">
                                      <div className="text-center">
                                        <p className="font-medium">{item.nutritionalInfo.calories}</p>
                                        <p>Calories</p>
                                      </div>
                                      <div className="text-center">
                                        <p className="font-medium">{item.nutritionalInfo.protein}g</p>
                                        <p>Protein</p>
                                      </div>
                                      <div className="text-center">
                                        <p className="font-medium">{item.nutritionalInfo.carbs}g</p>
                                        <p>Carbs</p>
                                      </div>
                                      <div className="text-center">
                                        <p className="font-medium">{item.nutritionalInfo.fat}g</p>
                                        <p>Fat</p>
                                      </div>
                                    </div>
                                  )}
                                  
                                  <div className="mt-4 flex items-center">
                                    <div className="flex items-center border rounded-md overflow-hidden mr-3">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 rounded-none"
                                        onClick={() => handleQuantityChange(item.id, (itemQuantity[item.id] || 1) - 1)}
                                      >
                                        <Minus className="h-3 w-3" />
                                      </Button>
                                      <span className="w-8 text-center">{itemQuantity[item.id] || 1}</span>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 rounded-none"
                                        onClick={() => handleQuantityChange(item.id, (itemQuantity[item.id] || 1) + 1)}
                                      >
                                        <Plus className="h-3 w-3" />
                                      </Button>
                                    </div>
                                    <Button 
                                      className="flex-1"
                                      onClick={() => handleAddToCart(item)}
                                      disabled={addToCartMutation.isPending}
                                    >
                                      {addToCartMutation.isPending ? 'Adding...' : 'Add to Order'}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
