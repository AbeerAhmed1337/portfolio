import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Briefcase, Code, Download, Send } from 'lucide-react';
import cvFile from '../assets/Muhammad_Abeer_Ahmed_Siddiqui_AI_Engineer_CV.docx?url';
import SectionHeader from './ui/SectionHeader';
import Button from './ui/Button';

const links = [
  {
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=siddiqui.abeer456@gmail.com&su=Hello%20Abeer',
    label: 'Email',
    detail: 'siddiqui.abeer456@gmail.com',
    icon: Mail,
    external: true,
  },
  {
    href: 'https://www.linkedin.com/in/abeer-ahmed-1a5b002b6/',
    label: 'LinkedIn',
    detail: 'Professional profile',
    icon: Briefcase,
    external: true,
  },
  {
    href: 'https://github.com/AbeerAhmed1337',
    label: 'GitHub',
    detail: 'Code & experiments',
    icon: Code,
    external: true,
  },
  {
    href: cvFile,
    label: 'Resume',
    detail: 'Download CV (DOCX)',
    icon: Download,
    download: 'Muhammad_Abeer_Ahmed_Siddiqui_AI_Engineer_CV.docx',
  },
];

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();

    const subject = encodeURIComponent(`Portfolio inquiry from ${name || 'visitor'}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=siddiqui.abeer456@gmail.com&su=${subject}&body=${body}`,
      '_blank',
      'noopener,noreferrer',
    );
    setStatus('sent');
    form.reset();
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" style={{ paddingBottom: '4rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="contact-layout">
          <div className="contact-copy">
            <SectionHeader
              eyebrow="Contact"
              title={
                <span id="contact-heading">
                  Let&apos;s <span className="text-accent">build something</span>
                </span>
              }
            />
            <p>
              I am currently open to junior and entry-level developer roles where I can contribute to
              shipping impactful software. Let&apos;s connect and discuss how my blend of full-stack
              engineering and AI architecture can bring value to your team.
            </p>

            <div className="contact-links">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="contact-link surface"
                    {...(link.external
                      ? { target: '_blank', rel: 'noreferrer' }
                      : { download: link.download })}
                  >
                    <span className="contact-link-icon" aria-hidden>
                      <Icon size={18} />
                    </span>
                    <span>
                      <strong>{link.label}</strong>
                      <span>{link.detail}</span>
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          <form className="contact-form surface" onSubmit={handleSubmit} noValidate={false}>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" autoComplete="name" required placeholder="Your name" />
              </div>
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="Tell me about the role, product, or idea..."
              />
            </div>
            <Button type="submit" variant="primary">
              <Send size={16} aria-hidden /> Send message
            </Button>
            {status === 'sent' ? (
              <p className="form-status" role="status">
                Opening your email client with the message drafted. Thanks for reaching out.
              </p>
            ) : null}
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
