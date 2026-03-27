import { motion } from "framer-motion";
import { Camera, Clapperboard, Sparkles, Users } from "lucide-react";
import { BRAND_NAME } from "@/lib/constants";

const services = [
  {
    icon: Camera,
    title: "Robotic Precision",
    description: "Our 6-axis robotic arm moves with cinematic precision, creating smooth orbital shots that are impossible to achieve by hand.",
  },
  {
    icon: Clapperboard,
    title: "Slow-Motion Magic",
    description: "High-speed cameras capture every detail — your jump, your spin, your expression — in breathtaking slow motion.",
  },
  {
    icon: Sparkles,
    title: "Instant Delivery",
    description: "Your clips are edited on-site and delivered to your phone within minutes. Share-ready, filter-free perfection.",
  },
  {
    icon: Users,
    title: "Event Ready",
    description: "From weddings to brand launches, corporate events to private parties — we bring the wow factor to any occasion.",
  },
];

const ServiceSection = () => {
  return (
    <section id="service" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-4">
            What We Do
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-800 tracking-tight">
            THE <span className="text-gradient-gold">{BRAND_NAME}</span> EXPERIENCE
          </h2>
          <p className="font-body text-muted-foreground mt-6 max-w-2xl mx-auto text-lg">
            Rent our robotic camera arm for your event. We set up, we shoot, you shine.
            It's that simple.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-card-gradient border border-border p-8 md:p-10 group hover:border-primary/30 transition-colors duration-500"
            >
              <service.icon className="w-8 h-8 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-display text-xl font-700 mb-3 text-foreground">
                {service.title}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
