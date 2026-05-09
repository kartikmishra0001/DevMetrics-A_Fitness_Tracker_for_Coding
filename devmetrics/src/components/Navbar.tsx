function Navbar() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav style={{
      backgroundColor: 'white',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '70px'
        }}>
          {/* Logo */}
          <div 
            onClick={() => scrollToSection('home')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            <span style={{ fontSize: '28px' }}>⚡</span>
            <span style={{
              fontWeight: 'bold',
              fontSize: '24px',
              background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              DevMetrics
            </span>
          </div>

          {/* Navigation Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            <button 
              onClick={() => scrollToSection('home')}
              style={{ color: '#4b5563', textDecoration: 'none', fontSize: '16px', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('dashboard')}
              style={{ color: '#4b5563', textDecoration: 'none', fontSize: '16px', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Dashboard
            </button>
            <button 
              onClick={() => scrollToSection('analytics')}
              style={{ color: '#4b5563', textDecoration: 'none', fontSize: '16px', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Analytics
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              style={{ color: '#4b5563', textDecoration: 'none', fontSize: '16px', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              About
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;