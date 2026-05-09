import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#111827',
      color: 'white',
      marginTop: '48px'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '48px 1rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '32px'
        }}>
          {/* About */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>⚡</span> DevMetrics
            </h3>
            <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.5' }}>
              Track your coding progress, set daily goals, and improve your productivity with DevMetrics.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <button 
                  onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })} 
                  style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Home
                </button>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <button 
                  onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })} 
                  style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Dashboard
                </button>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <button 
                  onClick={() => alert('Privacy Policy')} 
                  style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Privacy Policy
                </button>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <button 
                  onClick={() => alert('Terms of Service')} 
                  style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Social Media - GitHub, X, LinkedIn with Real Icons */}
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>Connect With Me</h3>
            <div style={{ display: 'flex', gap: '24px' }}>
              {/* GitHub */}
              <a 
                href="https://github.com/kartikmishra0001" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: '#9ca3af', 
                  textDecoration: 'none', 
                  fontSize: '28px',
                  transition: 'all 0.3s',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.2)';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.color = '#9ca3af';
                }}
                title="GitHub"
              >
                <FaGithub />
              </a>
              
              {/* X (Twitter) */}
              <a 
                href="https://x.com/CodingC67914" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: '#9ca3af', 
                  textDecoration: 'none', 
                  fontSize: '28px',
                  transition: 'all 0.3s',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.2)';
                  e.currentTarget.style.color = '#1DA1F2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.color = '#9ca3af';
                }}
                title="X (Twitter)"
              >
                <FaTwitter />
              </a>
              
              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/kartik-mishra-74k-54k/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: '#9ca3af', 
                  textDecoration: 'none', 
                  fontSize: '28px',
                  transition: 'all 0.3s',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.2)';
                  e.currentTarget.style.color = '#0A66C2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.color = '#9ca3af';
                }}
                title="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>
            <p style={{ color: '#6b7280', fontSize: '12px', marginTop: '24px' }}>
              © 2026 DevMetrics. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;