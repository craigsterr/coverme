export default function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-white space-y-10">
      <div>
        <h1 className="text-5xl font-bold">Privacy Policy</h1>
        <p className="text-lg text-gray-400 mt-2">
          How CoverMe handles your data, simply and transparently.
        </p>
      </div>

      <section className="space-y-6 text-left">
        <div>
          <h2 className="text-2xl font-semibold">What We Collect</h2>
          <p className="text-gray-300">
            CoverMe itself does <strong>not</strong> store your resume, job
            descriptions, or generated cover letters on its own servers.
            However, the information you provide is used during each session to
            generate personalized outputs.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">OpenAI API Usage</h2>
          <p className="text-gray-300">
            Your data (resume, job content, and summaries) is securely sent to
            OpenAI’s API for processing. OpenAI may retain logs of this data for
            up to 30 days, as outlined in their{" "}
            <a
              href="https://openai.com/policies/api-data-usage-policies"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-400"
            >
              API Data Usage Policy
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">Developer Access to Logs</h2>
          <p className="text-gray-300">
            As the developer, I have access to logs provided by OpenAI that may
            include both the input you submit (such as resumes or job
            descriptions) and the generated output. These logs are used only to
            monitor usage, fix bugs, and improve the product. I do not store or
            share this information outside of what’s available through OpenAI’s
            platform.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">LocalStorage</h2>
          <p className="text-gray-300">
            Your browser’s localStorage is used to temporarily save your resume
            summary, so you don’t need to reupload it during each session. This
            data stays entirely on your device and is not transmitted or
            accessed by CoverMe or any third party.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">Third-Party Services</h2>
          <p className="text-gray-300">
            CoverMe does not use third-party analytics, ad networks, or tracking
            tools that collect personal information.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">Your Control</h2>
          <p className="text-gray-300">
            You can clear your browser’s localStorage at any time to remove all
            saved resume data. If you want to avoid your content being sent to
            OpenAI, simply do not use the resume or job description upload
            features.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">Questions?</h2>
          <p className="text-gray-300">
            If you have any questions or concerns about your data, you're
            welcome to reach out via{" "}
            <a
              href="https://craigo.live"
              className="underline text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              my personal website
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
