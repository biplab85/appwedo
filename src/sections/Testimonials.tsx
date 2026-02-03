import { Container, SectionHeader } from '../components';
import { siteContent } from '../content';
import { Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Testimonials() {
  const { label, headline, testimonials } = siteContent.testimonials;

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeader
          label={label}
          headline={headline}
        />

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-12"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-2xl p-8 shadow-xl shadow-dark-900/5 border border-dark-100 h-full flex flex-col">
                <Quote className="w-10 h-10 text-primary/20 mb-4" />
                <p className="text-dark-600 leading-relaxed flex-grow mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <div className="font-bold text-dark-800">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-dark-500">
                      {testimonial.title}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}
