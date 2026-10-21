import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
