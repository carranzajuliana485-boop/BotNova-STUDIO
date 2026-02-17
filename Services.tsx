import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const services = [
  {
    icon: '/icon-web.png',
    title: 'Desarrollo Web Avanzado',
    description: 'Diseño de sitios web modernos y funcionales que destacan tu marca y convierten visitantes en clientes.',
    features: ['Responsive Design', 'SEO Optimizado', 'Alta Velocidad'],
  },
  {
    icon: '/icon-chatbot.png',
    title: 'Chatbots Inteligentes',
    description: 'Bots automatizados para atención 24/7 que mejoran la experiencia del cliente y reducen costos.',
    features: ['IA Avanzada', 'Multilenguaje', 'Integración CRM'],
  },
  {
    icon: '/icon-custom.png',
    title: 'Soluciones a tu Medida',
    description: 'Estrategias digitales personalizadas que se adaptan perfectamente a las necesidades de tu negocio.',
    features: ['Análisis de Datos', 'Automatización', 'Escalabilidad'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="servicios" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="section-padding relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full glass-card text-cyan-400 text-sm font-medium mb-4">
              Nuestros Servicios
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Soluciones <span className="gradient-text">Digitales</span> Completas
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Ofrecemos servicios integrales para transformar tu presencia digital
              y llevar tu negocio al siguiente nivel.
            </p>
          </motion.div>

          {/* Service Cards */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                <div className="glass-card rounded-2xl p-6 lg:p-8 h-full transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,212,255,0.2)]">
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 mx-auto relative">
                      <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
                      <img
                        src={service.icon}
                        alt={service.title}
                        className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white text-center mb-3 group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-center mb-6 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {service.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
