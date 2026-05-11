const defaultSocials = [
  { id: 1, platform: 'GitHub', url: 'https://github.com/Mehrab30-Mehrab', icon: 'fa-brands fa-github' },
  { id: 2, platform: 'LinkedIn', url: 'https://www.linkedin.com/in/mehrab-morshed-919445237', icon: 'fa-brands fa-linkedin' },
  { id: 3, platform: 'Facebook', url: 'https://www.facebook.com/share/1CTBgBJ8M2/', icon: 'fa-brands fa-facebook' },
  { id: 4, platform: 'Instagram', url: 'https://www.instagram.com/whothefuckismehrab', icon: 'fa-brands fa-instagram' },
  { id: 5, platform: 'WhatsApp', url: 'https://wa.me/qr/J54LFB7CAU2BP1', icon: 'fa-brands fa-whatsapp' },
]

export default function Footer({ bio, socialLinks }) {
  const displaySocials = socialLinks && socialLinks.length > 0 ? socialLinks : defaultSocials

  return (
    <footer className="border-t border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#0d1117]/80 backdrop-blur-lg py-12 relative z-10 mt-12">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-display text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-6 tracking-wide">
          {bio?.name || 'Mehrab Morshed Marjan'}
        </h2>

        <div className="flex justify-center flex-wrap gap-3 sm:gap-4 mb-8">
          {displaySocials.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 hover:border-accent-500/50 transition-all hover:-translate-y-0.5"
              title={link.platform}
            >
              <i className={link.icon} />
            </a>
          ))}
        </div>

        <p className="text-sm text-gray-500 font-light">
          &copy; {new Date().getFullYear()} {bio?.name || 'Mehrab Morshed Marjan'}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}