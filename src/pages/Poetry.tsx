import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PoemCard } from "@/components/PoemCard";
import { Button } from "@/components/ui/button";
import { supabase, type Poem } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { PoetryLoading } from "@/components/PoetryLoading";

const Poetry = () => {
  const shouldReduceMotion = useReducedMotion();
  const [selectedTheme, setSelectedTheme] = useState<string>("All");

  const { data: poems = [], isLoading } = useQuery({
    queryKey: ["poems"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("poems")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Poem[];
    },
  });

  const themes = ["All", ...Array.from(new Set(poems.map(poem => poem.theme)))];
  const filteredPoems = selectedTheme === "All"
    ? poems
    : poems.filter(poem => poem.theme === selectedTheme);

  if (isLoading) {
    return <PoetryLoading />;
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-foreground mb-6">
            Poetry Collection
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore the complete collection of verses, each one a window into moments of beauty, 
            contemplation, and human connection.
          </p>
        </motion.div>

        {/* Theme Filter */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.2 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {themes.map((theme) => (
            <Button
              key={theme}
              variant={selectedTheme === theme ? "default" : "outline"}
              onClick={() => setSelectedTheme(theme)}
              className="transition-all"
            >
              {theme}
            </Button>
          ))}
        </motion.div>

        {/* Poems Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredPoems.map((poem, index) => (
            <PoemCard
              key={poem.id}
              title={poem.title}
              content={poem.content}
              theme={poem.theme}
              index={index}
            />
          ))}
        </div>

        {filteredPoems.length === 0 && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg">
              No poems found for this theme.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Poetry;
