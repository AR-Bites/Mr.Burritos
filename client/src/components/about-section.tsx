import { motion } from "framer-motion";
import { Clock, Users, Star } from "lucide-react";

export default function AboutSection() {
  const stats = [
    { icon: Clock, value: "25+ Years", label: "Experience" },
    { icon: Users, value: "10,000+", label: "Happy Customers" },
    { icon: Star, value: "4.8/5", label: "Rating" },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground">Our Story</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Mr. Burritos was born from a passion for bold Mexican-inspired flavors. Our recipes combine traditional techniques with modern tastes, creating the perfect fusion of authentic and contemporary cuisine.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We source the finest ingredients, from perfectly seasoned meats to fresh vegetables, ensuring every bite delivers that signature Mr. Burritos experience that keeps you coming back for more.
            </p>
            
            <div className="grid grid-cols-3 gap-6 pt-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <h3 className="font-semibold text-foreground" data-testid={`text-stat-value-${index}`}>{stat.value}</h3>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Chef preparing traditional Mexican food" 
              className="rounded-2xl shadow-2xl w-full"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg"
            >
              <img 
                src="https://images.unsplash.com/photo-1517244683847-7456b63c5969?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                alt="Fresh jalapeño peppers" 
                className="w-16 h-16 rounded-lg object-cover"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg"
            >
              <img 
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                alt="Mexican spices and seasonings" 
                className="w-16 h-16 rounded-lg object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
