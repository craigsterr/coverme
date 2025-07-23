export default function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-white space-y-10">
      <div>
        <h1 className="text-5xl font-bold">Privacy Policy</h1>
        <p className="text-lg text-gray-400 mt-2">
          How CoverMe handles your data — simply and transparently.
        </p>
      </div>

      <section className="space-y-6 text-left">
        <div>
          <h2 className="text-2xl font-semibold text-white">Data Storage</h2>
          <p className="text-gray-300">
            We do <strong>not</strong> collect, store, or transmit any of your
            resume content or generated cover letters to any server. All data —
            including your resume, job descriptions, summaries, and cover
            letters — is processed entirely in your browser and remains on your
            device.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">
            LocalStorage Usage
          </h2>
          <p className="text-gray-300">
            We use your browser’s localStorage to temporarily save your resume
            summary so you don’t have to reupload it each time you visit the
            site. This data is never shared and stays only in your browser
            unless you clear it.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">
            Third-Party Services
          </h2>
          <p className="text-gray-300">
            We don’t use any third-party trackers or analytics tools that
            collect personal data. No external tools monitor your usage of the
            site.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">Questions?</h2>
          <p className="text-gray-300">
            If you have any concerns about privacy, feel free to reach out via
            my website.
          </p>
        </div>
      </section>
    </main>
  );
}
