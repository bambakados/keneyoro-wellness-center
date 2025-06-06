import BusinessCard from "@/components/business-card";
import { Button } from "@/components/ui/button";
import { Download, Share2, Printer } from "lucide-react";
import { Helmet } from "react-helmet";

export default function BusinessCardPage() {
  const handleDownload = () => {
    // Simple print dialog which allows saving as PDF
    const printContent = `
      <html>
        <head>
          <title>KeneYoro Business Card</title>
          <style>
            body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
            .card { max-width: 400px; margin: 0 auto; }
          </style>
        </head>
        <body>
          <div class="card">
            ${document.getElementById('business-card')?.innerHTML || ''}
          </div>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'KeneYoro Wellness Center',
          text: 'Discover holistic wellness with authentic African traditions and modern healthcare',
          url: window.location.origin
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback for browsers without native sharing
      navigator.clipboard.writeText(window.location.origin);
      alert('Website link copied to clipboard!');
    }
  };

  return (
    <>
      <Helmet>
        <title>Business Card - KeneYoro Wellness Center</title>
        <meta name="description" content="KeneYoro Integrated Wellness Center business card featuring authentic African wellness traditions and modern healthcare services." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🌿 KeneYoro Business Card
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional business card showcasing our integrated wellness center that combines 
            authentic Mandingo healing traditions with modern healthcare excellence.
          </p>
        </div>

        {/* Business Card Display */}
        <div className="flex justify-center mb-8">
          <div id="business-card">
            <BusinessCard />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <Button onClick={handleDownload} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Print/Download
          </Button>
          <Button onClick={handleShare} variant="outline" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>

        {/* Digital Business Card Features */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-8">Professional Wellness Services</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="text-4xl mb-3">🏥</div>
              <h3 className="font-semibold text-blue-800 mb-2">Modern Clinic</h3>
              <p className="text-sm text-blue-700">
                Comprehensive medical services with specialized chiropractic care and wellness consultations.
              </p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="text-4xl mb-3">🧘‍♀️</div>
              <h3 className="font-semibold text-green-800 mb-2">Fitness Center</h3>
              <p className="text-sm text-green-700">
                State-of-the-art gym facilities with yoga, strength training, and wellness challenges.
              </p>
            </div>

            <div className="text-center p-6 bg-orange-50 rounded-xl">
              <div className="text-4xl mb-3">🥗</div>
              <h3 className="font-semibold text-orange-800 mb-2">Healthy Dining</h3>
              <p className="text-sm text-orange-700">
                Authentic African cuisine featuring traditional healing foods and superfood ingredients.
              </p>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="text-4xl mb-3">🌿</div>
              <h3 className="font-semibold text-purple-800 mb-2">Organic Store</h3>
              <p className="text-sm text-purple-700">
                Premium wellness products, supplements, and organic foods for optimal health.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Founded by Ibrahim Bamba
              </h3>
              <p className="text-gray-700 max-w-2xl mx-auto">
                An American citizen with deep Mandingo roots in Guinea, Ibrahim brings decades of 
                experience in combining traditional African wellness wisdom with modern healthcare 
                innovation through Bamba & Family LLC, established in 2014.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-center mb-6">Get in Touch</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="font-medium text-gray-600">Phone:</span>
              <a href="tel:+12674013733" className="text-blue-600 hover:underline">(267) 401-3733</a>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="font-medium text-gray-600">Email:</span>
              <a href="mailto:ibamba@bambafamilyllc.com" className="text-blue-600 hover:underline">
                ibamba@bambafamilyllc.com
              </a>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="font-medium text-gray-600">Address:</span>
              <span className="text-gray-800">10 Mill Street, Mount Holly, NJ 08060</span>
            </div>
            
            <div className="flex items-center justify-between py-3">
              <span className="font-medium text-gray-600">Website:</span>
              <a href="https://www.bambafamilyllc.com" target="_blank" rel="noopener noreferrer" 
                 className="text-blue-600 hover:underline">
                www.bambafamilyllc.com
              </a>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}