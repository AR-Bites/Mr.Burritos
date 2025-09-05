import { motion } from "framer-motion";

const ingredients = [
  {
    name: "Fresh Limes",
    image: "https://images.unsplash.com/photo-1587496679742-bad502958fbf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
  },
  {
    name: "Avocados",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
  },
  {
    name: "Jalapeños",
    image: "https://pixabay.com/get/g362628f8df14063e1ccd3f8ad705cade0263774d67ff9e17b5feb259157e559c27d136ce54a3b8ebb52115d281a91504dc46f4a80cbc3f374f4f53e5f05e9586_1280.jpg",
  },
  {
    name: "Cilantro",
    image: "https://pixabay.com/get/g1a99c0a035da045530e22a55b3fb78cf24754e7ceceee444640dc2a355f6118ce99db6ec1aaa1b2123868c5fa2f06495ec4ff44a03984a90b498467fe053f37c_1280.jpg",
  },
  {
    name: "Bell Peppers",
    image: "https://pixabay.com/get/gc8b9e1cc5963cee79c19fe0a5569c735e6cdb3c5e6480977bdbd95359df99802a7c6f5ad2bb856c7bb0c3abb669a792e9a854a15c11087dc195e47b08dd46df5_1280.jpg",
  },
  {
    name: "White Onions",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
  },
];

export default function IngredientsShowcase() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">Fresh Ingredients</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We use only the freshest, highest-quality ingredients sourced locally and from Mexico
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {ingredients.map((ingredient, index) => (
            <motion.div
              key={ingredient.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
            >
              <img 
                src={ingredient.image} 
                alt={ingredient.name}
                className="w-full h-32 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <p className="text-center mt-3 font-medium text-foreground" data-testid={`text-ingredient-${index}`}>
                {ingredient.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
