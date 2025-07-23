import PrivacyPolicy from "@/components/custom/PrivacyPolicy";
import NavBar from "@/components/custom/NavBar";
import Footer from "@/components/custom/Footer";

export default function Privacy() {
  return (
    <>
      <div className="flex justify-center">
        <NavBar />
      </div>
      <div className="mb-20" />
      <PrivacyPolicy />
      <Footer />
    </>
  );
}
