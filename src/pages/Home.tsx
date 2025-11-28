import { motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { PoemCard } from "@/components/PoemCard";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { ArrowRight } from "lucide-react";
import { poems as staticPoems } from "@/data/poems";

const Home = () => {
  // Featured poems (first 3)
  const featuredPoems = staticPoems.slice(0, 3);

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Featured Poems Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
              Featured Verses
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A curated selection of poems that capture the essence of our shared human experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {featuredPoems.map((poem, index) => (
              <PoemCard
                key={poem.id}
                title={poem.title}
                content={poem.content}
                theme={poem.theme}
                index={index}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <NavLink to="/poetry">
              <Button size="lg" variant="outline" className="group">
                View All Poetry
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </NavLink>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-12 border border-border/50"
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-4">
              Connect Through Poetry
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Have thoughts to share? Questions about a particular piece? I'd love to hear from you.
            </p>
            <NavLink to="/contact">
              <Button size="lg">
                Get in Touch
              </Button>
            </NavLink>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
