import { Link } from "wouter";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Wellness Journey Today</h2>
        <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
          Experience our integrated approach to health and wellness with a complimentary consultation.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/consultation">
            <a className="bg-white text-primary hover:bg-neutral-100 font-semibold py-3 px-8 rounded-lg transition shadow-lg text-center">
              Book Free Consultation
            </a>
          </Link>
          <Link href="/membership">
            <a className="bg-transparent hover:bg-white/10 border border-white text-white font-semibold py-3 px-8 rounded-lg transition text-center">
              Explore Membership Options
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
