import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Globe, Bot, Headphones, Check, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Globe,
    title: 'Páginas Web Profesionales',
    description: 'Desarrollamos sitios web optimizados y responsivos para tu empresa.',
    points: ['Diseño UI/UX Moderno', 'Optimización SEO', 'Carga Ultra Rápida'],
  },
  {
    icon: Bot,
    title: 'Chatbots Avanzados',
    description: 'Creación de bots conversacionales que interactúan y fidelizan a tus clientes.',
    points: ['IA Conversacional', 'Integración Multiplataforma', 'Análisis en Tiempo Real'],
  },
  {
    icon: Headphones,
    title: 'Automatización & Soporte',
    description: 'Soluciones que mejoran procesos y brindan atención continua.',
    points: ['Automatización de Tareas', 'Soporte 24/7', 'Reportes Detallados'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export function BusinessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="nosotros" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]" />
        
        {/* Stars */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Impulsa tu <span className="gradient-text">Negocio</span> al Futuro
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              En <span className="text-cyan-400 font-semibold">BotNova Studio</span> somos expertos en crear{' '}
              <span className="text-white">páginas web impactantes</span> y{' '}
              <span className="text-white">chatbots inteligentes</span> que potencian tu negocio.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Feature Cards */}
            <motion.div
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="space-y-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group"
                >
                  <div className="glass-card rounded-2xl p-6 transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,212,255,0.15)]">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/30 group-hover:neon-glow transition-all">
                        <feature.icon className="w-7 h-7 text-cyan-400" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-3">
                          {feature.description}
                        </p>

                        {/* Points */}
                        <div className="flex flex-wrap gap-2">
                          {feature.points.map((point, pointIndex) => (
                            <span
                              key={pointIndex}
                              className="inline-flex items-center gap-1 text-xs text-cyan-400/80"
                            >
                              <Check className="w-3 h-3" />
                              {point}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* CTA */}
              <motion.div variants={itemVariants} className="pt-4">
                <motion.button
                  onClick={() => {
                    const element = document.querySelector('#contacto');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-primary flex items-center gap-2 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Comienza tu Proyecto
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Robot Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Glow Effects */}
                <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full" />
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 blur-[80px] rounded-full" />
                
                {/* Robot Image */}
                <motion.img
                  src="/robot-section.png"
                  alt="Robot trabajando en soluciones digitales"
                  className="relative z-10 w-full max-w-lg animate-float"
                  style={{ 
                    filter: 'drop-shadow(0 0 50px rgba(0, 212, 255, 0.4))',
                    animationDelay: '1s'
                  }}
                />

                {/* Floating Badge */}
                <motion.div
                  className="absolute top-8 left-0 glass-card rounded-xl px-4 py-2"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="text-sm font-medium text-cyan-400">🚀 Resultados Garantizados</span>
                </motion.div>

                {/* Stats Badge */}
                <motion.div
                  className="absolute bottom-16 -right-4 glass-card rounded-xl p-4"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                >
                  <div className="text-2xl font-bold gradient-text">+150%</div>
                  <div className="text-xs text-gray-400">Incremento en ventas</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
