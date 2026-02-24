import PromoBanners from '@/components/home/PromoBanners';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import ServiceFeatures from '@/components/home/ServiceFeatures';
import PopularProducts from '@/components/home/PopularProducts';
import WeeklySales from '@/components/home/WeeklySales';
import BlogSection from '@/components/home/BlogSection';
import Carousel from '@/components/home/carousel/carousel';
import { heroSlides } from '@/data/banner';

export default function HomePage() {
  return (
    <>
      <ServiceFeatures />
      <Carousel event={heroSlides} />
      <FeaturedCategories />
      <PromoBanners />
      <PopularProducts />
      <WeeklySales />
      <BlogSection />
    </>
  );
}
