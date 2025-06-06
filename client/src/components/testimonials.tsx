import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const getStarRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="ri-star-fill"></i>);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<i key="half" className="ri-star-half-fill"></i>);
    }
    
    // Add empty stars to make 5 total
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="ri-star-line"></i>);
    }
    
    return stars;
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case "clinic":
        return <i className="ri-hospital-line mr-1"></i>;
      case "fitness":
        return <i className="ri-heart-pulse-line mr-1"></i>;
      case "restaurant":
        return <i className="ri-restaurant-line mr-1"></i>;
      case "market":
        return <i className="ri-shopping-basket-line mr-1"></i>;
      default:
        return null;
    }
  };

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">What Our Members Say</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Real stories from people who have transformed their health with our integrated approach.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-neutral-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-neutral-800">{testimonial.name}</h4>
                  <p className="text-sm text-neutral-500">{testimonial.duration}</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex text-yellow-400">
                  {getStarRating(testimonial.rating)}
                </div>
              </div>
              <p className="text-neutral-600 mb-2">"{testimonial.comment}"</p>
              <div className="flex items-center mt-4 text-sm text-neutral-500">
                {testimonial.services.map((service, serviceIndex) => (
                  <span key={serviceIndex} className="flex items-center">
                    {serviceIndex > 0 && <span className="mx-2">•</span>}
                    {getServiceIcon(service)}
                    {service.charAt(0).toUpperCase() + service.slice(1)}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
