import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PoemCardProps {
  title: string;
  content: string;
  theme?: string;
  index?: number;
}

export const PoemCard = ({ title, content, theme, index = 0 }: PoemCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <Card className="group hover:shadow-2xl transition-all duration-500 border-border/50 bg-card relative overflow-hidden">
        {/* Subtle gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardContent className="p-8 relative z-10">
          <div className="flex flex-col gap-4">
            {theme && (
              <Badge variant="secondary" className="w-fit text-xs">
                {theme}
              </Badge>
            )}
            <h3 className="font-playfair text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line font-inter">
                {content}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
