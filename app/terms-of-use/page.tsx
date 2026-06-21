import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-[#0a0710]">
      <Navbar />
      <div className="pt-28 px-6 md:px-16 pb-16 max-w-3xl">
        <h1 className="text-white text-3xl font-bold mb-3">Terms of Use</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="space-y-8 text-gray-300 text-sm leading-relaxed">
          <section>
            <p>
              Welcome to jrfilmsindia.com (the "Service"), operated by JR Films India. By accessing or using our Service, you agree to be bound by these Terms of Use ("Terms"). If you do not agree, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">1. Use of the Service</h2>
            <p>
              The Service provides access to original short films, series, and digital video content created by JR Films India for personal, non-commercial viewing. You agree to use the Service only for lawful purposes and in accordance with these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">2. Intellectual Property</h2>
            <p>
              All content available on the Service, including but not limited to videos, titles, descriptions, images, logos, and branding, is the property of JR Films India or its licensors and is protected by applicable copyright and intellectual property laws. You may not reproduce, distribute, modify, publicly display, or create derivative works from any content without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">3. Prohibited Activities</h2>
            <p className="mb-2">You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Download, copy, or redistribute content without authorization</li>
              <li>Use automated systems (bots, scrapers) to access the Service</li>
              <li>Attempt to gain unauthorized access to any part of the Service, including admin areas</li>
              <li>Use the Service in any way that could damage, disable, or impair its functioning</li>
              <li>Misrepresent your affiliation with JR Films India</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">4. Third-Party Content</h2>
            <p>
              Videos on the Service are embedded via YouTube. Your use of embedded video players is also subject to YouTube's Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">5. Availability of the Service</h2>
            <p>
              We strive to keep the Service available at all times but do not guarantee uninterrupted access. We may modify, suspend, or discontinue any part of the Service at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">6. Disclaimer of Warranties</h2>
            <p>
              The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the Service will be error-free, secure, or uninterrupted.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, JR Films India shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of, or inability to use, the Service.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">8. Changes to These Terms</h2>
            <p>
              We may revise these Terms at any time. Continued use of the Service after changes are posted constitutes your acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">9. Governing Law</h2>
            <p>
              These Terms are governed by the laws of India, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">10. Contact Us</h2>
            <p>
              For questions about these Terms, please contact us through our social media channels listed on our{' '}
              <a href="/about" className="text-purple-400 hover:underline">About page</a>.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}
