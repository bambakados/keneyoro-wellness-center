import { Card, CardContent } from "@/components/ui/card";

export default function OurStory() {
  return (
    <section className="py-20 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Our Story</h2>
            <p className="text-xl text-neutral-600">
              From pandemic observations to comprehensive wellness innovation
            </p>
          </div>

          <div className="space-y-12">
            {/* Origin Story */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="lg:w-1/3">
                    <div className="h-32 w-32 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                      <svg className="h-16 w-16 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-center mt-4 text-neutral-900">2019 - The Beginning</h3>
                  </div>
                  <div className="lg:w-2/3">
                    <p className="text-lg text-neutral-700 leading-relaxed">
                      When COVID-19 emerged in 2019, our founder Ibrahim Bamba began closely observing patterns in human health and daily activities. Through careful documentation of how the pandemic affected community wellness, sleep patterns, nutrition habits, and mental health, a clear vision emerged: the need for integrated, holistic health solutions that address the whole person, not just symptoms.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Evolution */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
                  <div className="lg:w-1/3">
                    <div className="h-32 w-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <svg className="h-16 w-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-center mt-4 text-neutral-900">2020-2023 - Evolution</h3>
                  </div>
                  <div className="lg:w-2/3">
                    <p className="text-lg text-neutral-700 leading-relaxed">
                      The initial health observations revealed critical gaps in traditional healthcare delivery. People needed accessible telehealth services, preventive health assessments, fitness guidance, proper nutrition, and organic food options - all integrated into one seamless experience. This insight drove the development of what would become KeneYoro, meaning "Wellness Center" in the Mandingo language, honoring our founder's West African heritage.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Present Day */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="lg:w-1/3">
                    <div className="h-32 w-32 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <svg className="h-16 w-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-center mt-4 text-neutral-900">2024 - Today</h3>
                  </div>
                  <div className="lg:w-2/3">
                    <p className="text-lg text-neutral-700 leading-relaxed">
                      Today, KeneYoro stands as a comprehensive wellness platform combining advanced telehealth services, cutting-edge health diagnostics with 120+ biomarkers, personalized fitness programs, nutritious dining options, and an organic marketplace. What began as pandemic health observations has evolved into a revolutionary approach to preventive care and holistic wellness, serving communities with the integrated health solutions they truly need.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mission Statement */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-xl leading-relaxed max-w-3xl mx-auto">
                Born from the lessons of a global health crisis, KeneYoro is committed to transforming healthcare through integrated wellness solutions that honor both cutting-edge medical science and timeless cultural wisdom about health and community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}