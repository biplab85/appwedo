import { Container, SectionHeader } from '../components';
import { siteContent } from '../content';

export default function Products() {
  const { label, headline, products } = siteContent.products;

  return (
    <section id="products" className="py-20 lg:py-28 bg-dark-50">
      <Container>
        <SectionHeader
          label={label}
          headline={headline}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-4 text-center hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border border-dark-100 hover:border-primary/20"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <product.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-sm font-semibold text-dark-700 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
