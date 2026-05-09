import Timer from './components/Timer';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Timer />
      </main>
      <Footer />
    </div>
  );
}

export default App;