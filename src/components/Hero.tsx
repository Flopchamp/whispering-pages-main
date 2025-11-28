import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { BookOpen, Feather } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-pattern" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient-hero opacity-10" />
      
      {/* Floating Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <Feather className="h-12 w-12 text-primary" />
          </motion.div>
          
          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">
            Where Words Find
            <span className="text-primary"> Their Voice</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance">
            A collection of heartfelt verses exploring love, loss, nature, and the quiet moments 
            that shape our human experience.
          </p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <NavLink to="/poetry">
              <Button size="lg" className="group">
                <BookOpen className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Explore Poetry
              </Button>
            </NavLink>
            <NavLink to="/about">
              <Button size="lg" variant="outline">
                About the Collection
              </Button>
            </NavLink>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
