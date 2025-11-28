import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, BookOpen, Feather, Sparkles } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Heart,
      title: "From the Heart",
      description: "Each poem is crafted with genuine emotion, drawn from personal experiences and universal human feelings."
    },
    {
      icon: BookOpen,
      title: "Diverse Themes",
      description: "Exploring love, loss, nature, solitude, and reflection—themes that resonate across cultures and generations."
    },
    {
      icon: Feather,
      title: "Timeless Words",
      description: "Poetry that speaks to both the contemporary reader and honors the classical traditions of verse."
    },
    {
      icon: Sparkles,
      title: "Ever Growing",
      description: "This collection continues to evolve, with new pieces added as inspiration strikes and life unfolds."
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-foreground mb-6">
            About Mary B. Paul
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Poetry is the language of the soul, a way to capture fleeting moments and eternal truths 
            in words that resonate across time.
          </p>
        </motion.div>

        {/* Two Column Layout for Bio and Collection */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {/* Author Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="h-full border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6 md:p-8">
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-4">
                  The Poet
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p className="first-letter:text-4xl first-letter:font-playfair first-letter:font-bold first-letter:text-primary first-letter:mr-1 first-letter:float-left">
                    Mary B. Paul is a contemporary poet whose work explores the delicate intersections of nature, 
                    memory, and human emotion. With a voice that is both intimate and universal, her poetry invites 
                    readers into moments of quiet reflection and profound beauty.
                  </p>
                  
                  <p>
                    Drawing inspiration from the natural world and the complexities of human experience, Mary's 
                    verses weave together imagery and emotion to create tapestries of meaning that resonate long 
                    after the final line.
                  </p>
                  
                  <p>
                    When not writing poetry, Mary can be found walking through forests, watching sunsets, and 
                    collecting moments of wonder that later bloom into verse.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* About the Collection */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6 md:p-8">
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-4">
                  The Collection
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    This collection began as a personal journey—a way to process emotions, 
                    capture beauty, and find meaning in the everyday moments that shape our lives. 
                    What started as private reflections has grown into a body of work meant to be shared.
                  </p>
                  
                  <p>
                    Poetry has always been humanity's way of distilling complex emotions into their purest form. 
                    Through carefully chosen words and thoughtful rhythm, we can express what prose often cannot—the 
                    ineffable feelings that make us human.
                  </p>
                  
                  <p>
                    Whether you're seeking comfort in difficult times, celebrating life's joys, or simply 
                    appreciating the beauty of language, I hope these verses resonate with you. Poetry reminds 
                    us that we're not alone in our experiences.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            What Defines This Collection
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <Card className="h-full border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="p-3 rounded-full bg-primary/10">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-playfair text-xl font-semibold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
