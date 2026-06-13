import { useState, useEffect, useCallback } from 'react'
import './index.css';
import gasbrasLogo from './supergasbras.png';
/* ══════════════════════════════════════════════════════════
   ⚠️  CONFIGURAÇÕES — EDITE AQUI ANTES DE PUBLICAR
   ══════════════════════════════════════════════════════════ */
const CONFIG = {
  // Número com código do país + DDD + número (só dígitos)
  whatsapp: '5521983271191',

  // Link da página de avaliação no Google Meu Negócio
  // Para obter: acesse seu perfil no Google Meu Negócio → Obter mais avaliações
  googleReview: 'https://g.page/r/SEU_PLACE_ID_AQUI/review',

  // Instagram
  instagram: 'https://www.instagram.com/nandagasltda',

  // Endereço completo para o link do Google Maps
  mapsLink: 'https://maps.google.com/maps?q=R.+Amanaj%C3%B3,+17,+Bangu,+Rio+de+Janeiro,+RJ,+21820-210',

  // URL do embed do Maps no iframe
  mapsEmbed: 'https://maps.google.com/maps?q=R.+Amanaj%C3%B3+17+Bangu+Rio+de+Janeiro+RJ+21820-210&output=embed&z=16',

  // Logo Supergasbras (URL externa — substitua por asset local se quiser)
   gasbrasLogo: gasbrasLogo,
}

const WPP_MSG_PEDIDO  = encodeURIComponent('Olá! Vim pelo site, gostaria de saber mais sobre os serviços. 🔥')
const WPP_MSG_RETIRADA = encodeURIComponent('Olá! Quero retirar na loja e aproveitar o desconto + brinde especial! 🎁')

function wppLink(msg: string) {
  return `https://wa.me/${CONFIG.whatsapp}?text=${msg}`
}

/* ══════════════════════════════════════════════════════════
   HOOK — Scroll reveal
   ══════════════════════════════════════════════════════════ */
function useReveal() {
  const [visible, setVisible] = useState(false)

  const ref = useCallback((node: Element | null) => {
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.10 }
    )
    observer.observe(node)
  }, [])

  return { ref, visible }
}

/* ══════════════════════════════════════════════════════════
   ICONS (inline SVG — zero deps)
   ══════════════════════════════════════════════════════════ */
function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function IconStar() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  )
}

function IconGoogle() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )
}

function IconMapPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14h.01v2.92z"/>
    </svg>
  )
}

/* ══════════════════════════════════════════════════════════
   HEADER
   ══════════════════════════════════════════════════════════ */
function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <a href="#" className="header-logo" aria-label="Nanda Gás — Início">
          <div className="header-logo-icon">🔥</div>
          <span className="header-logo-name">
            Nanda <span>Gás</span>
          </span>
        </a>
        <a
          href={wppLink(WPP_MSG_PEDIDO)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp btn-sm"
          aria-label="Peça pelo WhatsApp"
        >
          <IconWhatsApp />
          Peça Agora
        </a> 
      </div>
    </header>
  )
}

/* ══════════════════════════════════════════════════════════
   HERO
   ══════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="hero" aria-label="Bem-vindo à Nanda Gás">
      <div className="container hero-content">
        <div className="hero-location-pill">
          📍 Bangu, Rio de Janeiro
        </div>

        <h1 className="hero-title">
          O Gás Mais<br />
          <span className="hero-title-accent">Barato de Bangu!</span>
        </h1>

        <p className="hero-subtitle">
          Revendedora Autorizada <strong style={{ color: '#FFAB40' }}>Super Gasbras</strong>.<br />
          Qualidade garantida, preço justo — direto para a sua casa.
        </p>

        <div className="hero-ctas">
          <a
            href={wppLink(WPP_MSG_PEDIDO)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-xl"
          >
            <IconWhatsApp />
            Peça pelo WhatsApp
          </a>
          <a href="#localizacao" className="btn btn-ghost-white btn-lg">
            📍 Ver Localização
          </a>
          <a
            href={CONFIG.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-instagram btn-lg"
          >
            <IconInstagram />
            Seguir no Instagram
          </a>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-val">P13</span>
            <span className="hero-stat-label">Botijão</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-val">⭐ 5,0</span>
            <span className="hero-stat-label">Avaliação</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-val">100%</span>
            <span className="hero-stat-label">Original</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   GASBRAS BRAND
   ══════════════════════════════════════════════════════════ */
