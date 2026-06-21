import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0a0710]">
      <Navbar />
      <div className="pt-28 px-6 md:px-16 pb-16 max-w-3xl">
        <h1 className="text-white text-3xl font-bold mb-3">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="space-y-8 text-gray-300 text-sm leading-relaxed">
          <section>
            <p>
              JR Films India ("we," "us," or "our") operates the website jrfilmsindia.com (the "Service"). This Privacy Policy explains how we collect, use, and protect information when you use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">1. Information We Collect</h2>
            <p className="mb-2">We may collect the following types of information:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-white">Usage Data:</strong> Pages visited, videos watched, time spent, and general interaction with the Service.</li>
              <li><strong className="text-white">Device Information:</strong> Browser type, device type, operating system, and IP address.</li>
              <li><strong className="text-white">Cookies:</strong> We may use cookies and similar tracking technologies to improve your experience.</li>
            </ul>
            <p className="mt-2">
              We do not currently require account registration to browse or watch content, so we do not collect personal information such as your name or email address unless you voluntarily provide it (for example, by contacting us).
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">2. How We Use Information</h2>
            <p className="mb-2">We use collected information to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Operate, maintain, and improve the Service</li>
              <li>Understand viewing trends and popular content</li>
              <li>Detect and prevent technical issues or misuse</li>
              <li>Communicate with you if you contact us directly</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">3. Third-Party Services</h2>
            <p>
              Our Service embeds videos hosted on YouTube. When you watch a video, YouTube's own privacy policy and terms apply to that interaction. We encourage you to review{' '}
              <a href="https://policies.google.com/privacy" target="_blank" className="text-purple-400 hover:underline">Google's Privacy Policy</a>{' '}
              for more information on how YouTube handles your data.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">4. Data Sharing</h2>
            <p>
              We do not sell, rent, or trade your personal information to third parties. We may share aggregated, non-identifying information (such as overall view counts) for analytics or business purposes.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">5. Data Security</h2>
            <p>
              We take reasonable technical and organizational measures to protect information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">6. Children's Privacy</h2>
            <p>
              Our Service is not directed at children under 13, and we do not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">8. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us through our social media channels listed on our{' '}
              <a href="/about" className="text-purple-400 hover:underline">About page</a>.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}
