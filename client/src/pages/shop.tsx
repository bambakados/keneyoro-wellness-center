import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Search, Filter, ShoppingBag, Plus, Minus, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

const categories = [
  { id: "all", name: "All Categories" },
  { id: "produce", name: "Fresh Produce" },
  { id: "supplements", name: "Supplements" },
  { id: "beverages", name: "Beverages" },
  { id: "pantry", name: "Pantry Items" },
  { id: "prepared", name: "Prepared Meals" }
];

const tags = [
  { id: "organic", name: "Organic" },
  { id: "local", name: "Local" },
  { id: "fresh", name: "Fresh" },
  { id: "gluten-free", name: "Gluten-Free" },
  { id: "vegan", name: "Vegan" },
  { id: "non-gmo", name: "Non-GMO" },
  { id: "sustainably-sourced", name: "Sustainably Sourced" }
];

export default function Shop() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [itemQuantity, setItemQuantity] = useState<Record<number, number>>({});

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

  // Fetch store products
  const { data: productsData, isLoading } = useQuery({
    queryKey: ['/api/store'],
    queryFn: async () => {
      const res = await fetch('/api/store');
      if (!res.ok) throw new Error('Failed to fetch store products');
      return res.json();
    }
  });

  // Fetch cart items count
  const { data: cartData } = useQuery({
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

  const isAuthenticated = !!userData?.user;
  const products = productsData?.products || [];
  const cartItems = cartData?.cartItems || [];
  const cartItemsCount = cartItems.reduce((acc: number, item: any) => acc + item.quantity, 0);

  // Filter products
  const filteredProducts = products.filter((product: any) => {
    const matchesSearch = searchQuery === "" || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    
    const matchesTag = selectedTag === null || 
      (product.tags && product.tags.some((tag: string) => tag.toLowerCase() === selectedTag.toLowerCase()));
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  // Group products by category
  const productsByCategory = filteredProducts.reduce((acc: any, product: any) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  const handleAddToCart = (product: any) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to add items to your cart.",
        variant: "destructive",
      });
      return;
    }
    
    const quantity = itemQuantity[product.id] || 1;
    addToCartMutation.mutate({ productId: product.id, quantity });
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setItemQuantity(prev => ({
      ...prev,
      [productId]: Math.max(1, newQuantity)
    }));
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
  };

  return (
    <>
      <Helmet>
        <title>Organic Market | HealthHub</title>
        <meta name="description" content="Shop our carefully curated selection of organic produce, supplements, and wellness products to support your healthy lifestyle at home." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-800">Organic Market</h1>
            <p className="text-neutral-600">Curated selection of organic produce and wellness products</p>
          </div>
          
          {isAuthenticated && (
            <Link href="/cart">
              <a className="mt-4 md:mt-0 inline-flex items-center bg-white border border-neutral-200 hover:bg-neutral-50 px-4 py-2 rounded-lg shadow-sm transition">
                <ShoppingBag className="h-5 w-5 mr-2 text-primary" />
                <span className="font-medium">Cart</span>
                {cartItemsCount > 0 && (
                  <Badge className="ml-2 bg-primary">{cartItemsCount}</Badge>
                )}
              </a>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filter Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-neutral-500" />
                    <Input
                      placeholder="Search products"
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
                    <Label>Product Type</Label>
                    <Select value={selectedTag || ""} onValueChange={(value) => setSelectedTag(value || null)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any type</SelectItem>
                        {tags.map((tag) => (
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
            
            <div className="mt-6 bg-neutral-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3">Health Points Program</h3>
              <p className="text-neutral-600 text-sm mb-4">
                Earn points with every purchase that can be redeemed for discounts on future orders or wellness services.
              </p>
              <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Current Points</span>
                  <span className="font-bold text-primary">245</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: "70%" }}></div>
                </div>
                <p className="text-xs text-neutral-500 mt-2">105 points until your next reward</p>
              </div>
              <Button variant="outline" className="w-full">Learn More</Button>
            </div>
          </div>

          {/* Main Content - Products */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle>Our Products</CardTitle>
                    <CardDescription>Fresh and organic products for your health</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-neutral-600 mt-4">Loading products...</p>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="h-12 w-12 mx-auto text-neutral-400 mb-2" />
                    <p className="text-neutral-600">No products found matching your filters</p>
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
                    {Object.keys(productsByCategory).map((category) => (
                      <div key={category}>
                        <h3 className="text-lg font-medium mb-4">{getCategoryName(category)}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {productsByCategory[category].map((product: any) => (
                            <div key={product.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition">
                              <div className="relative">
                                {product.imageUrl && (
                                  <img 
                                    src={product.imageUrl} 
                                    alt={product.name} 
                                    className="w-full h-40 object-cover"
                                  />
                                )}
                                {product.tags.includes('Organic') && (
                                  <div className="absolute top-2 right-2">
                                    <Badge className="bg-accent text-white">Organic</Badge>
                                  </div>
                                )}
                              </div>
                              <div className="p-4">
                                <h4 className="font-medium">{product.name}</h4>
                                <p className="text-sm text-neutral-600 mt-1">{product.description}</p>
                                
                                {product.tags && product.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {product.tags.filter((tag: string) => tag !== 'Organic').map((tag: string, index: number) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                                
                                <div className="mt-3 flex items-center justify-between">
                                  <span className="font-bold text-primary">${(product.price / 100).toFixed(2)}</span>
                                  
                                  {product.inStock ? (
                                    <div className="flex items-center">
                                      <div className="flex items-center border rounded-md overflow-hidden mr-2">
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-7 w-7 rounded-none"
                                          onClick={() => handleQuantityChange(product.id, (itemQuantity[product.id] || 1) - 1)}
                                        >
                                          <Minus className="h-3 w-3" />
                                        </Button>
                                        <span className="w-7 text-center text-sm">{itemQuantity[product.id] || 1}</span>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-7 w-7 rounded-none"
                                          onClick={() => handleQuantityChange(product.id, (itemQuantity[product.id] || 1) + 1)}
                                        >
                                          <Plus className="h-3 w-3" />
                                        </Button>
                                      </div>
                                      <Button 
                                        size="sm" 
                                        onClick={() => handleAddToCart(product)}
                                        disabled={addToCartMutation.isPending}
                                      >
                                        <ShoppingCart className="h-4 w-4 mr-1" />
                                        {addToCartMutation.isPending ? '...' : 'Add'}
                                      </Button>
                                    </div>
                                  ) : (
                                    <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                                      Out of stock
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="mt-8 bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-xl">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-2/3 mb-4 md:mb-0 md:pr-6">
                  <h3 className="text-xl font-bold text-primary mb-2">Subscribe & Save</h3>
                  <p className="text-neutral-700">
                    Get your favorite organic products delivered regularly and save 10% on every order. 
                    Perfect for your staple items!
                  </p>
                </div>
                <div className="md:w-1/3 text-center">
                  <Button className="bg-primary hover:bg-primary-dark">
                    Learn About Subscriptions
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