function GasbrasSection() {
  const { ref, visible } = useReveal()

  return (
    <section
      ref={ref}
      className={`section gasbras reveal ${visible ? 'visible' : ''}`}
      aria-label="Parceiro Oficial Super Gasbras"
    >
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="section-tag">🏅 Parceiro Oficial</div>
        <h2 className="section-title on-light">Distribuidor Autorizado</h2>

        <div className="gasbras-logo-wrap">
          <img
            src={CONFIG.gasbrasLogo}
            alt="Super Gasbras — Distribuidora Oficial"
            className="gasbras-logo"
            onError={(e) => {
              const img = e.currentTarget
              img.style.display = 'none'
              const wrap = img.parentElement
              if (wrap) {
                const fb = document.createElement('div')
                fb.className = 'gasbras-logo-fallback'
                fb.textContent = 'SUPER GASBRAS'
                wrap.appendChild(fb)
              }
            }}
          />
        </div>

        <div className="gasbras-badges">
          {[
            { icon: '✅', label: 'Certificado INMETRO' },
            { icon: '🔒', label: 'Gás 100% Original' },
            { icon: '🏆', label: 'Marca Mais Confiável' },
            { icon: '🇧🇷', label: 'Empresa Brasileira' },
          ].map(({ icon, label }) => (
            <div className="gasbras-badge" key={label}>
              <span className="gasbras-badge-icon">{icon}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <p className="gasbras-desc">
          A Super Gasbras é uma das maiores distribuidoras de GLP do Brasil,
          com gás de qualidade certificada e segurança garantida pelo INMETRO.
          Na Nanda Gás, você tem a certeza de sempre receber o melhor produto.
        </p>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   POR QUE ESCOLHER
   ══════════════════════════════════════════════════════════ */
const WHY_ITEMS = [
  {
    icon: '💰',
    title: 'Menor Preço do Bairro',
    desc: 'Garantimos o gás mais barato de Bangu. Não acredita? Venha conferir pessoalmente!',
  },
  {
    icon: '🛡️',
    title: 'Qualidade Garantida',
    desc: 'Gás Super Gasbras certificado pelo INMETRO. Seguro, original e de procedência confiável.',
  },
  {
    icon: '⚡',
    title: 'Atendimento Rápido',
    desc: 'Fale pelo WhatsApp e garanta seu pedido sem enrolação. Simples, rápido e sem complicação.',
  },
] as const

function WhyChooseUs() {
  const { ref, visible } = useReveal()

  return (
    <section
      ref={ref}
      className={`section why reveal ${visible ? 'visible' : ''}`}
      aria-label="Por que escolher a Nanda Gás"
    >
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="section-tag">💡 Nossas Vantagens</div>
        <h2 className="section-title on-light">Por que escolher a Nanda Gás?</h2>

        <div className="why-grid">
          {WHY_ITEMS.map(({ icon, title, desc }) => (
            <div className="why-card" key={title}>
              <span className="why-icon-wrap">{icon}</span>
              <h3 className="why-card-title">{title}</h3>
              <p className="why-card-desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   OFERTA DE RETIRADA
   ══════════════════════════════════════════════════════════ */
function PickupOffer() {
  const { ref, visible } = useReveal()

  return (
    <section
      ref={ref}
      className={`section pickup reveal ${visible ? 'visible' : ''}`}
      aria-label="Oferta especial para retirada na loja"
    >
      <div className="container pickup-inner">
        <div className="pickup-eyebrow">🎁 Oferta Exclusiva</div>

        <h2 className="pickup-title">
          Retire na Loja e<br />
          <span>Ganhe Muito Mais!</span>
        </h2>

        <div className="pickup-perks">
          <div className="pickup-perk">
            <span className="perk-icon">💸</span>
            <div className="perk-text">
              <strong>Desconto especial no botijão</strong>
              <small>Preço ainda mais baixo para quem retira pessoalmente</small>
            </div>
          </div>
          <div className="pickup-perk">
            <span className="perk-icon">🎁</span>
            <div className="perk-text">
              <strong>Brinde exclusivo para você</strong>
              <small>Surpresa especial para nossos clientes que vêm à loja</small>
            </div>
          </div>
          <div className="pickup-perk">
            <span className="perk-icon">📍</span>
            <div className="perk-text">
              <strong>R. Amanajó, 17 – Bangu, RJ</strong>
              <small>Fácil de encontrar, fácil de chegar!</small>
            </div>
          </div>
        </div>

        <a
          href={wppLink(WPP_MSG_RETIRADA)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-dark btn-xl"
        >
          <IconWhatsApp />
          Quero Meu Desconto + Brinde!
        </a>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   AVALIAÇÃO GOOGLE
   ══════════════════════════════════════════════════════════ */
function GoogleReviews() {
  const { ref, visible } = useReveal()

  return (
    <section
      ref={ref}
      className={`section reviews reveal ${visible ? 'visible' : ''}`}
      aria-label="Avalie a Nanda Gás no Google"
    >
      <div className="container">
        <div className="reviews-inner">
          <div className="reviews-stars" aria-label="5 estrelas">
            {Array.from({ length: 5 }).map((_, i) => (
              <IconStar key={i} />
            ))}
          </div>

          <h2 className="reviews-quote">
            Sua Opinião<br />Vale Muito!
          </h2>

          <p className="reviews-desc">
            Ajude outros moradores de Bangu a nos conhecer. Deixar uma avaliação no
            Google leva menos de 1 minuto e faz toda a diferença para o nosso negócio.
          </p>

          <a
            href="https://search.google.com/local/writereview?placeid=ChIJAybEXN3fmwARydN1f0m6uiU"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-google btn-lg"
          >
            <IconGoogle />
            Avaliar no Google
          </a>

          <div className="reviews-time">
            ⏱️&nbsp; Leva menos de 1 minutinho!
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   INSTAGRAM CTA
   ══════════════════════════════════════════════════════════ */
function InstagramCTA() {
  const { ref, visible } = useReveal()

  return (
    <section
      ref={ref}
      className={`section insta reveal ${visible ? 'visible' : ''}`}
      aria-label="Siga a Nanda Gás no Instagram"
    >
      <div className="container">
        <div className="insta-inner">
          <div className="insta-icon-wrap" aria-hidden="true">
            <IconInstagram />
          </div>

          <span className="insta-handle">
            <span>@nandagasltda</span>
          </span>

          <p className="insta-desc">
            Siga nosso Instagram e fique por dentro de{' '}
            <strong style={{ color: '#fff' }}>promoções exclusivas</strong>,
            sorteios e novidades. Conteúdo pensado para quem quer economizar!
          </p>

          <div className="insta-chips">
            {['🔥 Promoções exclusivas', '🎁 Sorteios', '📢 Novidades em 1ª mão'].map((c) => (
              <span className="insta-chip" key={c}>{c}</span>
            ))}
          </div>

          <a
            href={CONFIG.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-instagram btn-lg"
          >
            <IconInstagram />
            Seguir no Instagram
          </a>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   LOCALIZAÇÃO
   ══════════════════════════════════════════════════════════ */
function LocationSection() {
  const { ref, visible } = useReveal()

  return (
    <section
      id="localizacao"
      ref={ref}
      className={`location section reveal ${visible ? 'visible' : ''}`}
      aria-label="Localização da Nanda Gás"
    >
      <div className="container location-header">
        <div className="section-tag">🗺️ Onde Estamos</div>
        <h2 className="section-title on-light">Venha nos Visitar</h2>
      </div>

      <div className="location-body">
        <div className="location-info">

          <div className="location-detail">
            <div className="loc-icon-wrap" aria-hidden="true">
              <IconMapPin />
            </div>
            <div>
              <span className="location-detail-label">Endereço</span>
              <p className="location-detail-value">
                <strong>R. Amanajó, 17</strong>
                Bangu, Rio de Janeiro – RJ<br />
                CEP: 21820-210
              </p>
            </div>
          </div>

          <div className="location-detail">
            <div className="loc-icon-wrap" aria-hidden="true">
              <IconClock />
            </div>
            <div>
              <span className="location-detail-label">Horário de Funcionamento</span>
              <p className="location-detail-value">
                <strong>Seg – Sáb:&nbsp;</strong> 8h às 20h<br />
                <strong>Domingo:&nbsp;</strong> 8h às 14h
              </p>
            </div>
          </div>

          <div className="location-detail">
            <div className="loc-icon-wrap" aria-hidden="true">
              <IconPhone />
            </div>
            <div>
              <span className="location-detail-label">WhatsApp</span>
              <p className="location-detail-value">
                <strong>(21)98327-1191</strong>
                Atendimento rápido e eficiente
              </p>
            </div>
          </div>

          <a
            href={CONFIG.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-md location-maps-btn"
          >
            🗺️ Abrir no Google Maps
          </a>

        </div>

        <div className="location-map">
          <iframe
            title="Nanda Gás — Localização no Google Maps"
            src={CONFIG.mapsEmbed}
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            aria-label="Mapa mostrando a localização da Nanda Gás em Bangu, Rio de Janeiro"
          />
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════════════════ */
function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">

          <div>
            <div className="footer-brand-logo">
              <div className="footer-brand-logo-icon">🔥</div>
              <span className="footer-brand-logo-name">Nanda Gás</span>
            </div>
            <p className="footer-brand-desc">
              Revendedora Autorizada Super Gasbras em Bangu, Rio de Janeiro.
              Gás de qualidade ao menor preço do bairro.
            </p>
          </div>

          <div className="footer-col">
            <h4>Contato</h4>
            <a
              href={wppLink(WPP_MSG_PEDIDO)}
              target="_blank"
              rel="noopener noreferrer"
            >
              📱 (21)98327-1191
            </a>
            <a href={CONFIG.instagram} target="_blank" rel="noopener noreferrer">
              📸 @nandagasltda
            </a>
          </div>

          <div className="footer-col">
            <h4>Endereço</h4>
            <p>📍 R. Amanajó, 17</p>
            <p>Bangu — Rio de Janeiro</p>
            <p>RJ, CEP: 21820-210</p>
          </div>

          <div className="footer-col">
            <h4>Horários</h4>
            <p>Seg – Sáb: 8h às 20h</p>
            <p>Domingo: 8h às 14h</p>
          </div>

        </div>

         <div className="footer-bottom">
          <p>© {year} Nanda Gás. Todos os direitos reservados.</p>
          <p className="footer-credit">
            Site produzido por{' '}
            <a
              href="https://atylus.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-credit-link"
            >
              Atylus Soluções Digitais
            </a>
          </p>
        </div>
        </div>
    </footer>
  )
}

/* ══════════════════════════════════════════════════════════
   WHATSAPP FLOATING BUTTON
   ══════════════════════════════════════════════════════════ */
function WhatsAppFAB() {
  const [showTip, setShowTip] = useState(false)

  // Auto-show tooltip after 3s, then hide after 4s
  useEffect(() => {
    const show = setTimeout(() => setShowTip(true), 3000)
    const hide = setTimeout(() => setShowTip(false), 7000)
    return () => { clearTimeout(show); clearTimeout(hide) }
  }, [])

  return (
    <div className="wpp-fab">
      {showTip && (
        <div className="wpp-tooltip" role="tooltip">
          Peça agora pelo WhatsApp! 💬
        </div>
      )}
      <a
        href={wppLink(WPP_MSG_PEDIDO)}
        target="_blank"
        rel="noopener noreferrer"
        className="wpp-btn"
        aria-label="Abrir conversa no WhatsApp"
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
      >
        <IconWhatsApp />
      </a>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   APP ROOT
   ══════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <GasbrasSection />
        <WhyChooseUs />
        <PickupOffer />
        <GoogleReviews />
        <InstagramCTA />
        <LocationSection />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  )
}
