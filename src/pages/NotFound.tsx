import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home as HomeIcon, Feather } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-pattern opacity-50" />
      
      {/* Decorative Elements */}
      <motion.div 
        className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center px-4 relative z-10"
      >
        {/* Animated 404 */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <h1 className="mb-4 text-9xl font-playfair font-bold text-primary drop-shadow-lg">
            404
          </h1>
        </motion.div>

        {/* Title with subtle animation */}
        <motion.h2 
          className="mb-4 text-3xl font-playfair font-semibold text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Lost in the Poetry
        </motion.h2>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <p className="text-lg text-muted-foreground max-w-md mx-auto mb-4">
            The page you're looking for seems to have wandered off into the verses...
          </p>
          <p className="text-sm text-muted-foreground/80 italic">
            Perhaps it was never meant to be found, like a fleeting dream.
          </p>
        </motion.div>

        {/* Decorative Quote */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8 max-w-lg mx-auto"
        >
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 border border-border/50">
            <Feather className="h-8 w-8 text-primary mx-auto mb-3" />
            <p className="text-sm text-muted-foreground italic">
              "Not all who wander are lost, but this page certainly is."
            </p>
          </div>
        </motion.div>

        {/* Return Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Link to="/">
            <Button size="lg" className="group shadow-lg hover:shadow-xl transition-all">
              <HomeIcon className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Return Home
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
