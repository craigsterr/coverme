import NavBar from "@/components/custom/NavBar";
import Footer from "@/components/custom/Footer";
import TermsOfService from "@/components/custom/Terms";
export default function Privacy() {
  return (
    <>
      <div className="flex justify-center">
        <NavBar />
      </div>
      <div className="mb-20" />
      <TermsOfService />
      <Footer />
    </>
  );
}
