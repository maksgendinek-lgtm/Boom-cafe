import { LanguageProvider } from './context/LanguageContext'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Features'
import MenuSection from './components/MenuSection'
import DishGallery from './components/DishGallery'
import Contacts from './components/Contacts'
import Footer from './components/Footer'
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import SectionWave from './components/SectionWave'
import PremiumBackground from './components/PremiumBackground'
import { useLenis } from './utils/motion'

function AppContent() {
  useLenis()

  return (
    <>
      {/* Premium multi-layer animated background */}
      <PremiumBackground />

      <CustomCursor />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <SectionWave fill="#1a0a0a" />
        <About />
        <Features />
        <MenuSection />
        <SectionWave fill="#1a0a0a" flip />
        <DishGallery />
        <Contacts />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}
